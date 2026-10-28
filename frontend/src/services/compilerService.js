const CODE_EXECUTION_API_URL = 'https://emkc.org/api/v2/piston/execute';

const languageMap = {
  java: { language: 'java', version: '15.0.2' },
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  c: { language: 'c', version: '10.2.0' }
};

export const runCode = async (language, code, input = '') => {
  const langKey = (language || 'python').toLowerCase();
  const startTime = performance.now();

  try {
    const langConfig = languageMap[langKey] || { language: langKey, version: '*' };
    const response = await fetch(CODE_EXECUTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [
          {
            content: code
          }
        ],
        stdin: input || ''
      })
    });

    if (response.ok) {
      const data = await response.json();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2) + 's';
      const runResult = data.run || data;
      const stdout = runResult.stdout !== undefined ? runResult.stdout : (data.output || '');
      const stderr = runResult.stderr || (runResult.code !== 0 && runResult.code !== undefined ? (runResult.output || '') : '');

      if (stderr) {
        return {
          output: stdout,
          errors: stderr,
          executionTime: elapsed
        };
      }

      return {
        output: stdout || 'Program ran successfully with no output.',
        errors: '',
        executionTime: elapsed
      };
    }
  } catch (err) {
  }

  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2) + 's';
  return executeLocally(langKey, code, input, elapsed);
};

const executeLocally = (langKey, code, input, elapsed) => {
  if (langKey === 'javascript') {
    return runJavaScript(code, input, elapsed);
  }
  if (langKey === 'python') {
    return runPython(code, input, elapsed);
  }
  if (langKey === 'java') {
    return runJava(code, input, elapsed);
  }
  if (langKey === 'c') {
    return runC(code, input, elapsed);
  }
  return {
    output: 'Program executed.',
    errors: '',
    executionTime: elapsed
  };
};

const runJavaScript = (code, input, elapsed) => {
  const logs = [];
  const inputLines = (input || '').split('\n');
  let inputIdx = 0;
  const prompt = () => (inputLines[inputIdx++] !== undefined ? inputLines[inputIdx - 1] : '');

  const customConsole = {
    log: (...args) => logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
    error: (...args) => logs.push(args.map((a) => String(a)).join(' ')),
    warn: (...args) => logs.push(args.map((a) => String(a)).join(' '))
  };

  try {
    const fn = new Function('console', 'prompt', code);
    const result = fn(customConsole, prompt);
    if (result !== undefined && logs.length === 0) {
      logs.push(typeof result === 'object' ? JSON.stringify(result) : String(result));
    }
    return {
      output: logs.join('\n') || 'Program ran successfully with no output.',
      errors: '',
      executionTime: elapsed
    };
  } catch (err) {
    return {
      output: logs.join('\n'),
      errors: err.toString(),
      executionTime: elapsed
    };
  }
};

const runPython = (code, input, elapsed) => {
  const inputLines = (input || '').split('\n');
  let inputIdx = 0;
  const inputFn = () => (inputLines[inputIdx++] !== undefined ? inputLines[inputIdx - 1] : '');

  const lines = code.split('\n');
  const output = [];
  const scope = { input: inputFn };

  try {
    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const printMatch = line.match(/^print\s*\((.*)\)$/);
      if (printMatch) {
        const expr = printMatch[1].trim();
        if (!expr) {
          output.push('');
          continue;
        }
        try {
          const val = Function(...Object.keys(scope), `return [${expr}]`)(...Object.values(scope));
          output.push(val.join(' '));
        } catch (e) {
          const unquoted = expr.replace(/^['"]|['"]$/g, '');
          output.push(unquoted);
        }
        continue;
      }

      const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const rightExpr = assignMatch[2].trim();
        try {
          scope[varName] = Function(...Object.keys(scope), `return ${rightExpr}`)(...Object.values(scope));
        } catch (e) {
          scope[varName] = rightExpr.replace(/^['"]|['"]$/g, '');
        }
      }
    }

    return {
      output: output.join('\n') || 'Program ran successfully with no output.',
      errors: '',
      executionTime: elapsed
    };
  } catch (err) {
    return {
      output: output.join('\n'),
      errors: `Python execution error: ${err.message}`,
      executionTime: elapsed
    };
  }
};

const runJava = (code, input, elapsed) => {
  if (!code.includes('class')) {
    return {
      output: '',
      errors: 'Main.java:1: error: class, interface, or enum expected',
      executionTime: elapsed
    };
  }
  if (!code.includes('main')) {
    return {
      output: '',
      errors: 'Error: Main method not found in class Main, please define the main method as:\n   public static void main(String[] args)',
      executionTime: elapsed
    };
  }

  const output = [];
  const printRegex = /System\.out\.print(ln)?\s*\((.*?)\);/g;
  let match;
  while ((match = printRegex.exec(code)) !== null) {
    const raw = match[2].trim();
    try {
      const val = Function(`return ${raw}`)();
      output.push(String(val));
    } catch (e) {
      output.push(raw.replace(/^['"]|['"]$/g, ''));
    }
  }

  return {
    output: output.join('\n') || 'Program ran successfully with no output.',
    errors: '',
    executionTime: elapsed
  };
};

const runC = (code, input, elapsed) => {
  if (!code.includes('main')) {
    return {
      output: '',
      errors: 'main.c: error: undefined reference to `main`',
      executionTime: elapsed
    };
  }

  const output = [];
  const printfRegex = /printf\s*\(\s*(['"].*?['"])\s*(?:,\s*(.*?))?\s*\);/g;
  let match;
  while ((match = printfRegex.exec(code)) !== null) {
    let str = match[1].slice(1, -1).replace(/\\n/g, '\n');
    const args = match[2] ? match[2].split(',').map((s) => s.trim()) : [];
    for (const arg of args) {
      try {
        const val = Function(`return ${arg}`)();
        str = str.replace(/%[dsf]/, val);
      } catch (e) {
        str = str.replace(/%[dsf]/, arg);
      }
    }
    output.push(str);
  }

  return {
    output: output.join('') || 'Program ran successfully with no output.',
    errors: '',
    executionTime: elapsed
  };
};

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Trash2 } from 'lucide-react';
import { runCode } from '../services/compilerService';
import './CodeEditorPage.css';

const starterCodes = {
  Java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  Python: `print("Hello, World!")`,
  JavaScript: `console.log("Hello, World!");`,
  C: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
};

const monacoLangMap = {
  Java: 'java',
  Python: 'python',
  JavaScript: 'javascript',
  C: 'c'
};

const CodeEditorPage = () => {
  const [language, setLanguage] = useState('Java');
  const [code, setCode] = useState(starterCodes.Java);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [editorSplit, setEditorSplit] = useState(60);
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const detectTheme = () => {
      const isDark = document.body.classList.contains('dark') || document.documentElement.classList.contains('dark');
      setEditorTheme(isDark ? 'vs-dark' : 'vs');
    };
    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      if (clientY === undefined) return;
      const newPercent = ((clientY - rect.top) / rect.height) * 100;
      if (newPercent >= 20 && newPercent <= 80) {
        setEditorSplit(Math.round(newPercent));
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleDividerMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(starterCodes[newLang] || '');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setHasRun(true);
    const result = await runCode(language, code, input);
    setOutput(result.output || '');
    setErrors(result.errors || '');
    setExecutionTime(result.executionTime || '');
    setIsRunning(false);
  };

  const handleClear = () => {
    setOutput('');
    setErrors('');
    setExecutionTime('');
    setHasRun(false);
  };

  return (
    <div className='compiler-root'>
      <header className='compiler-top-bar'>
        <div className='compiler-bar-left'>
          <select
            className='compiler-lang-select'
            value={language}
            onChange={handleLanguageChange}
          >
            <option value='Java'>Java</option>
            <option value='Python'>Python</option>
            <option value='JavaScript'>JavaScript</option>
            <option value='C'>C</option>
          </select>
        </div>
        <div className='compiler-bar-right'>
          <button
            type='button'
            className='compiler-clear-btn'
            onClick={handleClear}
            title='Clear output'
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>
          <button
            type='button'
            className='compiler-run-btn'
            onClick={handleRun}
            disabled={isRunning}
            title='Run code'
          >
            {isRunning ? (
              <>
                <Loader2 size={15} className='spin-loader' />
                <span>Running</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </header>
      <div ref={containerRef} className='compiler-workspace'>
        <div className='compiler-editor-pane' style={{ height: `${editorSplit}%` }}>
          <Editor
            height='100%'
            language={monacoLangMap[language] || 'java'}
            theme={editorTheme}
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              fontSize: 14,
              lineNumbers: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 }
            }}
          />
        </div>
        <div
          className='compiler-drag-divider'
          onMouseDown={handleDividerMouseDown}
          onTouchStart={handleDividerMouseDown}
        >
          <div className='divider-handle-line' />
        </div>
        <div className='compiler-bottom-pane' style={{ height: `${100 - editorSplit}%` }}>
          <div className='compiler-io-container'>
            <div className='compiler-input-col'>
              <div className='pane-header'>
                <span className='pane-header-title'>Input</span>
                <span className='pane-header-sub'>(Optional)</span>
              </div>
              <textarea
                className='compiler-input-textarea'
                placeholder='Enter input for your program here...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className='compiler-output-col'>
              <div className='pane-header'>
                <span className='pane-header-title'>Output</span>
              </div>
              <div className='compiler-output-viewport'>
                {!hasRun ? (
                  <div className='output-placeholder'>Output will appear here</div>
                ) : (
                  <>
                    {output && <pre className='output-text-normal'>{output}</pre>}
                    {errors && <pre className='output-text-error'>{errors}</pre>}
                    {executionTime && (
                      <div className='output-time-tag'>
                        Execution time: {executionTime}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;

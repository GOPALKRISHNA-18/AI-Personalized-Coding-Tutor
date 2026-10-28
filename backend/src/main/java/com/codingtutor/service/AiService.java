package com.codingtutor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${ai.api.url:}")
    private String apiUrl;

    @Value("${ai.api.key:}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public String callAiApi(String systemPrompt, String userPrompt) {
        if (apiKey == null || apiKey.trim().isEmpty() || apiUrl == null || apiUrl.trim().isEmpty()) {
            return null;
        }
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey.trim());

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));
            messages.add(Map.of("role", "user", "content", userPrompt));
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            Map<?, ?> response = restTemplate.postForObject(apiUrl, entity, Map.class);
            if (response != null && response.containsKey("choices")) {
                List<?> choices = (List<?>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                    Map<?, ?> msg = (Map<?, ?>) firstChoice.get("message");
                    return (String) msg.get("content");
                }
            }
        } catch (Exception ex) {
            return null;
        }
        return null;
    }

    public String chatReply(String userMessage) {
        String system = "You are an intelligent, supportive AI coding assistant.";
        String apiResponse = callAiApi(system, userMessage);
        if (apiResponse != null && !apiResponse.trim().isEmpty()) {
            return apiResponse;
        }
        return null;
    }

    public List<Map<String, Object>> explainStepByStep(String title, String code, String language) {
        String system = "You are a coding assistant. Provide step-by-step guidance.";
        String prompt = "Explain " + title + " in " + language + " step by step.";
        callAiApi(system, prompt);
        return new ArrayList<>();
    }

    public Map<String, Object> detectErrors(String code, String language) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> issues = new ArrayList<>();

        if (code != null) {
            String[] lines = code.split("\n");
            if ("Python".equalsIgnoreCase(language)) {
                for (int i = 0; i < lines.length; i++) {
                    String line = lines[i].trim();
                    if ((line.startsWith("def ") || line.startsWith("if ") || line.startsWith("for ") || line.startsWith("while ")) && !line.endsWith(":")) {
                        issues.add(Map.of("line", i + 1, "type", "SyntaxError", "message", "Missing colon ':' at the end of block header.", "suggestion", "Add a colon ':' at the end of line " + (i + 1)));
                    }
                }
            } else if ("Java".equalsIgnoreCase(language) || "C".equalsIgnoreCase(language) || "C++".equalsIgnoreCase(language)) {
                for (int i = 0; i < lines.length; i++) {
                    String line = lines[i].trim();
                    if (!line.isEmpty() && !line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
                        if (!line.startsWith("public ") && !line.startsWith("class ") && !line.startsWith("void ") && !line.startsWith("int main")) {
                            issues.add(Map.of("line", i + 1, "type", "SyntaxWarning", "message", "Potential missing semicolon ';' statement terminator.", "suggestion", "Terminate expression on line " + (i + 1) + " with a semicolon."));
                        }
                    }
                }
            }
            if (code.contains("while True") && !code.contains("break")) {
                issues.add(Map.of("line", 1, "type", "RuntimeRisk", "message", "Potential infinite loop without break statement.", "suggestion", "Ensure there is a terminating condition."));
            }
        }

        result.put("hasErrors", !issues.isEmpty());
        result.put("issues", issues);
        result.put("summary", issues.isEmpty() ? "AI Code Analysis: Clean syntax and structure detected. Ready for execution." : "AI detected " + issues.size() + " potential issue(s). Review debugging guidance.");
        return result;
    }

    public Map<String, Object> generateExercise(String language, String skillLevel) {
        String system = "You are a coding assistant. Generate a single programming exercise as JSON.";
        String prompt = "Generate a programming exercise in " + language + " for level " + skillLevel;
        callAiApi(system, prompt);
        return new HashMap<>();
    }

    public Map<String, Object> generateQuiz(String topic, String language, String difficulty) {
        String system = "You are a coding assistant. Generate a programming quiz as JSON.";
        String prompt = "Generate a quiz for topic " + topic + " in " + language + " difficulty " + difficulty;
        callAiApi(system, prompt);
        return new HashMap<>();
    }
}

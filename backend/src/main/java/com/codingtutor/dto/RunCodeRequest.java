package com.codingtutor.dto;

public class RunCodeRequest {

    private String code;
    private String language;

    public RunCodeRequest() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}

package com.codingtutor.dto;

public class TutorAskResponse {

    private String reply;
    private String exampleCode;
    private String exampleLanguage;

    public TutorAskResponse() {
    }

    public TutorAskResponse(String reply, String exampleCode, String exampleLanguage) {
        this.reply = reply;
        this.exampleCode = exampleCode;
        this.exampleLanguage = exampleLanguage;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getExampleCode() {
        return exampleCode;
    }

    public void setExampleCode(String exampleCode) {
        this.exampleCode = exampleCode;
    }

    public String getExampleLanguage() {
        return exampleLanguage;
    }

    public void setExampleLanguage(String exampleLanguage) {
        this.exampleLanguage = exampleLanguage;
    }
}

package com.codingtutor.dto;

public class RunCodeResponse {

    private boolean success;
    private String output;
    private String executionTime;

    public RunCodeResponse() {
    }

    public RunCodeResponse(boolean success, String output, String executionTime) {
        this.success = success;
        this.output = output;
        this.executionTime = executionTime;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }
}

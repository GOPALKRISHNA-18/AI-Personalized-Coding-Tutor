package com.codingtutor.dto;
public class GoogleLoginRequest
{
    private String email;
    private String name;
    private String googleId;
    private String photoUrl;
    public GoogleLoginRequest() 
    {
    }
    public GoogleLoginRequest(String email, String name, String googleId, String photoUrl) 
    {
        this.email = email;
        this.name = name;
        this.googleId = googleId;
        this.photoUrl = photoUrl;
    }
    public String getEmail() 
    {
        return email;
    }
    public void setEmail(String email) 
    {
        this.email = email;
    }
    public String getName() 
    {
        return name;
    }
    public void setName(String name) 
    {
        this.name = name;
    }
    public String getGoogleId() 
    {
        return googleId;
    }
    public void setGoogleId(String googleId) 
    {
        this.googleId = googleId;
    }
    public String getPhotoUrl() {
        return photoUrl;
    }
    public void setPhotoUrl(String photoUrl)
    {
        this.photoUrl = photoUrl;
    }
}

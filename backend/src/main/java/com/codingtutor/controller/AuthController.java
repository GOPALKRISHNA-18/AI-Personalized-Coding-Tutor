package com.codingtutor.controller;
import com.codingtutor.dto.AuthResponse;
import com.codingtutor.dto.GoogleLoginRequest;
import com.codingtutor.dto.LoginRequest;
import com.codingtutor.dto.RegisterRequest;
import com.codingtutor.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) 
    {
        AuthResponse response = authService.register(req);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req)
    {
        AuthResponse response = authService.login(req);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleLoginRequest req)
    {
        AuthResponse response = authService.loginWithGoogle(req);
        return ResponseEntity.ok(response);
    }
}

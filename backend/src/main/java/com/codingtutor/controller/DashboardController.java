package com.codingtutor.controller;
import com.codingtutor.dto.DashboardResponse;
import com.codingtutor.entity.Progress;
import com.codingtutor.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api")
public class DashboardController
{
    @Autowired
    private ProgressService progressService;
    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<DashboardResponse> getDashboard(@PathVariable Long userId) 
    {
        DashboardResponse response = progressService.getDashboard(userId);
        return ResponseEntity.ok(response);
    }
    @GetMapping({"/progress/user/{userId}", "/progress/{userId}"})
    public ResponseEntity<List<Progress>> getProgressByUser(@PathVariable Long userId)
    {
        List<Progress> list = progressService.getProgressByUser(userId);
        return ResponseEntity.ok(list);
    }
}

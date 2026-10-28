package com.codingtutor.controller;
import com.codingtutor.dto.TutorAskRequest;
import com.codingtutor.dto.TutorAskResponse;
import com.codingtutor.dto.TutorQuestionDto;
import com.codingtutor.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/tutor")
public class TutorController 
{
    @Autowired
    private ChatService chatService;
    @GetMapping("/questions")
    public ResponseEntity<List<TutorQuestionDto>> getQuestions()
    {
        List<TutorQuestionDto> list = chatService.getTutorQuestions();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/ask")
    public ResponseEntity<TutorAskResponse> askTutor(@RequestBody TutorAskRequest req) 
    {
        TutorAskResponse response = chatService.askTutor(req.getUserId(), req.getMessage());
        return ResponseEntity.ok(response);
    }
}

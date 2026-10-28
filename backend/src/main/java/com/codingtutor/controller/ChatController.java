package com.codingtutor.controller;
import com.codingtutor.entity.ChatMessage;
import com.codingtutor.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/chat")
public class ChatController 
{
    @Autowired
    private ChatService chatService;
    @PostMapping
    public ResponseEntity<ChatMessage> saveMessage(@RequestBody ChatMessage message)
    {
        ChatMessage saved = chatService.saveMessage(message.getUserId(), message.getSender(), message.getMessage());
        return ResponseEntity.ok(saved);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long userId) 
    {
        List<ChatMessage> list = chatService.getHistory(userId);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatMessage>> getHistory(@PathVariable Long userId) 
    {
        List<ChatMessage> list = chatService.getHistory(userId);
        return ResponseEntity.ok(list);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long userId)
    {
        chatService.clearHistory(userId);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> clearHistory(@PathVariable Long userId) 
    {
        chatService.clearHistory(userId);
        return ResponseEntity.noContent().build();
    }
}

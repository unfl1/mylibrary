package com.example.mylibrary.controller;

import com.example.mylibrary.dto.CommentCreateDto;
import com.example.mylibrary.dto.CommentDto;
import com.example.mylibrary.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/post/{postId}/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentCreateDto commentCreateDto) {
        commentService.createComment(commentCreateDto);
        return new ResponseEntity<>("Comment created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}/comment")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        List<CommentDto> commentDtos = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(commentDtos);
    }
}
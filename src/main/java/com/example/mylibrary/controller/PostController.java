package com.example.mylibrary.controller;

import com.example.mylibrary.domain.Post;
import com.example.mylibrary.dto.PostCreateDto;
import com.example.mylibrary.dto.PostListDto;
import com.example.mylibrary.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/post/create")
    public ResponseEntity<Post> createPost(@RequestBody PostCreateDto postCreateDto) {
        Post post = postService.createPost(postCreateDto);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/post/posts")
    public ResponseEntity<List<PostListDto>> getAllPosts() {
        List<PostListDto> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
}
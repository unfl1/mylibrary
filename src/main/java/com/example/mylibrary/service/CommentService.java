package com.example.mylibrary.service;

import com.example.mylibrary.domain.Comment;
import com.example.mylibrary.domain.Post;
import com.example.mylibrary.domain.SiteUser;
import com.example.mylibrary.dto.CommentCreateDto;
import com.example.mylibrary.dto.CommentDto;
import com.example.mylibrary.repository.CommentRepository;
import com.example.mylibrary.repository.PostRepository;
import com.example.mylibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Comment createComment(CommentCreateDto commentCreateDto) {
        Post post = postRepository.findById(commentCreateDto.getPostId()).orElseThrow(() -> new IllegalArgumentException("Post not found"));
        SiteUser user = userRepository.findByUsername(commentCreateDto.getUsername()).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment parentComment = null;
        if (commentCreateDto.getParentCommentId() != null) {
            parentComment = commentRepository.findById(commentCreateDto.getParentCommentId()).orElse(null);
        }

        Comment comment = new Comment();
        comment.setContent(commentCreateDto.getContent());
        comment.setCreatedAt(new Date());
        comment.setPost(post);
        comment.setUser(user);
        comment.setParentComment(parentComment);

        return commentRepository.save(comment);
    }

    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<CommentDto> commentDTOs = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto commentDto = new CommentDto();
            commentDto.setId(comment.getId());
            commentDto.setContent(comment.getContent());
            commentDto.setCreatedAt(comment.getCreatedAt());
            commentDto.setPostId(comment.getPost().getId());
            commentDto.setUsername(comment.getUser().getUsername());
            commentDto.setParentCommentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null);
            commentDto.setNickname(comment.getUser().getNickname());

            commentDTOs.add(commentDto);
        }

        return commentDTOs;
    }
}
package com.example.mylibrary.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDto {
    private Long id;
    private String content;
    private Date createdAt;
    private Long postId;
    private String username;
    private Long parentCommentId;
    private String nickname;
}
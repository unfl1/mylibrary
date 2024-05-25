package com.example.mylibrary.dto;

import lombok.Data;

@Data
public class PostCreateDto {
    private String title;
    private String content;
    private String location;
    private int cost;
    private String username; // 사용자 이름을 추가합니다.
}
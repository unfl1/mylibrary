package com.example.mylibrary.dto;

import lombok.Data;

@Data
public class PostListDto {
    private String title;
    private String location;
    private int cost;
    private String authorNickname;
}
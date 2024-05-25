package com.example.mylibrary.repository;

import com.example.mylibrary.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
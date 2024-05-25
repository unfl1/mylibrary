package com.example.mylibrary.service;

import com.example.mylibrary.domain.Post;
import com.example.mylibrary.domain.SiteUser;
import com.example.mylibrary.dto.PostCreateDto;
import com.example.mylibrary.dto.PostDetailDto;
import com.example.mylibrary.dto.PostListDto;
import com.example.mylibrary.repository.PostRepository;
import com.example.mylibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(PostCreateDto postCreateDto) {
        // 요청에서 사용자 이름을 받아서 해당 사용자를 찾습니다.
        SiteUser author = userRepository.findByUsername(postCreateDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Post post = new Post();
        post.setTitle(postCreateDto.getTitle());
        post.setContent(postCreateDto.getContent());
        post.setLocation(postCreateDto.getLocation());
        post.setCost(postCreateDto.getCost());
        post.setAuthor(author);
        post.setCreatedAt(new Date());
        post.setViews(0);

        return postRepository.save(post);
    }

    // 모든 게시물 조회
    public List<PostListDto> getAllPosts() {
        return postRepository.findAll().stream().map(post -> {
            PostListDto postResponseDto = new PostListDto();
            postResponseDto.setPostId(post.getId()); // postId 설정
            postResponseDto.setTitle(post.getTitle());
            postResponseDto.setLocation(post.getLocation());
            postResponseDto.setCost(post.getCost());
            postResponseDto.setAuthorNickname(post.getAuthor().getNickname());
            return postResponseDto;
        }).collect(Collectors.toList());
    }

    public PostDetailDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        PostDetailDto postDetailDto = new PostDetailDto();
        postDetailDto.setPostId(post.getId());  // postId를 설정합니다.
        postDetailDto.setTitle(post.getTitle());
        postDetailDto.setContent(post.getContent());
        postDetailDto.setLocation(post.getLocation());
        postDetailDto.setCost(post.getCost());
        postDetailDto.setAuthorNickname(post.getAuthor().getNickname());
        postDetailDto.setUsername(post.getAuthor().getUsername()); // 작성자의 username 설정
        postDetailDto.setCreatedAt(post.getCreatedAt());
        postDetailDto.setViews(post.getViews());

        // 조회수 증가 로직 추가
        post.setViews(post.getViews() + 1);
        postRepository.save(post);

        return postDetailDto;
    }

    // 게시물 삭제
    public void deletePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // 게시물 작성자와 요청한 사용자를 비교하여 인증합니다.
        if (!post.getAuthor().getUsername().equals(username)) {
            throw new IllegalArgumentException("You are not authorized to delete this post");
        }

        postRepository.delete(post);
    }
}
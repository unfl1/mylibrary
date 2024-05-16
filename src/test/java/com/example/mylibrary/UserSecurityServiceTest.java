package com.example.mylibrary;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.mylibrary.domain.SiteUser;
import com.example.mylibrary.repository.UserRepository;
import com.example.mylibrary.service.UserSecurityService;

@SpringBootTest
public class UserSecurityServiceTest {

    @Test
    public void testGetUserNickname() {
        // 가짜 UserRepository 생성
        UserRepository userRepository = mock(UserRepository.class);

        // 사용자 객체 생성
        SiteUser user = new SiteUser();
        user.setUsername("testUser");
        user.setNickname("TestNickname");

        // UserRepository가 findByUsername 메서드를 호출할 때 사용자를 반환하도록 설정
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));

        // UserSecurityService 객체 생성
        UserSecurityService userSecurityService = new UserSecurityService(userRepository);

        // 테스트할 메서드 호출
        String nickname = userSecurityService.getUserNickname("testUser");

        // 예상 결과와 실제 결과 비교
        assertEquals("TestNickname", nickname);
    }
}

# 나만의 도서관

**도서 공유 서비스 개발과 배포 자동화 실습**

**담당 역할**　프론트엔드·백엔드 개발 · 배포 환경 및 CI/CD 구축  
**기술**　React, Spring Boot, Spring Data JPA, MariaDB, Docker, Docker Compose, Kubernetes, Jenkins, k6, Grafana  
**GitHub**　[unfl1/mylibrary](https://github.com/unfl1/mylibrary)

### 시스템 구조

![나만의 도서관 서비스 및 배포 아키텍처](mylibrary-architecture.png)

### 핵심 기능

**도서 게시글** — 이미지·위치·비용·보증금을 포함한 게시글 등록. 목록·상세 조회, 제목 검색, 내 게시글 조회·삭제.

**회원·댓글** — 회원가입·로그인과 게시글 댓글 기능.

### 주요 개발 내용

#### 1. 개발 환경부터 서버 배포까지 자동화

Dockerfile과 Docker Compose로 실행 환경을 구성하고 Kubernetes에 배포. Jenkins CI/CD를 구축해 로컬에서 수정한 코드를 GitHub에 반영하면 실습 서버의 빌드·배포로 이어지도록 자동화.

#### 2. 부하 상황의 서비스 동작 확인

k6로 부하를 주고 Grafana에서 테스트 지표 확인. 로그도 함께 살펴보며 요청이 몰릴 때 서비스가 어떻게 동작하는지 확인.

#### 3. 게시글 정보와 이미지의 통합 업로드

React 작성 폼에서 텍스트와 이미지를 `FormData`에 담아 전송하고, Spring Boot에서 `MultipartFile`로 받아 파일 시스템에 저장. 이미지 경로를 게시글과 연결해 목록·상세 화면에서 작성자 정보와 함께 표시.

#### 4. 조회 목적에 따른 API 응답 구성

전체 목록·상세·내 게시글 화면에 맞춰 응답 DTO를 분리하고, 제목 검색은 `findByTitleContainingIgnoreCase`로 처리. 상세 조회 시 조회 수를 증가시키고 댓글 기능은 별도의 컨트롤러·서비스·저장소로 구성.

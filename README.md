# 나만의 도서관

**도서 공유 서비스를 개발하고 Docker와 Kubernetes로 배포한 프로젝트**

사용자가 가진 책을 대여 게시글로 등록하고, 다른 사용자가 목록과 상세 내용을 살펴볼 수 있는 도서 공유 서비스입니다. 제목 검색, 게시글 이미지 첨부, 댓글, 본인 게시글 관리와 회원가입 및 로그인 기능을 제공합니다.

React 프론트엔드와 Spring Boot 백엔드를 직접 개발하고, 이 서비스를 대상으로 컨테이너 구성과 클라우드 배포를 실습했습니다. GitHub와 Jenkins를 연결한 빌드 자동화, k6 부하 테스트, Kubernetes Pod의 수동 확장과 Grafana 상태 확인도 수행했습니다.

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 도서 공유 게시글 | 대여할 책의 게시글 등록, 목록 조회, 상세 내용 확인 |
| 도서 검색 | 제목으로 게시글을 검색해 관심 있는 책 확인 |
| 본인 게시글 관리 | 내가 등록한 게시글을 모아 보고 삭제 |
| 이미지 첨부 | 게시글에 도서 이미지를 첨부하고 상세 화면에서 조회 |
| 댓글 | 게시글에 댓글 작성과 조회 |
| 회원 관리 | 회원가입과 로그인 |

## 담당 역할

**강현준: 프론트엔드와 백엔드 개발, 배포 환경 구축**

- React로 도서 목록과 상세 화면, 게시글 작성, 이미지와 댓글 화면 개발
- Spring Boot와 JPA로 회원, 게시글, 이미지 및 댓글 API 구현
- 프론트엔드와 백엔드의 실행 환경을 Docker 이미지로 구성
- 클라우드 Kubernetes 환경에서 서비스를 실행하고 DB 연결과 이미지 저장 위치 조정
- GitHub Webhook과 Jenkins를 연동해 코드 변경 시 빌드가 실행되도록 설정
- k6로 HTTP 부하를 발생시키고 Pod를 수동으로 늘리며 Grafana에서 상태 확인

## 기술

- JavaScript, React, Axios, Tailwind CSS
- Java 17, Spring Boot 3.2.5, Spring Data JPA, Spring Security
- MariaDB
- Docker, Kubernetes, Jenkins
- k6, Grafana

## 시스템 구조

[![나만의 도서관 시스템 구조와 배포 환경](assets/system-overview.png)](assets/system-overview.png)

## 저장소 구성

```text
assets/                       시스템 구조 이미지
src/main/
  java/                       Spring Boot 백엔드
  resources/                  DB 연결 등 애플리케이션 설정
  frontend/                   React 프론트엔드
src/test/                     백엔드 테스트
```

## 로컬 실행

Java 17, MariaDB, Node.js와 npm이 필요합니다.

### 백엔드

사용할 MariaDB 데이터베이스와 계정을 준비한 뒤 `src/main/resources/application.properties`의 DB 연결 정보를 실행 환경에 맞게 설정합니다. 이미지 저장 경로는 `upload.path`와 코드의 `uploads/` 경로를 확인합니다.

저장소 최상위에서 실행합니다.

```bash
./gradlew bootRun
```

Windows에서는 `./gradlew` 대신 `gradlew.bat`을 사용합니다. 별도 포트 설정이 없으면 백엔드는 `http://localhost:8080`에서 실행됩니다.

### 프론트엔드

다른 터미널에서 실행합니다.

```bash
cd src/main/frontend
npm ci
npm start
```

기본 개발 서버 주소는 `http://localhost:3000`입니다. `src/main/frontend/src/Config.js`의 `API_BASE_URL`과 프론트엔드 `package.json`의 `proxy`를 백엔드 주소에 맞춥니다.

## 관련 저장소

- [백엔드 저장소](https://github.com/unfl1/mylibraryback)
- [프론트엔드 저장소](https://github.com/unfl1/mylibraryfront)

## 포트폴리오

[구현 과정과 검증 결과](https://unfl1.github.io/portfolio/#mylibrary)

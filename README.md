# 나만의 도서관

**Docker와 Kubernetes 기반 클라우드 배포 및 운영**

- 담당 역할: 프론트엔드 및 백엔드 개발, 클라우드 배포 환경 구축, Jenkins 빌드 자동화
- 기술: React, Java, Spring Boot, Spring Data JPA, MariaDB, Docker, Kubernetes, Jenkins, k6, Grafana
- GitHub: [백엔드](https://github.com/unfl1/mylibraryback) / [프론트엔드](https://github.com/unfl1/mylibraryfront) / [클라우드 배포 버전](https://github.com/unfl1/mylibrary)

## 시스템 구조

![GitHub와 Jenkins, Kubernetes 컨테이너 배포 환경, k6와 Grafana를 연결한 전체 시스템 구조](assets/system-overview.png)

## 핵심 기능

- 도서 공유 - 도서 대여 게시글 등록, 목록 및 상세 조회, 제목 검색, 본인 게시글 조회와 삭제
- 이미지 및 댓글 - 게시글 이미지 첨부와 조회, 댓글 기능
- 회원 - 회원가입과 로그인

직접 개발한 서비스를 대상으로 Docker 이미지 구성, Kubernetes 배포 환경 구축, Jenkins 빌드 자동화, k6 부하 테스트 및 수동 Pod 확장 수행

## 배포 환경 구축

### 1. 프론트엔드 및 백엔드 컨테이너화와 Kubernetes 배포

#### 전체적인 아키텍처

[![React, Spring Boot, MariaDB의 Docker 컨테이너를 Kubernetes로 관리하는 구조](assets/service-containers.png)](assets/service-containers.png)

#### 구축 과정

- 서비스별 실행 환경을 관리하도록 프론트엔드와 백엔드 저장소를 분리하고 각각 Dockerfile 작성.
- 프론트엔드는 이미지 빌드 중 React를 빌드해 `serve`로 제공하고, 백엔드는 빌드된 JAR을 포함해 Java 17 환경에서 실행.
- 생성한 이미지로 클라우드 Kubernetes 환경에 배포하고, 배포 환경에 맞게 DB 연결과 외부 API 접근, 이미지 저장 위치 조정.

#### 결과

- 프론트엔드와 백엔드 컨테이너를 클라우드 Kubernetes 환경에서 실행.
- 서비스별 실행 환경과 시작 명령을 Dockerfile로 관리.

### 2. GitHub Webhook과 Jenkins 연동 및 빌드 자동화

#### 전체적인 아키텍처

[![로컬 개발, GitHub, Jenkins, Kubernetes로 이어지는 배포 흐름](assets/delivery-flow.png)](assets/delivery-flow.png)

#### 구축 과정

- 코드 변경을 빌드에 연결하도록 클라우드 서버에 Jenkins를 설치하고 GitHub 저장소의 Webhook 연동.
- 저장소에 코드를 push하면 Jenkins 빌드가 자동으로 시작되도록 설정하고 실행 결과 확인.

#### 결과

- GitHub에 push한 코드의 변경 감지부터 Jenkins 빌드 실행까지 자동화해, 빌드를 수동으로 시작하는 과정 대체.

### 3. k6 부하 테스트와 수동 Pod 확장

#### 전체적인 아키텍처

[![k6, 서버, Grafana를 활용한 부하 테스트와 모니터링](assets/load-monitoring.png)](assets/load-monitoring.png)

#### 수행 과정

- Kubernetes에 배포한 서비스를 대상으로 k6에서 HTTP 요청을 보내 부하 테스트 수행.
- 부하 테스트 과정에서 Pod 수를 수동으로 늘려 서비스 실행 규모를 조정하는 스케일 아웃 수행.
- Grafana 대시보드에서 배포 환경의 상태를 확인하며 테스트와 Pod 확장 과정 관찰.

#### 결과

- 배포된 서비스에 부하를 발생시키고 Pod를 수동 증설하는 과정을 통해, Kubernetes 실행 규모 조정과 상태 모니터링 경험 확보.

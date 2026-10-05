# miji-jeong.github.io

[Academic Pages](https://github.com/academicpages/academicpages.github.io) 기반
개인 연구 홈페이지. 공개 중: **https://miji-jeong.github.io**

`main` 에 푸시하면 `.github/workflows/pages.yml` 이 빌드해서 자동 배포함 (1~3분).

---

## 업데이트하는 법

```sh
cd /Users/miji/orca/workspaces/miji-page/drum
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"   # 시스템 Ruby 2.6은 버전이 낮아 사용 불가

bundle exec jekyll serve --livereload            # 1. 미리보기 서버
                                                 # 2. 파일 수정 → localhost:4000 에서 확인
git add -A
git commit -m "무엇을 바꿨는지"                   # 3. 기록
git push origin drum:main                        # 4. 배포
```

- 미리보기: <http://localhost:4000> — 파일 저장하면 자동 새로고침
- **`_config.yml` 을 고쳤을 때만** 서버를 껐다(Ctrl-C) 켜야 함. 나머지는 자동 반영
- 푸시 후 배포 상태: <https://github.com/miji-jeong/miji-jeong.github.io/actions>

### 터미널 없이 고치기

GitHub 웹에서 파일을 열고 연필 아이콘 → 수정 → Commit changes.
오타 수정처럼 작은 건 이게 더 빠름. 커밋하면 역시 자동 배포됨.
단 로컬에서 다시 작업하기 전에 `git pull origin main` 필수.

---

## 어디를 고치면 되나

| 고치고 싶은 것 | 파일 |
|---|---|
| 이름, 소속, 이메일, ORCID, Google Scholar, arXiv (사이드바) | `_config.yml` |
| 상단 메뉴 순서 / 항목 | `_data/navigation.yml` |
| 첫 화면 소개글, News | `_pages/about.md` |
| Research | `_pages/research.md` |
| Observing | `_pages/observing.md` |
| Useful Links | `_pages/links.md` (현재 비어 있음) |
| Contact | `_pages/contact.md` |
| 프로필 사진 | `images/profile.jpg` 교체 (정사각, 800px 정도로 줄여서) |
| CV PDF | `files/cv.pdf` 교체 — CV 페이지 뷰어와 다운로드가 같이 바뀜 |
| 메뉴바 색 | `_sass/_custom.scss` 맨 위 `:root` 네 줄 |

### 논문 추가

`_publications/` 에 파일 하나 = 논문 하나. 기존 파일을 복사해서 쓰면 됨.

```
_publications/YYYY-MM-DD-slug.md
```

- `category` 는 `first-author` 또는 `co-author`. 섹션 이름은 `_config.yml` 의
  `publication_category` 에서 바꿀 수 있음
- 번호 `[1] [2] …` 는 자동. 1저자 목록 다음에 공저 목록이 이어서 매겨짐
- `paperurl` 은 가능하면 DOI (`https://doi.org/...`) 로. 없으면 줄째로 빼면 됨
- `permalink` 은 파일명과 맞출 것

### 발표 추가

`_talks/YYYY-MM-DD-slug.md`. `type` 이 `Poster` 면 Posters 섹션으로,
그 외(`Talk`, `Colloquium`, `Webinar` …)는 위쪽 섹션으로 자동 분류됨.
연도 묶음도 날짜에서 자동 생성.

### 강의 / 멘토링 / 아웃리치 추가

`_teaching/YYYY-MM-DD-slug.md`. `type` 으로 분류됨:

| `type` | 들어가는 섹션 |
|---|---|
| `Outreach` | Outreach |
| `Mentorship` | Mentoring |
| `Invited lecture`, `Teaching assistant` | Teaching |

---

## 구조 메모

- `_pages/talks.html`, `outreach.html`, `publications.html` 은 템플릿의 기본
  include 대신 목록 마크업을 직접 들고 있음. 개별 페이지를 만들지 않기 위해
  (`_config.yml` 의 collections 에서 `output: false`) 링크 없는 평문으로 출력함
- `_sass/_custom.scss` 는 맨 마지막에 import 되므로 테마 파일을 안 건드리고
  덮어쓸 수 있음. 템플릿을 나중에 업데이트해도 안 깨짐
- `assets/js/cv-viewer.js` 는 front matter가 없어서 Jekyll이 건드리지 않고
  그대로 복사함 (JS의 `${...}` 를 Liquid가 먹는 걸 피하려고)
- Gemfile 은 Jekyll 4 기준. 템플릿 기본값인 `github-pages` 젬은 Ruby 4에서
  설치가 안 돼서 교체했고, CI도 같은 Gemfile로 빌드함

## 다시 숨기려면

레포를 private 으로 되돌리면 Pages 도 같이 내려감
(Settings → General → 맨 아래 Change visibility).

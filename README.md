# miji-jeong.github.io

[Academic Pages](https://github.com/academicpages/academicpages.github.io) 기반
개인 연구 홈페이지.

공개되면 주소는 `https://miji-jeong.github.io/`.

---

## 로컬에서 미리보기

```sh
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"   # 시스템 Ruby 2.6은 너무 낮아서 Homebrew Ruby 사용
bundle install
bundle exec jekyll serve --livereload
```

→ http://localhost:4000 (저장하면 자동 새로고침)

`_config.yml` 을 고쳤을 때만 서버를 껐다 켜야 함. 나머지 파일은 자동 반영.

---

## 어디를 고치면 되나

| 고치고 싶은 것 | 파일 |
|---|---|
| 이름, 소속, 이메일, ORCID, Google Scholar 등 사이드바 | `_config.yml` |
| 상단 메뉴 순서 / 항목 | `_data/navigation.yml` |
| 첫 화면 (About, News) | `_pages/about.md` |
| Research 페이지 | `_pages/research.md` |
| CV 페이지 | `_pages/cv.md` |
| Contact 페이지 | `_pages/contact.md` |
| 프로필 사진 | `images/profile.jpg` 를 교체 (정사각, 800px 정도로 줄여서) |
| CV PDF | `files/cv.pdf` 로 저장 |
| 색 테마 | `_config.yml` 의 `site_theme` — `default`, `air`, `sunrise`, `mint`, `dirt`, `contrast` |

`TODO` 로 표시된 곳이 아직 내 내용으로 안 바뀐 자리.

## 논문 / 발표 / 강의 추가하기

각각 파일 하나 = 항목 하나. 기존 예시 파일을 복사해서 쓰면 됨.

```
_publications/YYYY-MM-DD-slug.md   → Publications 페이지
_talks/YYYY-MM-DD-slug.md          → Talks 페이지
_teaching/YYYY-term-slug.md        → Teaching 페이지
```

파일명을 바꾸면 안쪽 `permalink` 도 같이 바꿔야 함.

논문의 `category` 는 `manuscripts`(심사 논문) 또는 `conferences`(프로시딩).
카테고리 이름은 `_config.yml` 의 `publication_category` 에서 바꿀 수 있음.

---

## 공개하기

지금은 레포가 **private** 이고 Pages 도 꺼져 있어서 아무도 못 들어옴.

공개할 때:

1. Settings → General → 맨 아래 Change visibility → **Public**
2. Settings → Pages → Build and deployment → Source → **GitHub Actions**
3. `main` 브랜치에 푸시하면 `.github/workflows/pages.yml` 이 빌드·배포

다시 숨기려면 레포를 private 으로 되돌리면 Pages 도 같이 내려감.

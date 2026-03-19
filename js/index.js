// TIL 데이터 관리를 위한 키
const TIL_STORAGE_KEY = "til-data";

// DOM 요소 선택
const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

// 초기 데이터 로드 및 렌더링
let tils = JSON.parse(localStorage.getItem(TIL_STORAGE_KEY)) || [];
renderTILs();

// TIL 목록 렌더링 함수
function renderTILs() {
  tilList.innerHTML = "";

  if (tils.length === 0) {
    tilList.innerHTML = '<p class="section-desc">아직 작성된 기록이 없습니다.</p>';
    return;
  }

  // 최신순으로 정렬하여 표시
  const sortedTils = [...tils].sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedTils.forEach((til) => {
    const article = document.createElement("article");
    article.className = "til-item";
    article.innerHTML = `
      <time>${til.date}</time>
      <h3>${til.title}</h3>
      <p>${til.content}</p>
    `;
    tilList.appendChild(article);
  });
}

// 폼 제출 이벤트 리스너
tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(tilForm);
  const newTil = {
    date: formData.get("date"),
    title: formData.get("title"),
    content: formData.get("content"),
    id: Date.now(), // 고유 식별자
  };

  // 데이터 추가 및 저장
  tils.push(newTil);
  localStorage.setItem(TIL_STORAGE_KEY, JSON.stringify(tils));

  // 화면 갱신 및 폼 초기화
  renderTILs();
  tilForm.reset();
});

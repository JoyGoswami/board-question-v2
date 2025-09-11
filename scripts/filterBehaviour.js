import { getAllExamBoardYearSubjectObj } from "./makeQuestionArr.js";

const params = new URLSearchParams(window.location.search);
// purse the stringify object
const { exam, subject, board, year, type } = JSON.parse(
  decodeURIComponent(params.get("data"))
);
console.log(JSON.parse(decodeURIComponent(params.get("data"))));

// nav filter btn behaviour
const navContainer = document.querySelector(".nav-container");
navContainer.addEventListener("click", () => {
  document.querySelector(".filter-overlay-container").classList.add("active");
});

// filter cancel btn
const filterCancelBtn = document.querySelector(".cancel-filter");
filterCancelBtn.addEventListener("click", () => {
  document
    .querySelector(".filter-overlay-container")
    .classList.remove("active");
});

// filter form click
const filterForm = document.querySelector(".filter-form");
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(filterForm);

  const data = Object.fromEntries(formData.entries());
  const dataStr = JSON.stringify(data);

  const dataEncoded = encodeURIComponent(dataStr);
  console.log(dataEncoded);

  window.location.href = `../pages/displayData.html?data=${dataEncoded}`;
});

// Populate filter options
const selectExamEl = document.getElementById("exam");
const selectSubjectEl = document.getElementById("subject");
const selectBoardEl = document.getElementById("board");
const selectYearEl = document.getElementById("year");
const selectTypeEl = document.getElementById("type");

console.log(getAllExamBoardYearSubjectObj(exam));

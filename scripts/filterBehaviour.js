import { getAllExamBoardYearSubjectObj } from "./makeQuestionArr.js";
import { createElement } from "./createElement.js";

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

  const convertSubject = data.subject.split("-").join(" ");
  const convertBoard = data.board.split("-").join(" ");
  const convertType = data.type.split("-").join(" ");

  data.subject = convertSubject;
  data.board = convertBoard;
  data.type = convertType;
  const dataStr = JSON.stringify(data);

  const dataEncoded = encodeURIComponent(dataStr);

  window.location.href = `../pages/displayData.html?data=${dataEncoded}`;
});

// Populate filter options
const { boardsArr, subjectsArr, yearArr, typeArr } =
  getAllExamBoardYearSubjectObj(exam); // get the number of boards, subs, year, type database has

// option gets selected depending on exam
const selectExamEl = document.getElementById("exam");
const selectEl = selectExamEl.options;
for (let i = 0; i < selectEl.length; i++) {
  if (selectEl[i].value === exam) {
    selectEl[i].selected = true;
  }
}

// populate subject
const selectSubjectEl = document.getElementById("subject");
populateOption(subjectsArr, selectSubjectEl, subject);

// populate boards
const selectBoardEl = document.getElementById("board");
populateOption(boardsArr, selectBoardEl, board);

// populate year
const selectYearEl = document.getElementById("year");
populateOption(yearArr, selectYearEl, year);

// populate type
const selectTypeEl = document.getElementById("type");
populateOption(typeArr, selectTypeEl, type);

function populateOption(array, parentEl, selectedOption) {
  array.forEach((data) => {
    const option = createElement("option", null, data, null, null, null);
    option.value = data.split(" ").join("-");
    if (data === selectedOption) {
      option.selected = true;
    }
    parentEl.append(option);
  });
}

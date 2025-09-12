import { getAllExamBoardYearSubjectObj } from "./makeQuestionArr.js";
import { createElement } from "./createElement.js";

// Select Elements
const selectSubjectEl = document.getElementById("subject");
const selectBoardEl = document.getElementById("board");
const selectYearEl = document.getElementById("year");
const selectTypeEl = document.getElementById("type");

const params = new URLSearchParams(window.location.search);
// purse the stringify object
const { exam, subject, board, year, type } = JSON.parse(
  decodeURIComponent(params.get("data"))
);
const uriData = JSON.parse(decodeURIComponent(params.get("data")));
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

  const convertSubject = data.subject.split("-").join(" "); // convert "English-1st-paper" to "English 1st Paper"
  const convertBoard = data.board.split("-").join(" ");
  const convertType = data.type.split("-").join(" ");

  data.subject = convertSubject;
  data.board = convertBoard;
  data.type = convertType;
  const dataStr = JSON.stringify(data);

  const dataEncoded = encodeURIComponent(dataStr);

  window.location.href = `../pages/displayData.html?data=${dataEncoded}`;
});

filterForm.addEventListener("change", (e) => {
  const formData = new FormData(filterForm);
  const onchangeData = Object.fromEntries(formData.entries());

  const exam = onchangeData.exam;
  const convertSubject = onchangeData.subject.split("-").join(" "); // convert "English-1st-paper" to "English 1st Paper"
  const convertBoard = onchangeData.board.split("-").join(" ");
  const convertType = onchangeData.type.split("-").join(" ");

  onchangeData.subject = convertSubject;
  onchangeData.board = convertBoard;
  onchangeData.type = convertType;

  selectBoardEl.innerHTML = "";
  selectSubjectEl.innerHTML = "";
  selectYearEl.innerHTML = "";
  selectTypeEl.innerHTML = "";
  console.log(
    onchangeData.exam,
    onchangeData.subject,
    onchangeData.board,
    onchangeData.year,
    onchangeData.type
  );
  console.log(
    getAllExamBoardYearSubjectObj(
      onchangeData.exam,
      onchangeData.subject,
      onchangeData.board,
      onchangeData.year,
      onchangeData.type
    )
  );
  const { boardsArr, subjectsArr, yearArr, typeArr } =
    getAllExamBoardYearSubjectObj(
      onchangeData.exam,
      onchangeData.subject,
      onchangeData.board,
      onchangeData.year,
      onchangeData.type
    ); // get the number of boards, subs, year, type database hass

  populateOptions(subjectsArr, boardsArr, yearArr, typeArr, onchangeData);
});

console.log(getAllExamBoardYearSubjectObj(exam, subject, board, year, type));
// Populate filter options
const { boardsArr, subjectsArr, yearArr, typeArr } =
  getAllExamBoardYearSubjectObj(exam, subject, board, year, type); // get the number of boards, subs, year, type database has

// option gets selected depending on exam
const selectExamEl = document.getElementById("exam");
const selectEl = selectExamEl.options;
for (let i = 0; i < selectEl.length; i++) {
  if (selectEl[i].value === exam) {
    selectEl[i].selected = true;
  }
}

populateOptions(subjectsArr, boardsArr, yearArr, typeArr, uriData);
function populateOptions(
  subjectsArr,
  boardsArr,
  yearArr,
  typeArr,
  selectedData
) {
  const { exam, subject, board, year, type } = selectedData;
  console.log;
  // populate subject
  createOptions(subjectsArr, selectSubjectEl, subject, false);

  // populate boards
  createOptions(boardsArr, selectBoardEl, board, true);

  // populate year
  createOptions(yearArr, selectYearEl, year, true);

  // populate type
  createOptions(typeArr, selectTypeEl, type, true);
}

function createOptions(array, parentEl, selectedOption, createDefault) {
  if (createDefault) {
    // Initially create an option element for all
    const option = createElement("option", null, "All", null, null, null);
    option.value = "all";
    option.selected = true;
    parentEl.append(option);
  }

  array.forEach((data) => {
    const option = createElement("option", null, data, null, null, null);
    option.value = data.split(" ").join("-");
    if (data === selectedOption) {
      option.selected = true;
    }
    parentEl.append(option);
  });
}

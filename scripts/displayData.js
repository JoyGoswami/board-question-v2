import { allBoardQuestionsDataArr } from "../scripts/data.js";
import { createElement } from "./createElement.js";
import {
  filterData,
  questionArr,
  separatePartAorB,
} from "./makeQuestionArr.js";

const params = new URLSearchParams(window.location.search);
// purse the stringify object
const { exam, subject, board, year, type } = JSON.parse(
  decodeURIComponent(params.get("data"))
);

const filterUserEnteredData = filterData(exam, subject, board, year, type);

// separates part a or b from filterUserEnteredData
separatePartAorBFromUserEnteredData(filterUserEnteredData);
function separatePartAorBFromUserEnteredData(dataArr) {
  const separatePartAorBArr = [];
  dataArr.forEach((data) => {
    const a = separatePartAorB(data, "a");
    const b = separatePartAorB(data, "b");
    separatePartAorBArr.push([a, b]);
  });
  createQuestionEl(separatePartAorBArr);
}

function createQuestionEl(dataArray) {
  const questionContainerEl = document.querySelector(".question-container");
  // questionContainerEl.textContent = ""; // If there is any previous question, clean it

  console.log(dataArray);
  dataArray.forEach((data) => {
    console.log(data);
    const boardName = data[0][0].board || data[1][0].board;
    const yearName = data[0][0].year || data[1][0].year;
    const subjectName = data[0][0].subjectName || data[1][0].subjectName;

    let partNameA = "";
    let partNameB = "";
    if (data[0].length > 0) {
      partNameA = data[0][0].partName;
    }
    if (data[1].length > 0) {
      partNameB = data[1][0].partName;
    }

    const questionEl = createElement(
      "div",
      ["questin"],
      null,
      null,
      null,
      null
    );

    // question title
    createQuestionTitleEl(subjectName, boardName, yearName, questionEl);

    // Part A
    createPartEl(partNameA, questionEl);

    questionContainerEl.append(questionEl);
  });
}

function createQuestionTitleEl(subjectName, boardName, yearName, parentEl) {
  // It creates the title of the question and append it to questionEl

  const questionDetailsEl = createElement(
    "div",
    ["question-details"],
    null,
    null,
    null,
    null
  );

  const boardNameEl = createElement(
    "h2",
    ["board-name"],
    `${boardName} ${yearName}`,
    null,
    null,
    null,
    null
  );
  const subjectNameEl = createElement(
    "p",
    ["subject-name"],
    subjectName,
    null,
    null,
    null
  );

  questionDetailsEl.append(boardNameEl, subjectNameEl);
  parentEl.append(questionDetailsEl);
}

function createPartEl(partName, parentEl) {
  const partEl = createElement("div", ["part"], null, "p", null, partName);

  parentEl.append(partEl);
}

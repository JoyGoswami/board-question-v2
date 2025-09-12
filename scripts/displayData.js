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
  createQuestion(separatePartAorBArr);
}

function createQuestion(dataArray) {
  console.log(dataArray);
}

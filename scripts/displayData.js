import { allBoardQuestionsDataArr } from "../scripts/data.js";
import { createElement } from "./createElement.js";
import { questionArr } from "./makeQuestionArr.js";

const params = new URLSearchParams(window.location.search);
// purse the stringify object
const { exam, subject, board, year, type } = JSON.parse(
  decodeURIComponent(params.get("data"))
);

console.log(questionArr);
const filteredQuestionArr = [];
filterData(exam, subject, board, year, type);
function filterData(exam, subject, board, year, type) {
  // empty the filteredQuestionArr (it will store the filtered data)
  filteredQuestionArr.splice(0, filteredQuestionArr.length);
  // console.log(exam);

  questionArr.forEach((questionData) => {
    const filteredData = questionData.filter((data) => {
      // if board === "all" it will not filter the data
      // instead return the all board data
      // If board === "Dhaka Board"
      // it will return only dhaka board data

      const matchExam = data.examName === exam;
      const matchSubject = data.subjectName === subject;
      const matchBoard = board === "all" || data.board === board;
      const matchYear = year === "all" || data.year === year;
      const matchType = type === "all" || data.question_type === type;

      return matchExam && matchSubject && matchBoard && matchYear && matchType;
    });
    if (filteredData.length > 0) {
      filteredQuestionArr.push(filteredData);
    }
  });

  console.log(filteredQuestionArr);
}

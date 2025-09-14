import { allBoardQuestionsDataArr } from "../scripts/data.js";

// a("ssc", "English 2nd Paper", "all", "all", "all");
export function a(exam, subject, board, year, type) {
  const boardsArr = [];
  const subjectsArr = [];
  const yearArr = [];
  const typeArr = [];
  const allBoardYearSubObj = {};

  const filteredData = allBoardQuestionsDataArr.filter((data) => {
    const matchExam = data.examName === exam;
    const matchSubject = data.subjectName === subject;
    const matchBoard = board === "all" || data.board === board;
    const matchYear = year === "all" || data.year === year;
    const matchType = type === "all" || data.question_type === type;

    return matchExam && matchSubject && matchBoard && matchYear && matchType;
  });
  filteredData.forEach((data) => {
    const board = data.board;
    const year = data.year;
    const subject = data.subjectName;
    const type = data.question_type;
    if (!boardsArr.includes(board)) {
      boardsArr.push(board);
    }
    if (!subjectsArr.includes(subject)) {
      subjectsArr.push(subject);
    }
    if (!yearArr.includes(year)) {
      yearArr.push(year);
    }
    if (!typeArr.includes(type)) {
      typeArr.push(type);
    }
  });
  allBoardYearSubObj.boardsArr = boardsArr;
  allBoardYearSubObj.subjectsArr = subjectsArr;
  allBoardYearSubObj.yearArr = yearArr;
  allBoardYearSubObj.typeArr = typeArr;
  return allBoardYearSubObj;
}

export function getAllExamBoardYearSubjectObj(examName) {
  /*
  returns something like this =>
  {
    boardsArr: ["Dhaka Board", "Comilla Board"]
    subjectsArr: ["English 1st Paper","English 2nd Paper"]
    yearArr: ["2025","2024"]  
  }

  */
  const boardsArr = [];
  const subjectsArr = [];
  const yearArr = [];
  const typeArr = [];
  const allBoardYearSubObj = {};

  allBoardQuestionsDataArr.forEach((data) => {
    if (data.examName === examName) {
      const board = data.board;
      const year = data.year;
      const subject = data.subjectName;
      const type = data.question_type;
      if (!boardsArr.includes(board)) {
        boardsArr.push(board);
      }
      if (!subjectsArr.includes(subject)) {
        subjectsArr.push(subject);
      }
      if (!yearArr.includes(year)) {
        yearArr.push(year);
      }
      if (!typeArr.includes(type)) {
        typeArr.push(type);
      }
    } else if (examName === "all") {
      const board = data.board;
      const year = data.year;
      const subject = data.subjectName;
      const type = data.question_type;
      if (!boardsArr.includes(board)) {
        boardsArr.push(board);
      }
      if (!subjectsArr.includes(subject)) {
        subjectsArr.push(subject);
      }
      if (!yearArr.includes(year)) {
        yearArr.push(year);
      }
      if (!typeArr.includes(type)) {
        typeArr.push(type);
      }
    }
  });

  allBoardYearSubObj.boardsArr = boardsArr;
  allBoardYearSubObj.subjectsArr = subjectsArr;
  allBoardYearSubObj.yearArr = yearArr;
  allBoardYearSubObj.typeArr = typeArr;
  return allBoardYearSubObj;
}

export function getAllBoardExamYear(examName) {
  /*
  returns something like this =>
  ["hsc Dhaka-Board 2025 English-2nd-Paper","hsc mymensingh-Board 2024 English-2nd-Paper"]
  */
  const allBoardExamYearArr = [];

  allBoardQuestionsDataArr.forEach((data) => {
    if (data.examName === examName) {
      const board = data.board.split(" ").join("-"); // converts "Dhaka Board" to "Dhaka-Board"
      const subject = data.subjectName.split(" ").join("-");
      let filterStr = `${data.examName} ${board} ${data.year} ${subject}`;

      if (!allBoardExamYearArr.includes(filterStr)) {
        allBoardExamYearArr.push(filterStr);
      }
    } else if (examName === "all") {
      const board = data.board.split(" ").join("-"); // converts "Dhaka Board" to "Dhaka-Board"
      const subject = data.subjectName.split(" ").join("-");
      let filterStr = `${data.examName} ${board} ${data.year} ${subject}`;

      if (!allBoardExamYearArr.includes(filterStr)) {
        allBoardExamYearArr.push(filterStr);
      }
    }
  });
  return allBoardExamYearArr;
}

export const questionArr = [];
const allBoardExamYearArr = getAllBoardExamYear("all");
// It filters mainData Array depending on exam board year subject
// and make an array out of these data and push it into allBoardExamYearArr
allBoardExamYearArr.forEach((data) => {
  const [exam, board, year, subject] = data.split(" ");
  const boardName = board.split("-").join(" "); // converts "Dhaka-Board" to "Dhaka Board"
  const subjectName = subject.split("-").join(" ");
  const question = allBoardQuestionsDataArr.filter((data) => {
    return (
      data.examName === exam &&
      data.board === boardName &&
      data.year === year &&
      data.subjectName === subjectName
    );
  });
  questionArr.push(question);
});

// This separetes part a or b
export function separatePartAorB(array, partName) {
  let partFiltered;
  partFiltered = array.filter((data) => {
    const partArr = data.part === partName;
    return partArr;
  });
  return partFiltered;
}

// It will filter the questionArr depending on user input(exam, subject, board, year, type)
export function filterData(exam, subject, board, year, type) {
  const filteredQuestionArr = []; // stores the filtered data
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
  return filteredQuestionArr;
}

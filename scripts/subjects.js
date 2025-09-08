import { allBoardQuestionsDataArr } from "../scripts/data.js";
import { createElement } from "./createElement.js";
/* 
    1. window.location.search gives the query string part of
       the url i.e everything after ?. here in this case ?data=ssc
    2. new URLSearchParams() creates on object that extract query
    3. params.get("data") get the value of data
    4. decodeURIComponent() converts URL-encoded characters into normal
        text -> %20 bacomes (space)
*/
const params = new URLSearchParams(window.location.search);
const examName = decodeURIComponent(params.get("data"));

const hscSubjectNameSelfDefined = [
  "HSC Bangla",
  "HSC English 1st Paper",
  "HSC English 2nd Paper",
  "HSC Math",
  "HSC Religion",
  "HSC ICT",
  "HSC Physics",
  "HSC Chemistry",
  "HSC Finance",
  "HSC Management",
  "HSC Biology",
  "HSC Biology 2nd Paper",
];
let sscSubjectNameSelfDefined = [
  "SSC Bangla",
  "SSC English 1st Paper",
  "SSC English 2nd Paper",
  "SSC Math",
  "SSC Religion",
  "SSC ICT",
  "SSC Physics",
  "SSC Chemistry",
  "SSC Finance",
  "SSC Management",
  "SSC Biology",
  "SSC Biology 2nd Paper",
];
const filteredSubjectNameArr = getSubjectName(examName);

function getSubjectName(examName) {
  // gets the subject name from the main data array
  let subjectNameArr = [];
  allBoardQuestionsDataArr.forEach((data) => {
    const subjectNames = data.subjectName;
    if (examName === data.examName) {
      if (!subjectNameArr.includes(subjectNames)) {
        subjectNameArr.push(subjectNames);
      }
    }
  });

  let filteredSubjectNameArr;
  if (subjectNameArr.length === 0) {
    subjectNameArr = "";
  }
  if (examName === "ssc") {
    filteredSubjectNameArr = subjectNameArr || sscSubjectNameSelfDefined;
  } else {
    filteredSubjectNameArr = subjectNameArr || hscSubjectNameSelfDefined;
  }
  return filteredSubjectNameArr;
}

// populate subject data on the page
const subjectCardContainer = document.querySelector(".subject-card-container");
filteredSubjectNameArr.forEach((data) => {
  console.log(data);
  const card = createElement("div", ["card"], null, "p", null, null);
  console.log(card);
  subjectCardContainer.append(card);
});

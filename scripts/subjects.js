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

let clickedSubjectStr = ""; // it will store subject and year clicked by user

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
const { filteredSubjectNameArr, yearArr } = getSubjectName(examName);

function getSubjectName(examName) {
  // gets the subject name from the main data array
  let subjectNameArr = [];
  let yearArr = ["All"];
  allBoardQuestionsDataArr.forEach((data) => {
    const subjectNames = data.subjectName;
    if (examName === data.examName) {
      if (!subjectNameArr.includes(subjectNames)) {
        subjectNameArr.push(subjectNames);
        yearArr.push(data.year);
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
  const subjectYearObj = {
    filteredSubjectNameArr: filteredSubjectNameArr,
    yearArr: yearArr,
  };
  // console.log(subjectYearObj);
  // return filteredSubjectNameArr;
  return subjectYearObj;
}

// populate subject data on the page
const subjectCardContainer = document.querySelector(".subject-card-container");
filteredSubjectNameArr.forEach((data) => {
  // console.log(data);
  const card = createElement("div", ["card"], null, "p", null, data);
  // console.log(card);
  subjectCardContainer.append(card);
});

// subject card click behaviour
const overlayContainerEl = document.querySelector(".overlay-year-container");
const yearContainerEl = document.querySelector(".year-card-container");
const subjectCardsEl = document.querySelectorAll(".card");

// Subject card click handle
subjectCardsEl.forEach((card) => {
  card.addEventListener("click", (e) => {
    yearContainerEl.innerHTML = "";
    yearArr.forEach((data) => {
      const yearCard = createElement(
        "div",
        ["year-card"],
        null,
        "p",
        null,
        data
      );
      yearContainerEl.append(yearCard);
    });
    overlayContainerEl.style.display = "block";
    clickedSubjectStr = e.target.textContent;
    // when the subject card is clicked
    // year card will be displayed
    // then handleYearCardClick() function will run
    handleYearCardClick();
  });
});

overlayContainerEl.addEventListener("click", (e) => {
  // If Touched outside of the year cards overlay will not be displayed
  if (e.target.classList.contains("out-side")) {
    overlayContainerEl.style.display = "none";
  }
});

// Year card click handle
function handleYearCardClick() {
  const yearCardEl = document.querySelectorAll(".year-card");
  yearCardEl.forEach((card) => {
    card.addEventListener("click", (e) => {
      const clickedSubjectYearObj = {
        subject: clickedSubjectStr,
        year: e.target.textContent,
        type: "All",
      };
      const clickedSubjectYearObjStr = JSON.stringify(clickedSubjectYearObj);
      const subjectYearStrEncoded = encodeURIComponent(
        clickedSubjectYearObjStr
      );
      window.location.href = `../pages/displayData.html?data=${subjectYearStrEncoded}`;
    });
  });
}

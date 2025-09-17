export function createElement(
  element,
  elClassArr,
  elTextContent,
  childEl,
  childElClassArr,
  childElTextContent
) {
  const createEl = document.createElement(element);
  if (elClassArr !== null) {
    elClassArr.forEach((classes) => {
      createEl.classList.add(classes);
    });
  }
  if (elTextContent !== null) {
    createEl.textContent = elTextContent;
  }
  let createChildEl;
  if (childEl !== null) {
    createChildEl = document.createElement(childEl);
    if (childElTextContent !== null) {
      createChildEl.textContent = childElTextContent;
    }
    if (childElClassArr !== null) {
      childElClassArr.forEach((classes) => {
        createChildEl.classList.add(classes);
      });
    }

    createEl.append(createChildEl);
  }

  return createEl;
}

function createQuestionsElextra(
  questionNo,
  questionTitle,
  questionMark,
  questionClues,
  question,
  parentEl
) {
  const questionItemEl = createElement(
    "div",
    ["question-items"],
    null,
    null,
    null,
    null
  );
  // Question title container
  const questionTitleContainerEl = createElement(
    "div",
    ["question-title-container"],
    null,
    null,
    null,
    null
  );

  const questionNoEl = createElement(
    "div",
    ["question-no"],
    `${questionNo}.`,
    null,
    null,
    null
  );
  const questionTitleEl = createElement(
    "div",
    ["question-title"],
    questionTitle,
    null,
    null,
    null
  );
  const questionMarkEl = createElement(
    "div",
    ["mark"],
    questionMark,
    null,
    null,
    null
  );

  questionTitleContainerEl.append(
    questionNoEl,
    questionTitleEl,
    questionMarkEl
  );
  // Question body container
  const questionBodyContainerEl = createElement(
    "div",
    ["question-body-container"],
    null,
    null,
    null,
    null
  );

  const blankEl = createElement("div", ["blank"], null, null, null, null);
  // Question body
  const questionBodyEl = createElement(
    "div",
    ["question-body"],
    null,
    null,
    null,
    null
  );
  // Question Clues
  let questionCluesEl;

  if (questionClues !== null) {
    questionCluesEl = createElement(
      "div",
      ["question-clues"],
      null,
      null,
      null,
      null
    );
    createQuestionClues(questionClues, questionCluesEl);
  }
  // Question body details
  const questionBodyDetailsEl = createElement(
    "div",
    ["question-body-details"],
    null,
    null,
    null,
    null
  );

  if (question !== null) {
    question.forEach((data) => {
      const p = createElement("p", null, data, null, null, null);
      questionBodyDetailsEl.append(p);
    });
    questionItemEl.append(questionTitleContainerEl, questionBodyContainerEl);
  } else {
    questionItemEl.append(questionTitleContainerEl);
  }
  // question.forEach((data) => {
  //   const p = createElements("p", null, data);
  //   questionBodyDetailsEl.append(p);
  // });

  // questionItemEl.append(questionTitleContainerEl, questionBodyContainerEl);

  if (questionClues !== null) {
    questionBodyEl.append(questionCluesEl, questionBodyDetailsEl);
  }
  questionBodyEl.append(questionBodyDetailsEl);
  questionBodyContainerEl.append(blankEl, questionBodyEl);

  parentEl.append(questionItemEl);
}

// This creates question clues depending on arrays
function createQuestionCluesextra(clueArr, parentEl) {
  console.log(clueArr);
  if (clueArr > 1) {
    const table = createElement("table", null, null, null, null, null);
    // First Table Row
    const trOne = createElement("tr", null, null, null, null, null);

    // Table data in First Row
    const firstFiveClues = clueArr.splice(0, 5); // Takes first 5 clues and deletes them
    firstFiveClues.forEach((clue) => {
      const td = createElement("td", null, clue, null, null, null);
      trOne.append(td);
    });

    // Second Table row
    const trTwo = createElement("tr", null, null, null, null, null);

    // Table data in Second Row
    clueArr.forEach((clue) => {
      const td = createElement("td", null, clue, null, null, null);
      trTwo.append(td);
    });

    table.append(trOne, trTwo);
    parentEl.append(table);
  } else {
    const replaceFirstSlash = clueArr[0].replaceAll("/", "<u>");
    const replaceSecondSlash = replaceFirstSlash.replaceAll("|", "</u>");
    const p = createElement("p", null, null, null, null, null);
    p.innerHTML = replaceSecondSlash;
    parentEl.append(p);
  }
}

export function createEnglishEachQuestionEl(questionItems, parentEl) {
  // questionNo,
  // questionTitle,
  // questionMark,
  // questionClues,
  // question,
  // parentEl
  const questionNo = `${questionItems.question_no}.`;
  const questionTitle = questionItems.question_title;
  const questionMark = questionItems.mark;
  const questionType = questionItems.question_type;
  let questionClues = "";
  if (questionItems.clues) {
    questionClues = questionItems.clues;
  }
  const question = questionItems.question;

  // it contains the question title and body
  // it has two child 1. question title | 2. question body
  const questionItemsEl = createElement(
    "div",
    ["question-items"],
    null,
    null,
    null,
    null
  );

  // Question title
  // it has three child 1. question no 2. question title 3. mark
  const questionTitleContainerEl = createElement(
    "div",
    ["question-title-container"],
    null,
    null,
    null,
    null
  );
  const questionNoEl = createElement(
    "div",
    ["question-no"],
    questionNo,
    null,
    null,
    null
  );
  const questionTitleEl = createElement(
    "div",
    ["question-title"],
    questionTitle,
    null,
    null,
    null
  );
  const questionMarkEl = createElement(
    "div",
    ["mark"],
    questionMark,
    null,
    null,
    null
  );
  questionTitleContainerEl.append(
    questionNoEl,
    questionTitleEl,
    questionMarkEl
  );

  // Question Body
  const questionBodyContainerEl = createElement(
    "div",
    ["question-body-container"],
    null,
    null,
    null,
    null
  );

  const questionBodyEl = createElement(
    "div",
    ["question-body"],
    null,
    null,
    null,
    null
  );
  // If the question has clues
  // create a table
  if (questionClues !== "") {
    const questionCluesEl = createElement(
      "div",
      ["question-clues"],
      null,
      null,
      null,
      null
    );
    createQuestionClues(questionClues, questionCluesEl);
    questionBodyEl.append(questionCluesEl);
  }

  const questionBodyDetailsEl = createElement(
    "div",
    ["question-body-details"],
    null,
    null,
    null,
    null
  );
  if (question) {
    // if (question.length > 1 && questionNo === "3.") {
    //   console.log(question);
    //   createTableEl(question, questionBodyContainerEl)
    // } else {
    //   console.log("hello");
    // }
    createQuestionBody(
      question,
      questionNo,
      questionType,
      questionBodyDetailsEl
    );
  }
  // const questionBodyDetailsEl = createElement(
  //   "div",
  //   ["question-body-details"],
  //   question,
  //   null,
  //   null,
  //   null
  // );
  questionBodyEl.append(questionBodyDetailsEl);
  questionBodyContainerEl.append(questionBodyEl);

  // append question title and body to question item
  if (questionItems.part === "a") {
    questionItemsEl.append(questionTitleContainerEl, questionBodyContainerEl);
  } else {
    questionItemsEl.append(questionTitleContainerEl);
  }
  parentEl.append(questionItemsEl);
}

function createQuestionClues(clueArr, parentEl) {
  if (clueArr.length > 1) {
    const firstFiveClues = clueArr.splice(0, 5);
    const lastClues = clueArr;

    const tableEl = createElement("table", null, null, null, null, null);

    const firstTr = createElement("tr", null, null, null, null, null);
    firstFiveClues.forEach((data) => {
      const td = createElement("td", null, null, null, null, null);
      td.textContent = data;
      firstTr.append(td);
    });

    const secondTr = createElement("tr", null, null, null, null, null);
    lastClues.forEach((data) => {
      const td = createElement("td", null, null, null, null, null);
      td.textContent = data;
      secondTr.append(td);
    });

    tableEl.append(firstTr, secondTr);
    parentEl.append(tableEl);
  } else {
    const p = document.createElement("p");
    p.innerHTML = clueArr[0];
    parentEl.append(p);
  }
}

function createQuestionBody(questionArr, questionNo, questionType, parentEl) {
  if (questionArr.length > 1 && questionType === "Table") {
    // substitute table
    // createTableEl(questionArr)
    const tableColumnOne = questionArr[0];
    const tableColumnTwo = questionArr[1];
    const tableColumnThree = questionArr[2];

    const tableEl = createElement("table", null, null, null, null, null);
    tableColumnThree.forEach((data, index) => {
      const columnOneData = tableColumnOne[index] || "";
      const columnTwoData = tableColumnTwo[index] || "";
      const columnThreeData = tableColumnThree[index] || "";
      const tr = createElement("tr", null, null, null, null, null);
      const tdOne = createElement("td", null, columnOneData, null, null, null);
      const tdTwo = createElement("td", null, columnTwoData, null, null, null);
      const tdThree = createElement(
        "td",
        null,
        columnThreeData,
        null,
        null,
        null
      );

      tr.append(tdOne, tdTwo, tdThree);
      tableEl.append(tr);
    });

    parentEl.append(tableEl);
  } else if (questionArr.length > 1 && questionType === "Changing sentence") {
    // Changing Sentences
    questionArr.forEach((data) => {
      const p = createElement("p", null, data.question, null, null, null);
      parentEl.append(p);
    });
  } else {
    // rest of the questions
    questionArr.forEach((data) => {
      const p = createElement("p", null, data, null, null, null);
      parentEl.append(p);
    });
  }
}

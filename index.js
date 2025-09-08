const boardCardEl = document.querySelectorAll(".board-card");

boardCardEl.forEach((card) => {
  card.addEventListener("click", (e) => {
    const getTextContent = e.target.textContent; // SSC All Board Questin
    const getExamName = getTextContent.split(" ")[0].toLowerCase(); // ssc

    const examNameEncoded = encodeURIComponent(getExamName);
    window.location.href = `./pages/subjects.html?data=${examNameEncoded}`;
    console.log(examNameEncoded);
  });
});

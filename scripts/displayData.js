import { allBoardQuestionsDataArr } from "../scripts/data.js";
import { createElement } from "./createElement.js";

const params = new URLSearchParams(window.location.search);
// purse the stringify object
const { subject, year, type } = JSON.parse(
  decodeURIComponent(params.get("data"))
);
console.log(subject, year, type);

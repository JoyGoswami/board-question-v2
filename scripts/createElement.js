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

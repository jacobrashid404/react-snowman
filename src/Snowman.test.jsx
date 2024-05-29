import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("If loss, can't click on board, and image doesn't crash", function () {
  const { container } = render(<Snowman />); // TODO: add this to test -> words = ["apple"], maxWrong= 6
  const lettersToCheck = ["w", "x", "y", "z", "b", "c", "k"];

  const $containerElems = lettersToCheck.map((ltr) => { //FIXME: fix this test
    const elem = container.querySelector(`.letter_${ltr}`);
    const elem = container.querySelector(`button[value="${ltr}"]`); //CSS VALUE SELECTOR!!!!

    try {
      fireEvent.click(elem);
    } catch (err) {
      expect(err.message).toContain("Unable to fire a");
    }
    return elem;
  });

  const snowmanImg = container.querySelector(".Snowman-img");
  expect(snowmanImg.src).toContain("png");
});

//TODO: same test but lose at a different value

//TODO: real verification of functionality, do we win?

//TODO: some more testing!

test("snapshot test", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

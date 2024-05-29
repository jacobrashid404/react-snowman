import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("image doesn't disappear if more than 6 guesses are made", function () {
  const { container } = render(<Snowman />);
  const lettersToCheck = ["w", "x", "y", "z", "b", "c", "k"];

  const $containerElems = lettersToCheck.map((ltr) => {
    const elem = container.querySelector(`.letter_${ltr}`);
    fireEvent.click(elem);
    return elem;
  });

  const snowmanImg = container.querySelector(".Snowman-img")
  expect(snowmanImg.src).toContain("png");
});

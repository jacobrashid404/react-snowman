import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("only allow six wrong guesses", function () {
  const { container } = render(<Snowman />);
  const lettersToCheck = ["w", "x", "y", "z", "b", "c", "k"];

  const $containerElems = lettersToCheck.map((ltr) => {
    const elem = container.querySelector(`.letter_${ltr}`);
    fireEvent.click(elem);
    return elem;
  });

  expect(container.querySelector(".Snowman-img")).toBeInTheDocument();
  //TODO: fix test, img will still appear on page, it'll just be broken
});

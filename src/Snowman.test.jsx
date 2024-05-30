import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("If loss, can't click on letter, and image doesn't crash", function () {
  const { container } = render(<Snowman words={["apple"]} maxWrong={6} />);
  const lettersToCheck = ["w", "x", "y", "z", "b", "c", "k"];

  for (let i = 0; i < lettersToCheck.length - 2; i++) {
    const elem = container.querySelector(`button[value="${lettersToCheck[i]}"]`); //CSS VALUE SELECTOR!!!!
    fireEvent.click(elem);
  }

  try {
    const keyToPress = container.querySelector(`button[value="${lettersToCheck[6]}}"]`);
    fireEvent.click(keyToPress);
  } catch (err) {
    expect(err.message).toContain("Unable to fire a");
  }

  const snowmanImg = container.querySelector(".Snowman-img");
  expect(snowmanImg.src).toContain("png");
});


test("Test loss logic with custom maxWrong value", function () {
  const { container } = render(<Snowman words={["apple"]} maxWrong={3} />);
  const lettersToCheck = ["w", "x", "y", "z"];

  for (let i = 0; i < lettersToCheck.length - 2; i++) {
    const elem = container.querySelector(`button[value="${lettersToCheck[i]}"]`); //CSS VALUE SELECTOR!!!!
    fireEvent.click(elem);
  }

  try {
    const keyToPress = container.querySelector(`button[value="${lettersToCheck[6]}}"]`);
    fireEvent.click(keyToPress);
  } catch (err) {
    expect(err.message).toContain("Unable to fire a");
  }
});

//TODO: real verification of functionality, do we win?

//TODO: some more testing!

test("snapshot test", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

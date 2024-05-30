import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("If loss, can't click on letter, and image doesn't crash", function () {
  const { container } = render(
    <Snowman
      words={["apple"]}
      maxWrong={6}
    />,
  );
  const lettersToCheck = ["w", "x", "y", "z", "b", "c", "k"];

  for (let i = 0; i < lettersToCheck.length - 2; i++) {
    const elem = container.querySelector(
      `button[value="${lettersToCheck[i]}"]`,
    ); //CSS VALUE SELECTOR!!!!
    fireEvent.click(elem);
  }

  try {
    const keyToPress = container.querySelector(
      `button[value="${lettersToCheck[6]}}"]`,
    );
    fireEvent.click(keyToPress);
  } catch (err) {
    expect(err.message).toContain("Unable to fire a");
  }

  const snowmanImg = container.querySelector(".Snowman-img");
  expect(snowmanImg.src).toContain("png");
});

test("Test loss logic with custom maxWrong value", function () {
  const { container } = render(
    <Snowman
      words={["apple"]}
      maxWrong={3}
    />,
  );
  const lettersToCheck = ["w", "x", "y", "z"];

  for (let i = 0; i < lettersToCheck.length - 2; i++) {
    const elem = container.querySelector(
      `button[value="${lettersToCheck[i]}"]`,
    ); //CSS VALUE SELECTOR!!!!
    fireEvent.click(elem);
  }

  try {
    const keyToPress = container.querySelector(
      `button[value="${lettersToCheck[6]}}"]`,
    );
    fireEvent.click(keyToPress);
  } catch (err) {
    expect(err.message).toContain("Unable to fire a");
  }
});

//TODO: real verification of functionality, do we win?

test("test for win", function () {});

//TODO: some more testing!

test("test that bad guess changes picture", function () {
  const { debug, container } = render(
    <Snowman
      maxWrong={6}
      words={["apple"]}
    />,
  );
  const $letterElem = container.querySelector(`button[value="b"]`);
  fireEvent.click($letterElem);
  const $snowmanImage = container.querySelector(".Snowman-img");
  expect($snowmanImage.src).toContain("/src/1.png");
});

test("test for correct letter revealed after guess", function () {
  const { debug, container } = render(
    <Snowman
      maxWrong={6}
      words={["apple"]}
    />,
  );

  const $letterElem = container.querySelector(`button[value="a"]`);
  fireEvent.click($letterElem);
  const correctGuessValue = container.querySelector(".Snowman-word").innerHTML;
  expect(correctGuessValue).toContain("a");
});

test("snapshot test", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

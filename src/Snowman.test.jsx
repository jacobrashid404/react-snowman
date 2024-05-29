import {test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

test("only allow six wrong guesses", function () {
  const { container } = render(<Snowman />);
  const xButton = container.querySelector("#letter_x");
  fireEvent.click(xButton);
});
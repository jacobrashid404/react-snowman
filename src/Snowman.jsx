import { useState } from "react";
import "./Snowman.css";
import { randomWord } from "./words.js";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import Button from "./Button.jsx";

/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessedLetters: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman({
  images = [img0, img1, img2, img3, img4, img5, img6],
  words = ["apple"],
  maxWrong = 6,
}) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, setNWrong] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [answer, setAnswer] = useState(randomWord(words));

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer.split("").map((ltr) => (guessedLetters.has(ltr) ? ltr : "_"));
  }

  function checkWin(word, guessedLetters) {
    for (const letter of word) {
      if (!guessedLetters.has(letter)) {
        return false;
      }
    }

    return true;
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessedLetters((g) => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong((n) => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessedLetters.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** handleRestart: picks a random word, reset the guessed list and number of
   * wrong guesses
   */
  function handleRestart() {
    setAnswer(randomWord(words));
    setGuessedLetters(() => new Set());
    setNWrong(0);
  }

  function showGameBoard() {
    if (checkWin(answer, guessedLetters)) {
      return <p>You Win!</p>;
    }
    else if (nWrong === maxWrong) {
      return <p>You Lose!</p>
    }
    else {
      return <p>{generateButtons()}</p>
    }
  }

  return (
    <div className="Snowman">
      <img
        className="Snowman-img"
        src={images[nWrong]}
        alt={nWrong}
      />
      <p>Wrong guesses: {nWrong} | Remaining: {maxWrong - nWrong}</p>
      <p className="Snowman-word">{guessedWord()}</p>
      {showGameBoard()}
      <Button
        label="Restart Game"
        click={handleRestart}
      />
    </div>
  );
}

export default Snowman;

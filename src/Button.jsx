import "./Button.css";

/** Button for resetting game */

function Button({ click, label }) {
  return (
    <button
      className="btn btn-primary"
      onClick={click}
    >
      {label}
    </button>
  );
}

export default Button;

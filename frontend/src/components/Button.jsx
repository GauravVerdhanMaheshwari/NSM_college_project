export default function Button({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#4ECDC4] text-white px-4 py-2 rounded hover:bg-[#38b2ac] transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

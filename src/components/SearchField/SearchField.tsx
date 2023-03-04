interface SearchFieldProps {
  username: string;
  handleCompare: () => void;
  setUsername: (username: string) => void;
}

function SearchField({
  username,
  setUsername,
  handleCompare,
}: SearchFieldProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Github username"
        className="p-2 outline-none font-semibold rounded-xl"
        onChange={({ target }) => setUsername(target.value)}
        value={username}
      />
      <button
        disabled={!username}
        onClick={handleCompare}
        className="bg-blue-400 p-2 rounded-xl text-white font-semibold disabled:opacity-80 hover:bg-blue-600 transition-colors"
        aria-label="Search github by username"
      >
        🔎
      </button>
    </>
  );
}

export default SearchField;

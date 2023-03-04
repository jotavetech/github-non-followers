import { useEffect, useState } from "react";

import { getAllFollowers, getAllFollowing } from "./githubData";

import { AiFillGithub } from "react-icons/ai";

function App() {
  const [username, setUsername] = useState("");
  const [nonFollowers, setNonFollowers] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [notFind, setNotFind] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setError("");
    setNotFind("");

    if (!username) return;

    setLoading(true);

    try {
      const followers = await getAllFollowers(username);
      const followings = await getAllFollowing(username);

      setNonFollowers(() => {
        const newNonFollowers = followings.filter(
          (following) => !followers.includes(following)
        );

        if (newNonFollowers.length === 0) {
          setNotFind("No unfollowers found");
        }

        return newNonFollowers;
      });
    } catch (err) {
      setError("User not found");
      setUsername("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center items-center p-10">
      <div className="flex flex-col ">
        <div className="flex gap-2 shadow-sm p-5 bg-slate-50 rounded-xl transition-all">
          {loading ? (
            <p className="font-semibold">Loading...</p>
          ) : (
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
                className="bg-blue-400 p-2 rounded-xl text-white font-semibold disabled:opacity-80"
                aria-label="Search github by username"
              >
                🔎
              </button>
            </>
          )}
        </div>
        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}
        {notFind && <p className="font-semibold text-center pt-2">{notFind}</p>}

        <div className="flex flex-col gap-2 mt-5">
          {nonFollowers &&
            nonFollowers.map((user) => (
              <a
                href={`https://github.com/${user}`}
                target="_blank"
                className="shadow-sm p-5 bg-slate-100 rounded-xl flex justify-between items-center animated-slide-in cursor-pointer"
                key={user}
              >
                <span className="font-semibold">{user}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-semibold text-gray-600">
                    Visit profile
                  </span>
                  <AiFillGithub />
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

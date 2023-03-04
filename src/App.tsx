import { useState } from "react";

import {
  getAllFollowers,
  getAllFollowing,
  getGithubProfile,
} from "./githubData";

import { AiFillGithub } from "react-icons/ai";

function App() {
  const [username, setUsername] = useState("");
  const [nonFollowers, setNonFollowers] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [notFind, setNotFind] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfileProps | null>(null);

  const handleCompare = async () => {
    setError("");
    setNotFind("");
    setUser(null);
    setNonFollowers(null);

    if (!username) return;

    setLoading(true);

    try {
      const followers = await getAllFollowers(username);
      const followings = await getAllFollowing(username);
      const userProfile = await getGithubProfile(username);

      setUser(userProfile);

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
        {user && (
          <div className="mx-auto mt-10 mb-5 flex flex-col items-center">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              aria-label={`link to ${username} github profile`}
            >
              <img
                src={user.avatar_url}
                alt={`${username} profile picture`}
                className="w-36 rounded-full"
              />
            </a>
            <p className="font-semibold text-lg">{user.login}</p>
            <p className="font-medium text-md text-gray-700">{user.name}</p>
            <div className="flex gap-2">
              <div className="text-slate-700">
                Followers: <span className="font-bold">{user.followers}</span>
              </div>
              <div className="text-slate-700">
                Following: <span className="font-bold">{user.following}</span>
              </div>
            </div>
          </div>
        )}
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

        <div className="flex flex-col gap-2 mt-5 mb-10">
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
      <footer className="fixed bottom-0 w-full bg-gray-600 h-8 flex items-center justify-center">
        <a
          href="https://github.com/jaoincode"
          target="_blank"
          className="text-white font-semibold"
          aria-label="jaoincode github link"
        >
          @jaoincode ❤️
        </a>
      </footer>
    </div>
  );
}

export default App;

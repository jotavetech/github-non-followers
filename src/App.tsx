import { useState } from "react";

import Footer from "./components/Footer/Footer";
import SearchField from "./components/SearchField";
import UserPreview from "./components/UserPreview";
import NonFollowerCard from "./components/NonFollowerCard";

import {
  getAllFollowers,
  getAllFollowing,
  getGithubProfile,
} from "./githubData";

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
          setNotFind("No unfollowers found! 😊");
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
    <div className="min-h-screen bg-zinc-100 flex justify-center items-center p-10">
      <div className="flex flex-col ">
        {user && <UserPreview user={user} />}
        {!user && !loading && (
          <h1 className="capitalize font-bold text-lg w-60 text-center mx-auto pb-2">
            write a username to track non-followers
          </h1>
        )}
        <div
          className={`flex gap-2 shadow-sm p-5 bg-slate-50 rounded-xl transition-all ${
            error && "tremor"
          } 
          `}
        >
          {loading ? (
            <p className="font-semibold">Loading...</p>
          ) : (
            <SearchField
              handleCompare={handleCompare}
              username={username}
              setUsername={setUsername}
            />
          )}
        </div>
        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}
        {notFind && <p className="font-semibold text-center pt-2">{notFind}</p>}

        <div className="flex flex-col gap-2 mt-5 mb-10">
          {nonFollowers &&
            nonFollowers.map((user) => (
              <NonFollowerCard user={user} key={user} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

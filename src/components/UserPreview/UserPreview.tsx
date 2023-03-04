function UserPreview({ user }: { user: UserProfileProps }) {
  return (
    <div className="mx-auto mt-10 mb-5 flex flex-col items-center">
      <a
        href={`https://github.com/${user.login}`}
        target="_blank"
        aria-label={`link to ${user.login} github profile`}
      >
        <img
          src={user.avatar_url}
          alt={`${user.login} profile picture`}
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
  );
}

export default UserPreview;

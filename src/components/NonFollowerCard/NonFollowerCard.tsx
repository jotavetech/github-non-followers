import { AiFillGithub } from "react-icons/ai";

function NonFollowerCard({ user }: { user: string }) {
  return (
    <a
      href={`https://github.com/${user}`}
      target="_blank"
      className="shadow-sm p-5 bg-slate-100 rounded-xl flex justify-between items-center animated-slide-in cursor-pointer hover:scale-105 transition-all hover:bg-gray-50"
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
  );
}

export default NonFollowerCard;

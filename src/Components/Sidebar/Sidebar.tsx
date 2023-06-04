import { Link } from "react-router-dom";
import { AiFillContacts, AiOutlineBarChart } from "react-icons/ai";

export default function Sidebar() {
  return (
    <div className="h-full p-2 bg-sky-900 w-max md:w-[200px]">
      <Link to={"/contact"}>
        <div className="p-2 flex items-center  rounded text-white cursor-pointer hover:bg-sky-500">
          <span>
            <AiFillContacts className="text-xl" />
          </span>
          <span className="hidden md:block ml-2">Contact</span>
        </div>
      </Link>
      <Link to={"/dashboard"}>
        <div className="p-2 rounded flex items-center text-white cursor-pointer hover:bg-sky-500">
          <span>
            <AiOutlineBarChart className="text-xl" />
          </span>
          <span className="hidden md:block ml-2">Charts and Map</span>
        </div>
      </Link>
    </div>
  );
}

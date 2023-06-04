import { GrAddCircle } from "react-icons/gr";
import NoContact from "./NoContact";
import { Link } from "react-router-dom";
import { useCustomSelector, useCustomDispatch } from "../../Store/Hooks";
import { deleteUser } from "../../Store/Reducer/userDataSlice";
import { useEffect, useState } from "react";

type user = {
  id: string;
  firstName: string;
  lastName: string;
  status: boolean;
};

function Contact() {
  let userData = useCustomSelector((state) => state);
  let dispatch = useCustomDispatch();

  const [users, setUsers] = useState<user[] | null>();

  useEffect(() => {
    setUsers(userData.users.userData);
  }, [userData]);

  return (
    <div className="w-full overflow-auto mb-20">
      <div className="flex justify-center">
        <Link to="create">
          <button className="bg-sky-200 text-sky-900 hover:bg-blue-100 p-2 flex items-center rounded-lg">
            <span className="pr-2">
              <GrAddCircle />
            </span>
            Create Contact
          </button>
        </Link>
      </div>
      {/* If contacts available display them or show no contact component */}
      {users && users?.length > 0 ? (
        <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2">
          {users.map((user) => (
            <div className=" w-full xs:w-[200px] justify-self-center rounded-md h-max bg-slate-300">
              <div className="h-[100px]   m-2  border-box rounded-md bg-slate-100"></div>

              <h1 className="pl-2">{user.firstName + " " + user.lastName}</h1>

              <p className="pl-2 text-sm">
                Contact Status: {user.status ? "Active" : "In-Active"}
              </p>

              <div className="w-full flex p-2 gap-2">
                <Link className="flex-1 flex justify-center" to={user.id}>
                  <button className=" w-full py-1 text-white rounded-md bg-blue-500">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    dispatch(deleteUser(user.id));
                  }}
                  className="flex-1 text-white rounded-md bg-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoContact />
      )}
    </div>
  );
}

export default Contact;

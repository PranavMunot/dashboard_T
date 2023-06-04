import { ChangeEvent, FormEvent, useState } from "react";
import { useCustomDispatch } from "../../Store/Hooks";
import { addUser, editUser } from "../../Store/Reducer/userDataSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface contactData {
  id: string;
  firstName: string;
  lastName: string;
  status: boolean;
}

function ContactForm({ user, isEdit }: any) {
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState<contactData>({
    id: user?.id || uuidv4(),
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    status: user ? user.status : true,
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changedElementName = event.target.name;

    if (event.target.name === "status") {
      setUserFormData((prevData) => {
        return {
          ...prevData,
          [changedElementName]: !prevData.status,
        };
      });
    } else {
      setUserFormData({
        ...userFormData,
        [changedElementName]: event.target.value,
      });
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userFormData.firstName !== "" && userFormData.lastName !== "") {
      if (isEdit) {
        dispatch(editUser(userFormData));
      } else {
        dispatch(addUser(userFormData));
      }
      navigate("/contact");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="rounded-md p-4 max-w-sm w-full flex flex-wrap bg-slate-200">
        <form onSubmit={submitHandler} className="w-full">
          <label className="ml-1 mr-3" htmlFor="f_name">
            First Name
          </label>
          <input
            type="text"
            id="f_name"
            name="firstName"
            value={userFormData.firstName}
            onChange={changeHandler}
            className="w-full mb-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            placeholder="First Name"
          />
          <label className="ml-1 mr-3" htmlFor="l_name">
            Last Name
          </label>
          <input
            type="text"
            id="l_name"
            name="lastName"
            value={userFormData.lastName}
            onChange={changeHandler}
            className="w-full mb-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            placeholder="First Name"
          />

          <fieldset>
            <legend>Status</legend>
            <input
              id="active"
              onChange={changeHandler}
              type="radio"
              name="status"
              checked={userFormData.status}
            />
            <label className="ml-1 mr-3" htmlFor="active">
              Active
            </label>
            <input
              id="inactive"
              onChange={changeHandler}
              type="radio"
              name="status"
              checked={!userFormData.status}
            />
            <label className="ml-1" htmlFor="inactive">
              Inactive
            </label>
          </fieldset>
          <div className="flex justify-center">
            <button className="bg-sky-700 mt-4 text-white hover:bg-sky-700 active:ring-2 ring-sky-700 ring-inset py-2 px-4 flex items-center rounded-lg">
              {isEdit ? "Edit" : "Save"} Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

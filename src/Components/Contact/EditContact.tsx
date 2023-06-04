import { useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import { useCustomSelector } from "../../Store/Hooks";

function EditContact() {
  const { id } = useParams();

  const selectedUser = useCustomSelector((state) =>
    state.users.userData.find((user) => user.id === id)
  );

  return (
    <div className="w-full bg-white-100">
      <h1 className="text-2xl text-center">Edit Contact</h1>
      <ContactForm user={selectedUser} isEdit={true} />
    </div>
  );
}

export default EditContact;

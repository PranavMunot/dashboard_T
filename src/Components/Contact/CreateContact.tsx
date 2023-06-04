import ContactForm from "./ContactForm";

function CreateContact() {
  return (
    <div className="w-full bg-white-100">
      <h1 className="text-2xl text-center">Create New Contact</h1>
      <ContactForm isEdit={false} />
    </div>
  );
}

export default CreateContact;

import { ContactForm } from "../components/contact/ContactForm";
import { ContactList } from "../components/contact/contactList";
import { Header } from "../components/header/Header";

export const ContactPage = () => {
  return (
    <>
      <Header />
      <ContactForm />
      <ContactList/>
    </>
  );
};

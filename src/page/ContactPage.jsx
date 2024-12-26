import { ContactForm } from "../components/contact/ContactForm";
import { ContactList } from "../components/contact/ContactList";
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

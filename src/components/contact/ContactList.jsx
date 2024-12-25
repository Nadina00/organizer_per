import { useDispatch, useSelector } from "react-redux";
import {
  selectContact,
  selectisLoaderContacts,
} from "../../redux/contact/contact-select";
import css from "./Contact.module.css";
import contactsOperations from "../../redux/contact/contact-operations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ContactList = () => {
  const isLoader = useSelector(selectisLoaderContacts);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(contactsOperations.contactsList());
  }, [dispatch]);

  const onClickDel = async(id) => {
    try {
      const resultAction = await dispatch(contactsOperations.contactsDel(id));
    dispatch(contactsOperations.contactsList());
    console.log("resultAction", resultAction)
      if (resultAction.type === contactsOperations.contactsDel.fulfilled.type) {
        toast.success("Contact was deleted successfully!");
    
      } else {
        throw resultAction.payload || "Unknown error";
      }
    } catch (error) {
      if (error === 409) {
        toast.error("Failed to delete contact");
      } else {
        toast.error("An unexpected error occurred. Please try again");
      }
    }
    
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

 
  const contacts = useSelector(selectContact || []);


  if (!contacts || !contacts.length && !isLoader) {
    return <p>No contacts available</p>;
  }
  const filteredContacts = contacts?.filter(
    (contact) => contact &&
      (contact.name.toLowerCase().includes(value.toLowerCase()) ||
      contact.tel.toString().includes(value) ||
      contact.email.toLowerCase().includes(value.toLowerCase()))
  );

  return (
    <div className={css.news_container}>
      <input
        type="text"
        placeholder="Search by name, phone or email"
        value={value}
        onChange={onChange}
        className={css.search_input}
      />
      <h2>Contact details:</h2>
      <ul className={css.news_list}>
        {!filteredContacts.length ? (
          <p>No contacts to display.</p>
        ) : (
          filteredContacts.map((item) => (
            <li key={item._id} className={css.news_item}>
              <h3>{item.name}</h3>
              <p>
                <strong> Telephone:</strong> {item.tel}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Comment:</strong> {item.commit}
              </p>
              <button
                className={css.delete_button}
                onClick={() => onClickDel(item._id)}
                aria-label="Удалить"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

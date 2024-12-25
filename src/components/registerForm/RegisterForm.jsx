import { useState } from "react";
import { HeaderLogin } from "../header_login/HeaderLogin";
import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import userOperations from "../../redux/user/user-operations";
import { toast } from "react-toastify";


export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const dispatch = useDispatch();



  const handleChangeValue = (e) => {
    const { value, name } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setType(type === "password" ? "text" : "password");
  };

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    try {
      const resultAction = await dispatch(userOperations.register({ email, password, name }));
     
      if (resultAction.type === userOperations.register.fulfilled.type) {
        toast.success("Registration in successfully!");

        setName("");

        setEmail("");

        setPassword("");
      } else {
        throw resultAction.payload || "Unknown error";
      }
    } catch (error) {
      
      if (error === 409) {
        toast.error("Registration failed: user already exists.");
      } else {
        toast.error("Registration failed");
      }

      console.error("Registration failed:", error.status);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <HeaderLogin className={styles.header} />
      <form onSubmit={handleSubmitForm}>
        <div className={styles.formGroup}>
          <label htmlFor="" className={styles.label}>
            <input
              type="name"
              placeholder="Name *"
              name="name"
              onChange={handleChangeValue}
              required
              value={name}
              className={styles.input}
            />
          </label>
          <label htmlFor="" className={styles.label}>
            <input
              type="email"
              placeholder="Email *"
              name="email"
              onChange={handleChangeValue}
              required
              value={email}
              className={styles.input}
            />
          </label>
          <label htmlFor="" className={styles.label}>
            <div className={styles.passwordContainer}>
              <input
                type={type}
                placeholder="Password *"
                name="password"
                onChange={handleChangeValue}
                required
                value={password}
                className={styles.inputPassword}
              />
              <button onClick={handleClick} className={styles.passwordToggle}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9C10.358 9 9 10.359 9 12C9 13.642 10.358 15 12 15C13.641 15 15 13.642 15 12C15 10.359 13.641 9 12 9Z"
                    fill="grey"
                  />
                  <path
                    d="M12 5C4.408 5 2.12632 11.617 2.10543 11.684L2 12L2.10444 12.316C2.12632 12.383 4.408 19 12 19C19.592 19 21.8737 12.383 21.8946 12.316L22 12L21.8956 11.684C21.8737 11.617 19.592 5 12 5ZM12 17C6.67774 17 4.61587 13.154 4.11657 12C4.61786 10.842 6.68072 7 12 7C17.3223 7 19.3841 10.846 19.8834 12C19.3821 13.158 17.3193 17 12 17Z"
                    fill="grey"
                  />
                </svg>
              </button>
            </div>
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={!(email && password)}
            className={styles.submitButton}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

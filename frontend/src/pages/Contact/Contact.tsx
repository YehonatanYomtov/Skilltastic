//* Styles
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div>
      <h1>Contact</h1>

      <form className={styles.container}>
        <div>
          <label htmlFor="">Enter Email for contact</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Enter your message</label>
          <textarea name="" id=""></textarea>
        </div>

        <button type="submit">Submit message</button>
      </form>
    </div>
  );
}

export default Contact;

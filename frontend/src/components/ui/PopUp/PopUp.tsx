//* styles
import styles from "./PopUp.module.css";

type PopUpProps = {
  children: string;
};

function PopUp({ children }: PopUpProps) {
  return (
    <div className={styles.popup_container}>
      <img src="/icons/Alert-icon.png" alt="Alert" />
      <span>{children}</span>
    </div>
  );
}

export default PopUp;

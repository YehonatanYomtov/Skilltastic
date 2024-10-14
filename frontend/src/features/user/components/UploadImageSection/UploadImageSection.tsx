//* React-hooks
import { useState } from "react";

//* Redux
import { useSelector } from "react-redux";

//* Slice-user
// import { setIsClicked, updateProfileImage } from "../userSlice";

//* Components-ui
import Button from "../../../../components/ui/Button/Button";

//* Types
import { RootState } from "../../../../data/store";

//* Styles
import styles from "./UploadImageSection.module.css";

function UploadImageSection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const status = useSelector((state: RootState) => state.auth.status);

  // const dispatch = useDispatch();

  function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }

  function handleImageUpload() {
    // dispatch(updateProfileImage(selectedImage));
    // dispatch(setIsClicked());
  }

  return (
    <div
      // style={isClicked ? { alignSelf: "center" } : {}}
      className={styles.file_input_container}
    >
      <label className={styles.file_input}>
        Choose a file
        <input
          disabled={status === "loading"}
          type="file"
          accept="image/*"
          onChange={handleImageSelected}
        />
      </label>

      {selectedImage && (
        <Button
          className={styles.upload_image_button}
          disabled={status === "loading"}
          onClick={handleImageUpload}
        >
          Upload
        </Button>
      )}
    </div>
  );
}

export default UploadImageSection;

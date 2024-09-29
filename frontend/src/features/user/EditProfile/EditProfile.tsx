//* React-hooks
// import { useState } from "react";

//* Redux
import { useSelector } from "react-redux";

//* Slice-user
// import { updateProfileImage } from "../userSlice";

//* Styles
import styles from "./EditProfile.module.css";

//* Types
import { RootState } from "../../../data/store";

function EditProfile() {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const photoURL = useSelector((state: RootState) => state.user.photoURL);

  // const uploadInputRef = useRef(null);
  // const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // formData.append("fileName", uploadInputRef.);
    // dispatch(updateProfileImage(selectedImage));
  }

  function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    // const formData = new FormData();

    if (e.target.files && e.target.files[0]) {
      // setSelectedImage(e.target.files[0]);
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>

      {/* <UploadImageSection /> */}

      <img
        className={`${styles.image} ${styles.spin}`}
        src={photoURL}
        alt="Pic"
      />

      <form onSubmit={handleSubmit}>
        {/* <input accept="video/*" type="file" onChange={handleImageSelected} /> */}
        <input accept="image/*" type="file" onChange={handleImageSelected} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default EditProfile;

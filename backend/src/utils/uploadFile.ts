import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

// Function to upload a file and get the download URL
export async function uploadFile(
  file: Express.Multer.File,
  path: string
): Promise<string> {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file.buffer);
  return getDownloadURL(fileRef);
}

import { Request } from "express";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { readFile, unlink } from "fs/promises";
import { storage } from "../firebase/firebaseConfig";

export async function uploadVideo(file?: Request["file"]) {
  if (!file) throw new Error("No file received");

  const fileBuffer = await readFile(file.path);

  const fileRef = ref(storage, `videos/${file.originalname}`);

  const snapshot = await uploadBytes(fileRef, fileBuffer, {
    contentType: file.mimetype,
  });

  await unlink(file.path);

  console.log(`File uploaded successfully: ${snapshot.metadata.fullPath}`);

  return getDownloadURL(fileRef);
}

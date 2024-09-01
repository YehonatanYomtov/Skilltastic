import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadVideo = async (videoFile: File): Promise<string> => {
  try {
    const videoRef = ref(storage, `videos/${videoFile.name}`);
    await uploadBytes(videoRef, videoFile);
    const videoUrl = await getDownloadURL(videoRef);
    return videoUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
};

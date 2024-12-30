import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (file) => {
  try {
    // Reference to the storage path
    const imageRef = ref(storage, `course-images/${file.name}`);
    
    // Upload the file
    const snapshot = await uploadBytes(imageRef, file);
    
    // Get the file's download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully. URL:", url);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

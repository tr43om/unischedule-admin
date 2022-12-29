import {
  StorageError,
  StorageReference,
  UploadTaskSnapshot,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export const useFirestoreStorage = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<StorageError>();

  const storeFile = async (file: File, ref: StorageReference) => {
    const uploadTask = uploadBytesResumable(ref, file);
    setUploading(true);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {
          setUploading(true);
        },
        (error) => {
          reject(error);
          setError(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
          setUploading(false);
        }
      );
    });
  };

  return { storeFile, uploading, error } as const;
};

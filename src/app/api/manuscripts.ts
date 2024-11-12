"use server"

import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "@src/config/firebase";
import { deleteDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { getCurrentUser } from "@src/app/api/auth";
import { ManuscriptUploadError, UserNotAuthenticatedError } from "@src/app/api/errors";

export type ManuscriptRecord = {
  id: string
  title: string
  docUrl: string
  status: "published" | "editing" | "rejected"
}

export async function uploadManuscriptAction(file: File, fileTitle: string): Promise<string> {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) {
      throw new UserNotAuthenticatedError();
    }

    const isValid = validateManuscriptFile(file);
    if (!isValid) {
      throw new ManuscriptUploadError("Only Word documents are allowed.");
    }

    // Create a storage reference
    const storageRef = ref(storage, `manuscripts/${fileTitle}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Store the file reference in Firestore
    await setDoc(doc(db, "manuscripts", fileTitle), {
      title: fileTitle,
      url: downloadURL,
      userId: user.id,
      createdAt: new Date()
    });

    return downloadURL
  } catch (error) {
    console.error('Error uploading file and storing reference:', error);
    return Promise.reject(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore data is untyped, @todo: add expected types
export async function getUserManuscriptsAction(): Promise<ManuscriptRecord[]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new UserNotAuthenticatedError();
    }
    const manuscriptsRef = collection(db, "manuscripts");
    const q = query(manuscriptsRef, where("userId", "==", user.id));
    const querySnapshot = await getDocs(q);

    const manuscripts: ManuscriptRecord[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      docUrl: doc.data().url,
      status: "editing",
    }));

    return manuscripts;
  } catch (error) {
    console.error('Error fetching user manuscripts:', error);
    return Promise.reject(error);
  }
}

export async function deleteFile(fileTitle: string): Promise<void> {
  try {
    // Create a reference to the file to delete
    const storageRef = ref(storage, `manuscripts/${fileTitle}`);

    // Delete the file from storage
    await deleteObject(storageRef);

    // Delete the file reference from Firestore
    await deleteDoc(doc(db, "manuscripts", fileTitle));

    console.log(`File ${fileTitle} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file and its reference:', error);
    return Promise.reject(error);
  }
}


function validateManuscriptFile(file: File): boolean {
  return file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
}


// Too complicated to implement google drive manuscritpts files storage for now given the time constraints. Will revisit later.
// async function readableFromStream(stream: ReadableStream<Uint8Array>): Promise<Readable> {
//   const reader = stream.getReader();
//   const readable = new Readable({
//     async read() {
//       const { done, value } = await reader.read();
//       if (done) {
//         this.push(null);
//       } else {
//         this.push(Buffer.from(value));
//       }
//     }
//   });
//   return readable;
// }

// export async function uploadFileToDrive(file: File, fileTitle: string): Promise<string> {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: './client_secret_685764377913-rntuqp135g3bqg807huo2pdm9jminl9i.apps.googleusercontent.com.json',
//       scopes: ['https://www.googleapis.com/auth/drive.file'],
//     });

//     const driveService = google.drive({ version: 'v3', auth });

//     const fileMetadata = {
//       name: fileTitle,
//     };

//     const media = {
//       mimeType: file.type,
//       body: readableFromStream(file.stream()),
//     };

//     const response = await driveService.files.create({
//       requestBody: fileMetadata,
//       media: media,
//       fields: 'id',
//     });

//     const fileId = response.data.id;

//     const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

//     await setDoc(doc(db, "manuscripts", fileTitle), {
//       title: fileTitle,
//       url: fileUrl,
//       createdAt: new Date()
//     });

//     return fileUrl;
//   } catch (error) {
//     console.error('Error uploading file to Google Drive and storing reference:', error);
//     return Promise.reject(error);
//   }
// }
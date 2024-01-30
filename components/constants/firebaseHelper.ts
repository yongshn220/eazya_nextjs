import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "@node_modules/@firebase/storage";
import {storage} from "@firebase";
import {getFileLocation} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";

export function uploadFile(postType: PostType, file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, getFileLocation(postType, file.name))
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
  })
}


export async function deleteFile(url) {
  try {
    if (!url) return
    const desertRef = ref(storage, url);
    return await deleteObject(desertRef)
  }
  catch (error) {
    console.log(error)
  }
}

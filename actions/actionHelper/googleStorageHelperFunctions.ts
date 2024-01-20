

import {v4 as uuidv4} from 'uuid';
import {PostType} from "@components/constants/enums";
import {Session} from "@node_modules/next-auth";
import {Storage} from "@node_modules/@google-cloud/storage";

const BUCKET_NAME = 'eazya_bucket_sbu'

export function getCredentials() {
  return JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_STORAGE_CREDENTIALS_BASE64, 'base64').toString('ascii'))
}

export async function fileToBuffer(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export function base64ToBuffer(base64: string) {
  if (base64.startsWith('data:image/')) {
    const [header, encoded] = base64.split(',', 2);
    return Buffer.from(encoded, 'base64');
  }
  return null
}

export async function addFileToStorage(postType: PostType, session: Session, file: File) {
  try {
    const buffer = await fileToBuffer(file)
    const credentials = getCredentials()
    const storage = new Storage({ credentials })
    const imageName = `${postType}/${session.user.email}/${Date.now()}-${uuidv4()}`
    const storageFile = storage.bucket(BUCKET_NAME).file(imageName)
    await storageFile.save(buffer)

    return `https://storage.googleapis.com/${BUCKET_NAME}/${imageName}`;
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export async function addBase64ToStorage(postType: PostType, session: Session, base64: string) {
  const buffer = base64ToBuffer(base64)
  if (!buffer) return null

  const credentials = getCredentials()
  const storage = new Storage({ credentials })
  const imageName = `${postType}/${session.user.email}/${Date.now()}-${uuidv4()}`
  const storageFile = storage.bucket(BUCKET_NAME).file(imageName)
  await storageFile.save(buffer)

  return `https://storage.googleapis.com/${BUCKET_NAME}/${imageName}`;
}

export function getStorageFileFromStringUrl(stringUrl: string) {
  const credentials = getCredentials()
  const storage = new Storage({ credentials })
  const url = new URL(stringUrl)
  const urlPathParts = url.pathname.split('/').filter(part => part);
  const bucketName = urlPathParts[0];
  const filePath = urlPathParts.slice(1).join('/');
  return storage.bucket(bucketName).file(filePath);
}

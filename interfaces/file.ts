import { StorageReference } from "firebase/storage"

export interface KFile {
    folder: boolean
    path: string
    name: string
    parent?: StorageReference
    url?: string
}
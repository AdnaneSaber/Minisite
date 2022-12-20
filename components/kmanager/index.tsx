import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { getStorage, ref, listAll, StorageReference, getDownloadURL } from "firebase/storage";
import { storage } from '@firebase';
import { KFile } from '../../interfaces/file';
import { CMS_NAME } from '../../lib/constants';
import folderLogo from '@assets/KManager/folder.svg'
import { TextContext } from '../admin/layout';
type propType = {
    setImage: React.Dispatch<string>
    close: () => void
}



const KManager = ({ setImage, close }: propType) => {
    const [dragOver, setDragOver] = useState(false)
    const [upload, setUpload] = useState(true)
    const [selectedImage, setSelectedImage] = useState("")
    const [path, setPath] = useState("minisite")
    const [files, setFiles] = useState<KFile[]>([])
    const createDirectory = () => {

    }
    const getLinkOfImage = async (ref: StorageReference) => {
        const res = await getDownloadURL(ref)
        return res
    }
    const listImages = async (path: string) => {
        const listRef = ref(storage, path);
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    setFiles(e => [...e, { folder: true, name: folderRef.name, path: folderRef.fullPath, parent: folderRef.parent }])
                });
                res.items.forEach(async (itemRef) => {
                    const url = await getLinkOfImage(itemRef)
                    setFiles(e => [...e, { folder: false, name: itemRef.name, path: itemRef.fullPath, parent: itemRef.parent, url }])
                });
            }).catch((error) => {
                alert("Problem accured" + new Error().stack)
            });
    }
    const uploadImage = () => {

    }
    const deleteImage = () => {

    }
    const minifyImage = () => {
        // Todo need to minify image using python on vercel
    }
    useEffect(() => {
        (async () => {
            setFiles([])
            await listImages(path)
        })()
    }, [path])
    useEffect(() => {
        setImage(selectedImage)
    }, [selectedImage])
    useEffect(() => {
        return () => {
            setFiles([])
        }
    }, [])


    return (
        <div className='fixed h-full min-h-screen inset-0 z-50 flex items-center justify-center p-12'>
            <div className='bg-gray-900 opacity-80 absolute inset-0 z-10'></div>
            <div className='max-w-5xl w-full bg-white shadow-sm rounded relative z-20 p-6'>
                <div>
                    <button className='absolute top-4 right-4 text-xl font-bold block text-gray-700 mb-5' onClick={() => close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="24" height="24"><path d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z" /></svg>
                    </button>
                </div>
                <h1 className='text-xl font-bold block text-gray-700 mb-5'>{CMS_NAME} File Manager</h1>
                <div className=''>
                    <ul className="grid gap-6 w-full md:grid-cols-2 py-3">
                        <li>
                            <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" onChange={() => setUpload(true)} defaultChecked required />
                            <label htmlFor="hosting-small" className="inline-flex justify-center items-center p-3 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-indigo-500 peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Upload</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer" onChange={() => setUpload(false)} />
                            <label htmlFor="hosting-big" className="inline-flex justify-center items-center p-3 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-indigo-500 peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Pick</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                {path !== "minisite" ? <button className='border rounded py-3 px-3 border-indigo-500 text-indigo-500' onClick={() => setPath("minisite")}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" fill='#6366f1' viewBox="0 0 24 24" width="16" height="16"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z" /></svg>
                </button> : <></>}
                <hr className="border-neutral-200 mt-6 mb-8" />
                {upload ?
                    <div>
                        <div className={classNames("mt-1 flex justify-center rounded-md border-2 border-gray-300 px-6 pt-5 pb-6 cursor-pointer", dragOver ? "border-solid" : "border-dashed")} onDragEnter={() => setDragOver(true)} onDragLeave={() => setDragOver(false)} >
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div> : <div className={classNames('grid gap-6 w-full p-3 max-h-96 overflow-auto', files.length > 0 ? "md:grid-cols-4" : "")}>
                        {files.length > 0 ?
                            files.map(({ folder, url, name, path }, index) => (
                                <ImageCard
                                    setPath={setPath}
                                    path={path}
                                    name={name}
                                    src={url}
                                    key={index}
                                    isFolder={folder}
                                />
                            ))
                            : (
                                <div className='w-full text-center'>
                                    <span className='mt-2 text-md font-bold text-gray-500'>
                                        Nothing to show here
                                    </span>
                                </div>
                            )}
                    </div>
                }
            </div>
        </div>
    )
}

export default KManager

type imagePropType = {
    setPath: React.Dispatch<string>
    isFolder: boolean
    name: string
    path: string
    src: string
}
const ImageCard = ({ src, isFolder, name, path, setPath }: imagePropType) => {

    const { update } = useContext(TextContext);
    return (
        <div className='rounded shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all' onClick={() => update(e => { return { active: false, path: src } })}>
            {isFolder ?
                <div className="p-8" onClick={() => setPath(path)}>
                    <img src={folderLogo.src} alt="" />
                    <p className='text-sm text-gray-500 w-full text-center'>{name}</p>
                </div>
                :
                <img src={src} className='w-full h-full object-contain' alt={CMS_NAME} />
            }
        </div>
    )
}
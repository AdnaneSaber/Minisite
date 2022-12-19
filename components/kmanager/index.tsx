import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

type propType = {
    active: boolean
    setImage: React.Dispatch<string>
    close: () => void
}



const KManager = ({ active, setImage, close }: propType) => {

    const [dragOver, setDragOver] = useState(false)
    const [upload, setUpload] = useState(true)
    const [selectedImage, setSelectedImage] = useState("")
    useEffect(() => {
        console.log('Component loaded')
        return () => {
            console.log('Component unmounted')
        }
    }, [])
    useEffect(() => {
        setImage(selectedImage)
    }, [selectedImage])

    return active && (
        <div className='fixed h-full min-h-screen inset-0 z-50 flex items-center justify-center p-12'>
            <div className='bg-gray-900 opacity-80 absolute inset-0 z-10'></div>
            <div className='max-w-5xl w-full bg-white shadow-sm rounded relative z-20 p-6'>
                <h1 className='text-xl font-bold block text-gray-700 mb-5' onClick={() => close()}>Kalopsium File Manager</h1>
                <div className=''>
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
                </div>
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
                    </div> : <div className='grid gap-6 w-full md:grid-cols-4 p-3 max-h-96 overflow-auto'>
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594"} />
                        <ImageCard setImg={setSelectedImage} src={"https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Fcover.jpeg?alt=media&token=88c18250-d4a1-4a26-88d4-5e0b1c866053"} />
                    </div>
                }
            </div>
        </div>
    )
}

export default KManager

type imagePropType = {
    setImg: React.Dispatch<string>
    src: string
}
const ImageCard = ({ setImg, src }: imagePropType) => {
    return (
        <div className='rounded shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all' onClick={() => setImg(src)}>
            <img src={src} className='hover:scale-110 transition-transform' alt="" />
        </div>
    )
}
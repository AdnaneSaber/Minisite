import { storage } from "@firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const getLogos = () => {
    return {
        light: 'https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-light.svg?alt=media&token=d3174fd2-3572-4273-bebf-220c0415eeb7',
        dark: 'https://firebasestorage.googleapis.com/v0/b/kalopsium.appspot.com/o/minisite%2Flogo-dark.svg?alt=media&token=f90903d2-d318-4f29-bc6c-1752a649a594'
    }
}
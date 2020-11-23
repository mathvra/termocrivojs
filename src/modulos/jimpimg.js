import Jimp from 'jimp'
import cv from './opencv.js'
export default function jimpCanvas(image, rectInfo) {

    let jimpSrc = new Jimp({
    width: image.cols,
    height: image.rows,
    data: Buffer.from(image.data)
    })

    jimpSrc.crop(rectInfo.left, rectInfo.top, rectInfo.width, rectInfo.height)

    let OpenCVsrc = cv.matFromImageData(jimpSrc.bitmap)

    return OpenCVsrc
}
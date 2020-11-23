import Jimp from 'jimp'
const skmeans = require("skmeans")
import cv from './opencv.js'
const srcWhite = document.getElementById('jimpWhite')

export default function kmeans(image){
    let jimpSrc = new Jimp({
        width: image.cols,
        height: image.rows,
        data: Buffer.from(image.data)
        })

    let valoresRGB = new Array()

    for (let i = 0; i < jimpSrc.bitmap.width; i++){
        for (let j = 0; j < jimpSrc.bitmap.height; j++){
            let hexFor = jimpSrc.getPixelColor(i, j)
            valoresRGB.push(Jimp.intToRGBA(hexFor))
        }
    }

    let vetorRGB = new Array()
    for (let i = 0 ; i < valoresRGB.length ; i++) {
        vetorRGB[i] = [ valoresRGB[i]['r'] , valoresRGB[i]['g'], valoresRGB[i]['b']]
    }

    let res = skmeans(vetorRGB, 8, [
        // red
        [255, 0, 0],

        //orange
        [255, 128, 0],

        // yellow
        [255, 255, 0],

        // green
        [0, 255, 0], 

        // cyan
        [0, 255, 255], 

        //blue
        [0, 0, 255],

        //violet
        [128, 0, 128],

        //magenta
        //[255, 0, 255],

        //white
        [255, 255, 255],
    ], 16, (x1,x2)=>eudistMult(x1,x2))

    console.log(res)
    let imgRed = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgOrange = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgYellow = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgGreen = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgCyan = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgBlue = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgViolet = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    // let imgMagenta = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)
    let imgWhite = new Jimp(jimpSrc.bitmap.width, jimpSrc.bitmap.height)

    let k = 0
    let cor
    let fundo = Jimp.rgbaToInt(0, 0, 0, 255)
    for (let i = 0; i < jimpSrc.bitmap.width; i++){
        for (let j = 0; j < jimpSrc.bitmap.height; j++){
            if(res.idxs[k] == 0){
                cor = jimpSrc.getPixelColor(i, j)
                imgRed.setPixelColor(cor, i, j)
            }else{
                imgRed.setPixelColor(fundo, i, j)
            }
            
            if(res.idxs[k] == 1){
                cor = jimpSrc.getPixelColor(i, j)
                imgOrange.setPixelColor(cor, i, j)
            }else{
                imgOrange.setPixelColor(fundo, i, j)
            }

            if(res.idxs[k] == 2){
                cor = jimpSrc.getPixelColor(i, j)
                imgYellow.setPixelColor(cor, i, j)
            }else{
                imgYellow.setPixelColor(fundo, i, j)
            }

            if(res.idxs[k] == 3){
                cor = jimpSrc.getPixelColor(i, j)
                imgGreen.setPixelColor(cor, i, j)
            }else{
                imgGreen.setPixelColor(fundo, i, j)
            }

            if(res.idxs[k] == 4){
                cor = jimpSrc.getPixelColor(i, j)
                imgCyan.setPixelColor(cor, i, j)
            }else{
                imgCyan.setPixelColor(fundo, i, j)
            }

            if(res.idxs[k] == 5){
                cor = jimpSrc.getPixelColor(i, j)
                imgBlue.setPixelColor(cor, i, j)
            }
            else{
                imgBlue.setPixelColor(fundo, i, j)
            }

            if(res.idxs[k] == 6){
                cor = jimpSrc.getPixelColor(i, j)
                imgViolet.setPixelColor(cor, i, j)
            }
            else{
                imgViolet.setPixelColor(fundo, i, j)
            }

            // if(res.idxs[k] == 7){
            //     cor = jimpSrc.getPixelColor(i, j)
            //     imgMagenta.setPixelColor(cor, i, j)
            // }
            // else{
            //     imgMagenta.setPixelColor(fundo, i, j)
            // }

            if(res.idxs[k] == 7){
                cor = jimpSrc.getPixelColor(i, j)
                imgWhite.setPixelColor(cor, i, j)
            }
            else{
                imgWhite.setPixelColor(fundo, i, j)
            }
            k++
        }
    }

    let openCVRed = cv.matFromImageData(imgRed.bitmap)
    let openCVOrange = cv.matFromImageData(imgOrange.bitmap)
    let openCVYellow = cv.matFromImageData(imgYellow.bitmap)
    let openCVGreen = cv.matFromImageData(imgGreen.bitmap)
    let openCVCyan = cv.matFromImageData(imgCyan.bitmap)
    let openCVBlue = cv.matFromImageData(imgBlue.bitmap)
    let openCVViolet = cv.matFromImageData(imgViolet.bitmap)
    //let openCVMagenta = cv.matFromImageData(imgMagenta.bitmap)
    let openCVWhite = cv.matFromImageData(imgWhite.bitmap)
    
    console.log(openCVRed)
    return [
        openCVRed,
        openCVOrange,
        openCVYellow,
        openCVGreen,
        openCVCyan,
        openCVBlue,
        openCVViolet,
        //openCVMagenta,
        openCVWhite
    ]
}
function eudistMult(v1,v2) {
    var len = v1.length;
    var sum = 0;

    for(let i=0;i<len;i++) {
        var d = (v1[i]||0) - (v2[i]||0);
        sum += d*d;
    }
    // Square root not really needed
    return Math.sqrt(sum);
}
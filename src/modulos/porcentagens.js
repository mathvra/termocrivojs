import Jimp from 'jimp'
import cv from './opencv.js'

export default function calcPorcentagens(images, src){
    let porcentagens = []
    let soma = 0
    let fundo = Jimp.rgbaToInt(0, 0, 0, 255)
    for(let i = 0; i < images.length; i++){
        let preto = 0
        let porcento = 0
        let jimpSrc = new Jimp({
            width: images[i].cols,
            height: images[i].rows,
            data: Buffer.from(images[i].data)
            })

        let total = src.cols * src.rows
        let totalCorte = jimpSrc.bitmap.width * jimpSrc.bitmap.height

        let dif = total - totalCorte

        for (let j = 0; j < jimpSrc.bitmap.width; j++){
            for (let k = 0; k < jimpSrc.bitmap.height; k++){
                if (jimpSrc.getPixelColor(j, k) == fundo){
                    preto++
                }
            }   
        }
        porcento = ((total - (preto+dif)) / total) * 100
        soma = soma+porcento
        porcentagens.push(porcento)   
    }
    
    porcentagens.push(100 - soma)
    return porcentagens
}
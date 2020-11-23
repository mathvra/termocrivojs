import Jimp from 'jimp'
import cv from './opencv.js'

export default function calcPorcentagens(images){
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

        let total = jimpSrc.bitmap.width * jimpSrc.bitmap.height

        for (let j = 0; j < jimpSrc.bitmap.width; j++){
            for (let k = 0; k < jimpSrc.bitmap.height; k++){
                if (jimpSrc.getPixelColor(j, k) == fundo){
                    preto++
                    porcento = ((total - preto) / total) * 100
                }
            }   
        }
        soma = soma+porcento
        porcentagens.push(porcento)   
    }
    console.log(soma);
    let barra = document.getElementById('barra')
    barra.textContent = 'Pronto!'
    barra.style.color = 'black'
    barra.style.background = 'lime'
    setInterval(() => {
        barra.style.display = 'none'
    }, 5000)
    return porcentagens
}
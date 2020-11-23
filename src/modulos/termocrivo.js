
import refinar from './refinar.js'
import cortar from './crop.js'
import grabCut from './grabcut.js'
import cv from './opencv'
import preenchePorcentagens from './preencherPorcentagens.js'
import jimpCanvas from './jimpimg.js'
import kmeans from './kmeans.js'
import Jimp from 'jimp'
import calcPorcentagens from './porcentagens.js'

const ident = document.getElementById('ident')
const identText = document.getElementById('identText')
const prof = document.getElementById('prof')
const profText = document.getElementById('profText')
const data = document.getElementById('data')
const dataText = document.getElementById('dataText')
const imgElement = document.getElementById('imageSrc');
const barra = document.getElementById('barra')
const infoCoords = document.getElementById('infoCoords')

const canvasCut = document.getElementById("canvasCut")
const canvasInput = document.getElementById("canvasInput")
const canvasAdjust = document.getElementById("canvasAdjust")
const container = document.getElementById("container")
const containerCut = document.getElementById("containerCut")
const containerCrop = document.getElementById("containerCrop")
const containerGrabcut = document.getElementById("containerGrabcut")
const print = document.getElementById("print")

const fg = document.getElementById("fg")
const bg = document.getElementById("bg")
const limpar = document.getElementById("limpar")

const validate = document.getElementsByClassName("validate")
const crop = document.getElementById("crop")

let colorMarker = "green"
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0])
    barra.style.display = 'block'
}, false);

imgElement.onload = function () {
    containerGrabcut.style.display = "block"
    containerCrop.style.display = "block"
    identText.innerHTML = '<b>Paciente: </b>'
    identText.innerHTML += ident.value
    let dataAjustada = data.value.split('-')
    let dia = dataAjustada[2]
    let mes = dataAjustada[1]
    let ano = dataAjustada[0]
    dataText.innerHTML = '<b>Data: </b>'
    dataText.innerHTML += `${dia}/${mes}/${ano}`
    profText.innerHTML = '<b>Profissional: </b>'
    profText.innerHTML += prof.value
    let src = cv.imread('imageSrc')

    cv.imshow("canvasCut", src);
    cv.imshow("canvasInput", src);
    fg.disabled = false
    bg.disabled = false
    crop.disabled = false
    validate[0].disabled = false
    validate[1].disabled = false
    limpar.disabled = false
    adjustContainerAndLayer()

    refinar(canvasAdjust, fg, colorMarker)

    let options = {
        left: 1,
        top: 150,
        width: 479,
        height: 350
    }

    cortar(canvasCut, options)
}

crop.onclick = async () => {
    let cropper = cortar(canvasCut)
    let src = cv.imread('canvasInput')
    let srcCut = jimpCanvas(src, cropper[1])
    let res = kmeans(srcCut)
    cv.imshow("canvasResult", srcCut)
    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    cv.imshow('canvasOutput2', res[7]);

    preenchePorcentagens(calcPorcentagens(res, src))

    cortar(canvasCut, cropper[1])
    containerGrabcut.style.display = ""
    print.style.display = "block"

}

validate[0].onclick = () => {
    let cropper = cortar(canvasCut)
    containerGrabcut.style.display = "block"
    let newmask = cv.imread("canvasAdjust", 0)
    let src = cv.imread("canvasInput")
    let grab = grabCut(src, newmask, cropper[1])
    cv.imshow("canvasResult", grab)
    let srcGrab = cv.imread("canvasResult")
    let res = kmeans(srcGrab)

    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    cv.imshow('canvasOutput2', res[7]);

    preenchePorcentagens(calcPorcentagens(res, src))

    cortar(canvasCut, cropper[1])

    print.style.display = "block"
}

validate[1].onclick = () => {
    let cropper = cortar(canvasCut)

    let newmask = cv.imread("canvasAdjust", 0)
    let src = cv.imread("canvasInput")
    let grab = grabCut(src, newmask, cropper[1])
    cv.imshow("canvasResult", grab)
    let srcGrab = cv.imread("canvasResult")
    let res = kmeans(srcGrab)

    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    cv.imshow('canvasOutput2', res[7]);

    preenchePorcentagens(calcPorcentagens(res, src))

    cortar(canvasCut, cropper[1])

    print.style.display = "block"
}

limpar.onclick = () => {
    let srcAdjust = cv.imread('canvasAdjust')
    let jimpSrcAdjust = new Jimp({
        width: srcAdjust.cols,
        height: srcAdjust.rows,
        data: Buffer.from(srcAdjust.data)
        })

    for (let i = 0; i < jimpSrcAdjust.bitmap.width; i++){
        for (let j = 0; j < jimpSrcAdjust.bitmap.height; j++){
            jimpSrcAdjust.setPixelColor(0, i, j)
        }
    }

    let CVCanvasAdjust = cv.matFromImageData(jimpSrcAdjust.bitmap)
    cv.imshow("canvasAdjust", CVCanvasAdjust)
}


ident.addEventListener('change', (e)=>{
    e.preventDefault()
    identText.innerHTML = '<b>Paciente: </b>'
    identText.innerHTML += ident.value
}, false)

prof.addEventListener('change', (e)=>{
    e.preventDefault()
    profText.innerHTML = '<b>Paciente: </b>'
    profText.innerHTML += prof.value
}, false)

data.addEventListener('change', (e)=>{
    e.preventDefault()
    let dataAjustada = data.value.split('-')
    let dia = dataAjustada[2]
    let mes = dataAjustada[1]
    let ano = dataAjustada[0]
    dataText.innerHTML = '<b>Data: </b>'
    dataText.innerHTML += `${dia}/${mes}/${ano}`
}, false)


function adjustContainerAndLayer() {
    

    const box = canvasInput.getBoundingClientRect();
    containerCut.style.width = box.width + "px";
    containerCut.style.height = box.height + "px";
    canvasAdjust.width = box.width;
    canvasAdjust.height = box.height;
    container.style.width = box.width + "px";
    container.style.height = box.height + "px";

    let barra = document.getElementById('barra')
    barra.textContent = 'Pronto!'
    barra.style.color = 'black'
    barra.style.background = 'lime'
    setInterval(() => {
        barra.style.display = 'none'
    }, 5000)

}
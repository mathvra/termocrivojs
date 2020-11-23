
import refinar from './refinar.js'
import cortar from './crop.js'
import grabCut from './grabcut.js'
import cv from './opencv'
import preenchePorcentagens from './preencherPorcentagens.js'
import jimpCanvas from './jimpimg.js'
import kmeans from './kmeans.js'
import calcPorcentagens from './porcentagens.js'

let ident = document.getElementById('ident')
let identText = document.getElementById('identText')
let data = document.getElementById('data')
let dataText = document.getElementById('dataText')
let imgElement = document.getElementById('imageSrc');
let barra = document.getElementById('barra')


const canvasCut = document.getElementById("canvasCut")
const canvasInput = document.getElementById("canvasInput")
const canvasAdjust = document.getElementById("canvasAdjust")
const container = document.getElementById("container")
const containerCut = document.getElementById("containerCut")
// const containerCrop = document.getElementById("containerCrop")
const containerGrabcut = document.getElementById("containerGrabcut")
const print = document.getElementById("print")

const fg = document.getElementById("fg")
const bg = document.getElementById("bg")
const validate = document.getElementsByClassName("validate")
const crop = document.getElementById("crop")

let colorMarker = "green"
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0])
    barra.style.display = 'block'
    // containerGrabcut.style.display = "none"
}, false);

print.style.display = "none"

imgElement.onload = function () {

    identText.innerHTML = 'Id: '
    identText.innerHTML += ident.value
    dataText.innerHTML = 'Data '
    dataText.innerHTML += data.value
    let src = cv.imread('imageSrc')

    let res = kmeans(src)

    cv.imshow("canvasResult", src)
    cv.imshow("canvasCut", src);
    cv.imshow("canvasInput", src);
    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    //cv.imshow('canvasOutput2', res[2]);
    //cv.imshow('canvasOutput3', res[3]);
    //cv.imshow('canvasOutput4', res[4]);
    //cv.imshow('canvasOutput5', res[5]);
    //cv.imshow('canvasOutput6', res[6]);
    //cv.imshow('canvasOutput7', res[7]);
    cv.imshow('canvasOutput8', res[8]);

    fg.disabled = false
    bg.disabled = false
    crop.disabled = false
    validate[0].disabled = false
    validate[1].disabled = false
    adjustContainerAndLayer()

    refinar(canvasAdjust, fg, colorMarker)

    let options = {
        left: 1,
        top: 150,
        width: 479,
        height: 350
    }
    cortar(canvasCut, options)

    preenchePorcentagens(calcPorcentagens(res))

    print.style.display = ""
};

crop.onclick = () => {
    let cropper = cortar(canvasCut)
    let src = cv.imread('canvasInput')
    let srcCut = jimpCanvas(src, cropper[1])
    let res = kmeans(srcCut)
    cv.imshow("canvasResult", srcCut)
    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    //cv.imshow('canvasOutput2', res[2]);
    //cv.imshow('canvasOutput3', res[3]);
    //cv.imshow('canvasOutput4', res[4]);
    //cv.imshow('canvasOutput5', res[5]);
    //cv.imshow('canvasOutput6', res[6]);
    //cv.imshow('canvasOutput7', res[7]);
    cv.imshow('canvasOutput8', res[8]);

    preenchePorcentagens(calcPorcentagens(res))

    cortar(canvasCut, cropper[1])
    containerGrabcut.style.display = "none"
}

validate[0].onclick = () => {
    containerGrabcut.style.display = ""
    let cropper = cortar(canvasCut)

    let newmask = cv.imread("canvasAdjust", 0)
    let src = cv.imread("canvasInput")
    let grab = grabCut(src, newmask, cropper[1])
    cv.imshow("canvasResult", grab)
    let srcGrab = cv.imread("canvasResult")
    let res = kmeans(srcGrab)

    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    //cv.imshow('canvasOutput2', res[2]);
    //cv.imshow('canvasOutput3', res[3]);
    //cv.imshow('canvasOutput4', res[4]);
    //cv.imshow('canvasOutput5', res[5]);
    //cv.imshow('canvasOutput6', res[6]);
    //cv.imshow('canvasOutput7', res[7]);
    cv.imshow('canvasOutput8', res[8]);

    preenchePorcentagens(calcPorcentagens(res))

    cortar(canvasCut, cropper[1])

    print.style.display = ""
}

validate[1].onclick = () => {
    containerGrabcut.style.display = ""
    let cropper = cortar(canvasCut)

    let newmask = cv.imread("canvasAdjust", 0)
    let src = cv.imread("canvasInput")
    let grab = grabCut(src, newmask, cropper[1])
    cv.imshow("canvasResult", grab)
    let srcGrab = cv.imread("canvasResult")
    let res = kmeans(srcGrab)

    cv.imshow('canvasOutput0', res[0]);
    cv.imshow('canvasOutput1', res[1]);
    //cv.imshow('canvasOutput2', res[2]);
    //cv.imshow('canvasOutput3', res[3]);
    //cv.imshow('canvasOutput4', res[4]);
    //cv.imshow('canvasOutput5', res[5]);
    //cv.imshow('canvasOutput6', res[6]);
    //cv.imshow('canvasOutput7', res[7]);
    cv.imshow('canvasOutput8', res[8]);

    preenchePorcentagens(calcPorcentagens(res))

    cortar(canvasCut, cropper[1])

    print.style.display = ""
}

function adjustContainerAndLayer() {
    const box = canvasInput.getBoundingClientRect();
    canvasAdjust.width = box.width;
    canvasAdjust.height = box.height;
    container.style.width = box.width + "px";
    container.style.height = box.height + "px";
    containerCut.style.width = box.width + "px";
    containerCut.style.height = box.height + "px";
}
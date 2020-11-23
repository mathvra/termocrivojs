import cv from './opencv.js'

export default function cores(src) {
    let mascaras = []
    let img = new cv.Mat(src.rows, src.cols, src.type());
    cv.cvtColor(src, img, cv.COLOR_RGB2HSV, 0);
    let barra = document.getElementById('barra')

    const coresRange = {
        low: [
            [0, 78, 51, 0], // lowVermelho
            [173, 78, 51, 0], // lowVermelho
            [8, 78, 51, 0], // lowLaranja
            [26, 78, 51, 0], // lowAmarelo
            [31, 78, 51, 0], // lowVerde
            [84, 78, 51, 0], // lowCiano
            [99, 78, 51, 0], // lowAzul
            [129, 78, 51, 0], // lowVioleta
            [144, 78, 51, 0], // lowMagenta
            [0, 0, 204, 0], // lowBranco
            [0, 0, 0, 0] // lowPreto

        ],
        up: [
            [7, 255, 255, 255], // upVermelho
            [179, 255, 255, 255], // upVermelho
            [25, 255, 255, 255], // upLaranja
            [30, 255, 255, 255], // upAmarelo
            [83, 255, 255, 255], // upVerde
            [98, 255, 255, 255], // upCiano
            [128, 255, 255, 255], // upAzul
            [143, 255, 255, 255], // upVioleta
            [172, 255, 255, 255], // upMagenta
            [179, 77, 255, 255], // upBranco
            [179, 255, 50, 255] // upPreto
        ]

    }
    for (let i = 0; i < 11; i++) {
        if (i == 0) {

            let red = new cv.Mat(img.rows, img.cols, img.type())
            let red2 = new cv.Mat(img.rows, img.cols, img.type())
            let redFinal = new cv.Mat(img.rows, img.cols, img.type())

            let lowr = new cv.Mat(img.rows, img.cols, img.type(), coresRange.low[0])
            let lowr2 = new cv.Mat(img.rows, img.cols, img.type(), coresRange.low[1])
            let highr = new cv.Mat(img.rows, img.cols, img.type(), coresRange.up[0])
            let highr2 = new cv.Mat(img.rows, img.cols, img.type(), coresRange.up[1])

            cv.inRange(img, lowr, highr, red)
            cv.inRange(img, lowr2, highr2, red2)

            cv.add(red, red2, redFinal)

            mascaras.push(redFinal)
            i = i + 1
        } else {
            let final = new cv.Mat(img.rows, img.cols, img.type())
            let low = new cv.Mat(img.rows, img.cols, img.type(), coresRange.low[i]);
            let high = new cv.Mat(img.rows, img.cols, img.type(), coresRange.up[i]);


            cv.inRange(img, low, high, final);
            mascaras.push(final)
        }

    }
    return mascaras
}
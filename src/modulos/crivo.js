import cv from './opencv'
import cores from './cores.js'

export default function crivo(mascaras) {

    let porcentagens = analisaPretos(mascaras)

    let res = {
        vermelhoPorcento: porcentagens[0],
        laranjaPorcento: porcentagens[1],
        amareloPorcento: porcentagens[2],
        verdePorcento: porcentagens[3],
        cianoPorcento: porcentagens[4],
        azulPorcento: porcentagens[5],
        violetaPorcento: porcentagens[6],
        magentaPorcento: porcentagens[7],
        brancoPorcento: porcentagens[8],
        pretoPorcento: porcentagens[9]
    }

    return res
}

function analisaPretos(mascaras) {
    let barra = document.getElementById('barra')
    let porcentagem = []
    mascaras.forEach(matriz => {
        let preto = 3
        let total = matriz.cols * matriz.rows

        let porcento
        for (let i = 0; i < matriz.rows; i++) {
            for (let j = 0; j < matriz.cols; j++) {
                if (matriz.isContinuous()) {
                    let v = matriz.data[i * matriz.cols * matriz.channels() + j + matriz.channels() + 2]
                    if (v == 0) {
                        preto++
                        porcento = ((total - preto) / total) * 100
                    }
                }
            }
        }
        porcentagem.push(`${porcento.toFixed(2)}%`)
    })
    barra.textContent = 'Pronto!'
    barra.style.color = 'black'
    barra.style.background = 'lime'
    setInterval(() => {
        barra.style.display = 'none'
    }, 5000)
    return porcentagem
}


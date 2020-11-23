export default function preencherPorcentagens(porcentagens){

    let resvermelho = document.getElementById('txtvermelho')
    let reslaranja = document.getElementById('txtlaranja')
    let resamarelo = document.getElementById('txtamarelo')
    let resverde = document.getElementById('txtverde')
    let resciano = document.getElementById('txtciano')
    let resazul = document.getElementById('txtazul')
    let resvioleta = document.getElementById('txtvioleta')
    // let resmagenta = document.getElementById('txtmagenta')
    let resbranco = document.getElementById('txtbranco')
    let respreto = document.getElementById('txtpreto')

    resvermelho.innerText = `Vermelho(%): `
    reslaranja.innerHTML = `Laranja(%): `
    resamarelo.innerHTML = `Amarelo(%): `
    resverde.innerHTML = `Verde(%): `
    resciano.innerHTML = `Ciano(%): `
    resazul.innerHTML = `Azul(%): `
    resvioleta.innerHTML = `Violeta(%): `
    // resmagenta.innerHTML = `Magenta(%): `
    resbranco.innerHTML = `Branco(%): `
    respreto.innerHTML = `Preto(%): `

    resvermelho.innerText += ` ${porcentagens[0].toFixed(2)}%`
    reslaranja.innerHTML += `${porcentagens[1].toFixed(2)}%`
    resamarelo.innerHTML += `${porcentagens[2].toFixed(2)}%`
    resverde.innerHTML += `${porcentagens[3].toFixed(2)}%`
    resciano.innerHTML += `${porcentagens[4].toFixed(2)}%`
    resazul.innerHTML += `${porcentagens[5].toFixed(2)}%`
    resvioleta.innerHTML += `${porcentagens[6].toFixed(2)}%`
    //resmagenta.innerHTML += `${porcentagens[7].toFixed(2)}%`
    resbranco.innerHTML += `${porcentagens[7].toFixed(2)}%`
    respreto.innerHTML += `${porcentagens[8].toFixed(2)}%`

}
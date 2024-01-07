import {Peca} from './Peca.js'

var btnDado = document.querySelector("#btnDado")
var dado = document.querySelector("#valorDado")
var valorDado = 0
var td = document.querySelectorAll("td")
var pecas = document.querySelectorAll('.iconP')

var trajetoria = [4]

trajetoria[0] = [16, 61, 62, 63, 64, 65, 51, 40, 33, 26, 
                18, 6, 7, 8, 20, 28, 35, 42, 53, 67, 68,
                69, 70, 71, 72, 84, 96, 95, 94, 93, 92, 
                91, 105, 117, 125, 132, 139, 150, 149, 
                148, 137, 130, 123, 115, 103, 90, 89,
                88, 87, 86, 85, 73, 74, 75, 76, 77, 78, 66]

trajetoria[1] = [
                22, 20, 28, 35, 42, 53, 67, 68, 69, 70, 71,
                72, 84, 96, 95, 94, 93, 92, 91, 105, 117, 125,
                132, 139, 150, 149, 148, 137, 130, 123, 115, 103,
                90, 89, 88, 87, 86, 85, 73, 60, 61, 62, 63, 64, 65,
                51, 40, 33, 26, 18, 6, 7, 19, 27, 34, 41, 52, 66]

trajetoria[2] = [
                113, 137, 130, 123, 115, 103, 90, 89, 88, 87, 86, 85, 
                73, 60, 61, 62, 63, 64, 65, 51, 40, 33, 26, 18, 6, 
                7, 8, 20, 28, 35, 42, 53, 67, 68, 69, 70, 71, 72, 
                84, 96, 95, 94, 93, 92, 91, 105, 117, 125, 132, 139, 150, 
                149, 138, 131, 124, 116, 104, 66]


trajetoria[3] = [
                119, 95, 94, 93, 92, 91, 105, 117, 125, 132, 139, 150,
                149, 148, 137, 130, 123, 115, 103, 90, 89, 88, 87, 86, 85,
                73, 60, 61, 62, 63, 64, 65, 51, 40, 33, 26, 18, 6, 7, 8, 20,
                28, 35, 42, 53, 67, 68, 69, 70, 71, 72, 84, 83, 82, 81, 80, 79, 66]

var peca = [16]

/* -- INICIANDO PECAS -- */
for(let i = 0; i < 16; i++) {
  let p = pecas[i]

  if(i < 4) {
    peca[i] = new Peca(0, p, trajetoria[0][0])  
  }
  else if(i >= 4 && i < 8) {
    peca[i] = new Peca(1, p, trajetoria[1][0])
  }
  else if(i >= 8 && i < 12) {
    peca[i] = new Peca(2, p, trajetoria[2][0])
  }
  else if(i >= 12 && i < 16) {
    peca[i] = new Peca(3, p, trajetoria[1][0])
  }

}
 /* -- INICIANDO PECAS -- */

 console.log(peca)
 console.log(trajetoria)

//td[position].style.backgroundColor = "red"

btnDado.addEventListener('click', function () {
    
  console.log("btnDado, clicou")
  dado.value = Math.floor((Math.random()*6) + 1)

    /*
    position += valorDado.value
    
    if(position >= 148) {
        position = position % 148
    }
    */
  valorDado = dado.value

  dado.innerHTML = dado.value
})


//CLIQUE DAS PEÇAS

//td[66].appendChild(pecas[1])

//td[6].appendChild(pecas[1])
/*
for(let i = 0; i < td.length; i++) {
  td[i].innerHTML = `${i}`
}
*/

//td[84].appendChild(pecas[1])

  for (let i = 0; i < pecas.length; i++) {
    pecas[i].addEventListener("click", function () {
      console.log(`clicou na peça: ${i}`)
      mudarPosicao(i)
    });
  }

function mudarPosicao(index) { 

  let t = peca[index].trajetoria
  t += valorDado
  
  if(t > 57) {
    t = 57
  }
  peca[index].trajetoria = t
  peca[index].posicao = trajetoria[peca[index].jogador][peca[index].trajetoria]

  td[peca[index].posicao].appendChild(peca[index].componenteHTML)
  //mudarPosicao(i)
  console.log(peca[index])
    //td[parseInt(position)].appendChild(pecas[index])
}
  /*
  function mudarPosicao() {
    let index = this.id.slice()
    console.log('clicou ', index)
  }
  */
  //CLIQUE DAS PEÇAS
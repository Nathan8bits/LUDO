var btnDado = document.querySelector("#btnDado")
var valorDado = document.querySelector("#valorDado")
var td = document.querySelectorAll("td")

var position = -1

//td[position].style.backgroundColor = "red"

btnDado.addEventListener('click', function () {
    
    console.log("btnDado, clicou")
    valorDado.value = Math.floor((Math.random()*6) + 1)

    position += valorDado.value
    
    if(position >= 148) {
        position = position % 148
    }

    //mudarPosicao( ,position)

    //td[position].classList.add('red')

    valorDado.innerHTML = valorDado.value
})

/*
function mudarPosicao (peca, position) {
    td[position].appendChild(peca)
}
*/


//CLIQUE DAS PEÇAS
var pecas = document.querySelectorAll('.iconP')

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
    //let index = this.id.slice()
    //let peca = document.querySelector('#slice')

    td[parseInt(position)].appendChild(pecas[index])
  }
  /*
  function mudarPosicao() {
    let index = this.id.slice()
    console.log('clicou ', index)
  }
  */
  //CLIQUE DAS PEÇAS
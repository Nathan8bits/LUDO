import {Peca} from './Peca.js'

//var btnDado = document.querySelector("#btnDado")
var divDado = document.querySelector("#dado")
var dado = document.querySelector("#valorDado")
var valorDado = 0
var dadoLivre = true
var td = document.querySelectorAll("td")
var pecas = document.querySelectorAll('.iconP')

var trajetoria = [4]
var casasSeguras = [61, 26, 20, 70, 95, 132, 137, 87, 66]

var jogador = [4]

for(let i = 0; i < 4; i++) {
  jogador[i] = false
}
//jogador[0] = true
jogador[Math.floor((Math.random()*4))] = true
passarVez()


//trajetoria do azul
trajetoria[0] = [16, 61, 62, 63, 64, 65, 51, 40, 33, 26, 
                18, 6, 7, 8, 20, 28, 35, 42, 53, 67, 68,
                69, 70, 71, 72, 84, 96, 95, 94, 93, 92, 
                91, 105, 117, 125, 132, 139, 150, 149, 
                148, 137, 130, 123, 115, 103, 90, 89,
                88, 87, 86, 85, 73, 74, 75, 76, 77, 78, 66]
//trajetoria do vermelho
trajetoria[1] = [
                22, 20, 28, 35, 42, 53, 67, 68, 69, 70, 71,
                72, 84, 96, 95, 94, 93, 92, 91, 105, 117, 125,
                132, 139, 150, 149, 148, 137, 130, 123, 115, 103,
                90, 89, 88, 87, 86, 85, 73, 60, 61, 62, 63, 64, 65,
                51, 40, 33, 26, 18, 6, 7, 19, 27, 34, 41, 52, 66]

//trajetoria do amarelo
trajetoria[3] = [
                113, 137, 130, 123, 115, 103, 90, 89, 88, 87, 86, 85, 
                73, 60, 61, 62, 63, 64, 65, 51, 40, 33, 26, 18, 6, 
                7, 8, 20, 28, 35, 42, 53, 67, 68, 69, 70, 71, 72, 
                84, 96, 95, 94, 93, 92, 91, 105, 117, 125, 132, 139, 150, 
                149, 138, 131, 124, 116, 104, 66]

//trajetoria do verde
trajetoria[2] = [
                119, 95, 94, 93, 92, 91, 105, 117, 125, 132, 139, 150,
                149, 148, 137, 130, 123, 115, 103, 90, 89, 88, 87, 86, 85,
                73, 60, 61, 62, 63, 64, 65, 51, 40, 33, 26, 18, 6, 7, 8, 20,
                28, 35, 42, 53, 67, 68, 69, 70, 71, 72, 84, 83, 82, 81, 80, 79, 66]

var peca = [pecas.length]

/* -- INICIANDO PECAS -- */
for(let i = 0; i < pecas.length; i++) {  
  let p = pecas[i]

  if(i < 4) {
    peca[i] = new Peca(0, p, trajetoria[0][0])
  }
  else if(i >= 4 && i < 8) {
    peca[i] = new Peca(1, p, trajetoria[1][0])
  }
  else if(i >= 8 && i < 12) {
    p = pecas[i+4]
    peca[i] = new Peca(2, p, trajetoria[2][0])
  }
  else if(i >= 12 && i < 16) {
    p = pecas[i-4]
    peca[i] = new Peca(3, p, trajetoria[1][0])
  }
}

/*  posicionando peças para testes 
*/
peca[8].trajetoria = 1
mudarPosicao(8)
/*
peca[9].trajetoria = 1
mudarPosicao(9)
/*
peca[10].trajetoria = 1
mudarPosicao(10)
*/
peca[11].trajetoria = 56
mudarPosicao(11)
/*

peca[12].trajetoria = 40
mudarPosicao(12)
peca[13].trajetoria = 40
mudarPosicao(13)

peca[14].trajetoria = 40
mudarPosicao(14)
peca[15].trajetoria = 40
mudarPosicao(15)

peca[0].trajetoria = 27
mudarPosicao(0)
peca[1].trajetoria = 27
mudarPosicao(1)
peca[2].trajetoria = 27
mudarPosicao(2)
peca[3].trajetoria = 27
mudarPosicao(3)


peca[7].trajetoria = 14
mudarPosicao(7)
peca[4].trajetoria = 14
mudarPosicao(4)

peca[5].trajetoria = 14
mudarPosicao(5)
peca[6].trajetoria = 14
mudarPosicao(6)
/**/

console.log(peca, trajetoria, jogador)

 /* -- INICIANDO PECAS -- */
divDado.addEventListener('click', function () 
{    
  if(dadoLivre) {
    valorDado = Math.floor((Math.random()*6) + 1) //gerando valor aleatorio entre 1 e 6
  
    //valorDado = 1  //definindo um valor fixo para o dado para testes
    dado.innerHTML = valorDado
    dadoLivre = false
    console.log(`clicou btnDado: ${valorDado}. dadoLivre:`, dadoLivre)
  
    let jogadorDaVez = 0
    while (jogador[jogadorDaVez] == false) //esta verificando qual jogador ta na vez
    {
      jogadorDaVez++
    }
      
    let disponivel = jogadorPecasDisponivel(jogadorDaVez)
  
    console.log(`vez do jogador: ${jogadorDaVez}. peças disponiveis: ${disponivel}`)
  
    // condições para o movimento automatico das peças do jogador da vez
    if(jogador[jogadorDaVez] && valorDado != 6 && jogadorPecasDisponivel(jogadorDaVez) == 0) 
    {
      //passando a vez para o proximo jogador
      dadoLivre = true
      console.log('dado livre: ', dadoLivre)
      passarVez()
    }
    else if (jogador[jogadorDaVez] && valorDado == 6 && jogadorPecasDisponivel(jogadorDaVez) == 0) 
    {//move a primeira peça encontrada na Home
      
      let p = -1 //um index que nao existe na matriz peca
      for(let i = 0; i < peca.length; i++)
      {
        if(peca[i].jogador == jogadorDaVez && peca[i].trajetoria == 0) //procurando peças na Home
        {
          p = i
        }
      }

      if(p >= 0) {
        valorDado = 1 //tira uma peça da Home
        console.log('tirei uma peça da home')
        mudarPosicao(p)
      } else if (p < 0) {
        dadoLivre = true
        passarVez()
      }
    }
    else if (jogador[jogadorDaVez] && valorDado != 6 && jogadorPecasDisponivel(jogadorDaVez) == 1) 
    { //move unica peça disponivel
      console.log('so tem uma peça pra mover')
      let p
      for(let i = 0; i < peca.length; i++)
      {
        if( peca[i].jogador == jogadorDaVez 
            && peca[i].trajetoria > 0 
            && peca[i].trajetoria + valorDado <= 57) 
        {
          p = i
        }
      }
      mudarPosicao(p)
      passarVez()
    }  
    else if(jogador[jogadorDaVez] && todasPecasMesmoLugar(jogadorDaVez)) 
    { //move a primeira peça encontrada
      console.log('todas estavam na mesma casa')
      let p
      for(let i = 0; i < peca.length; i++)
      {
        if( peca[i].jogador == jogadorDaVez 
            && peca[i].trajetoria != 0 
            && peca[i].trajetoria + valorDado <= 57) 
        {
          p = i
        }
      }
      mudarPosicao(p)
      if(valorDado != 6) {
        passarVez()//passar a vez
      }
    }
  }
})

//CLIQUE DAS PEÇAS
for (let index = 0; index < pecas.length; index++) 
  {
  peca[index].componenteHTML.addEventListener("click", function () 
  {
    if(jogador[peca[index].jogador] && !dadoLivre && peca[index].trajetoria + valorDado <= 57) 
    {
      console.log(`clicou na peça: ${index},
      jogador: ${peca[index].jogador},
      posicao: ${peca[index].posicao},
      trajetoria: ${peca[index].trajetoria}.`)

    
      if(peca[index].trajetoria == 0 && valorDado == 6) //tirar um apeça da Home e nao passa a vez
      { 
        valorDado = 1
        mudarPosicao(index)
      }
      else if(peca[index].trajetoria != 0 &&  valorDado == 6) //se o dado deu 6 nao passa a vez pro proximo jogador
      { 
        mudarPosicao(index)
      }    
      //else if(peca[index].trajetoria != 0 && valorDado != 6) 
      else if(peca[index].trajetoria + valorDado == 57){ // se a peça movida cehgar no final nao passa a vez
        mudarPosicao(index)
      }

      else //jogada comum dado != 6 e peça.trajetoria != 0
      {
        mudarPosicao(index)

        passarVez()
      }
      console.log(jogador)
    }  
  });
}

function mudarPosicao(index) //coloca peca[index] na posicao equivalente ao sua trajetoria
{ 
  let t = peca[index].trajetoria
  t += valorDado
   
  if(t > 57) //impede q as peças continuem avançando após chegarem no final
  {
    t = 57
  }
   
  peca[index].trajetoria = t
  peca[index].posicao = trajetoria[peca[index].jogador][peca[index].trajetoria]
  td[peca[index].posicao].appendChild(peca[index].componenteHTML)
  
  dadoLivre = true
  console.log('dadoLivre: ', dadoLivre)
  mesmaCasa(index)
}

function jogadorPecasDisponivel(index) //verifica se o jogador[index] 
{                                      //tem alguma peça com trajeto != 0                   
  let resposta = 0

  for(let i = 0; i < peca.length; i++)
  {
    if( peca[i].jogador == index 
        && peca[i].trajetoria > 0 
        && peca[i].trajetoria + valorDado <= 57 ) {
      resposta++
    }
  }

  return resposta
}

function todasPecasMesmoLugar(index)  //verifca se todas as peças do jogador[index]
{                                     //estão fora da Home e no mesmo lugar 
  let pF = []                         //ou valorDado !=6 e todas as peças q n estao na home estao no mesmo lugar
  let pD = []
  
  let tamF = 0
  let tamD = 0
  
  for(let i = 0; i < peca.length; i++) {
    if( peca[i].jogador == index 
        && peca[i].trajetoria > 0 
        && peca[i].trajetoria != 57 
        && peca[i].trajetoria + valorDado <= 57) 
    {//peças fora
      pF[tamF] = peca[i].trajetoria
      tamF++
    }
    else if(peca[i].jogador == index && peca[i].trajetoria == 0)
    {//peças na home
      pD[tamD] = peca[i].trajetoria
      tamD++
    }
  }
  let f = pF[0]
  let preposicaoF = pF.every(element => element == f)//verfica se todos os elementos de pF sao iguais a f, return true ou false
  console.log(`todas as ${pF.length} peças de fora estao na msm casa: `, preposicaoF)

  //let d = pD[0]
  //let preposicaoD = pD.every(element => element == d)//verfica se todos os elementos de pD sao iguais a d, return true ou false
  console.log(`há ${pD.length} peças dentro da home`)

  if(tamF == 1 && tamD > 0 && valorDado != 6) { //mais de uma peça dentro da Home e 1 peça disponivel e dado é diferente de 6
    console.log('há 1 peça fora da home, pelo menos 1 peça dentro da Home e o dado não deu 6')
    return true
  }
  //else if(preposicaoF && preposicaoD) {
  else if(preposicaoF && tamD == 0) { //nenhuma peça dentro da Home e todas as peças de fora estao no mesmo lugar
    return true
  }
  else if(tamF >= 1 && valorDado != 6 && preposicaoF) {
    return true
  }
  else if(preposicaoF && tamD > 0 & valorDado == 6) {
    return false
  }
  else {
    return false
  }
}


/*
function passarVez(jogadorDaVez){
    jogador[jogadorDaVez] = false
    jogadorDaVez++
    jogadorDaVez = jogadorDaVez % 4
    jogador[jogadorDaVez] = true
    console.log('passou a vez')
    console.log(jogador)
}
*/

function passarVez(){
  let jogadorDaVez
  
  for(let i = 0; i < jogador.length; i++) //verificando quem é o jogador da vez
  {
    if(jogador[i]) {
      jogadorDaVez = i
      
      divDado.classList.remove('blue')
      divDado.classList.remove('red')
      divDado.classList.remove('green')
      divDado.classList.remove('yellow')

      switch(i) {
        case 3:
          //divDado.setAttribute("background-color", "blue") 
          divDado.classList.add("blue")
        break
        case 0: 
          divDado.classList.add("red")
        break
        case 1: 
          divDado.classList.add("green")
        break
        case 2: 
          divDado.classList.add("yellow")
        break
      }
      //dado.classList.add('.blue')
    }
  }
  jogador[jogadorDaVez] = false
  jogadorDaVez++
  jogadorDaVez = jogadorDaVez % 4
  jogador[jogadorDaVez] = true
  console.log('passou a vez')
  console.log(jogador)
}


function resetarPosicao(peca) //faz a peça q foi passada pra ela voltar pra home
{
  peca.trajetoria = 0
  peca.posicao = trajetoria[peca.jogador][peca.trajetoria]
  td[peca.posicao].appendChild(peca.componenteHTML)

  dadoLivre = true
}

function mesmaCasa(index) {
  let pecasAdvMesmaCasa = []
  let tam = 0
  //let pecasTotais = 0

  for(let i = 0; i < peca.length; i++){
    /*
    if(index != i 
      && peca[index].posicao == peca[i].posicao 
      && peca[index].jogador != peca[i].jogador 
      && seguranca(peca[index].posicao) == false) 
    {
      */
    if(index != i 
        && peca[index].posicao == peca[i].posicao 
        && peca[index].jogador != peca[i].jogador ) 
      {
      //pecasTotais++
        if(seguranca(peca[index].posicao) == false) {
          pecasAdvMesmaCasa[tam] = peca[i]
          tam++

          //zerando as peças adversarias q estao na mesma casa, fazendoa-as voltar pra home
          resetarPosicao(peca[i])
          
          console.log(`peça ${index} resetou a peça ${i}. posicao: ${peca[i].posicao}`)
        }
    }
  }

  reduzirPecas(peca[index].posicao) //reduz o tamanho das pecas de determinada posicao de acordo com a qnt de pecas 
  console.log(`havia ${pecasAdvMesmaCasa.length} peças adversarias na casa: ${peca[index].posicao}. Sao elas: `, pecasAdvMesmaCasa)

  if(tam > 0 && valorDado != 6) // nao passa a vez se comer uma peça e se o valor do dado for diferente de 6
  {
    console.log('nao passou a vez')
    
    let jogadorDaVez
    for(let i = 0; i < jogador.length; i++) {
      if(jogador[i]) {
        jogador[i] = false
        jogadorDaVez =i
      }
    }

    if(jogadorDaVez > 0) {
      jogadorDaVez--
    } else {
      jogadorDaVez = jogador.length - 1 //vez do ultimo jogador
    }
    jogador[jogadorDaVez] = true
    console.log(jogador)

  }
}


function reduzirPecas(posicao) {
  let pecasMesmaCasa = []
  let tam = 0

  peca.forEach(p => {
    if(p.posicao == posicao) {
      pecasMesmaCasa[tam] = p
      tam++

    p.componenteHTML.classList.remove("tam1")
    p.componenteHTML.classList.remove("tam2")
    p.componenteHTML.classList.remove("tam3")
    p.componenteHTML.classList.remove("tam4")
    }
  })


  if (pecasMesmaCasa[0].posicao != 66){

  }
  if(pecasMesmaCasa.length == 1) {
    pecasMesmaCasa.forEach(p => {
      p.componenteHTML.classList.add("tam1")
    })
  }
  else if(pecasMesmaCasa.length == 2) {
    pecasMesmaCasa.forEach(p => {
      p.componenteHTML.classList.add("tam2")
    })
  }
  else if(pecasMesmaCasa.length == 3) {
    pecasMesmaCasa.forEach(p => {
      p.componenteHTML.classList.add("tam3")
    })
  }
  else if(pecasMesmaCasa.length == 4) {
    pecasMesmaCasa.forEach(p => {
      p.componenteHTML.classList.add("tam4")
    })
  }
  else if(pecasMesmaCasa.length > 4) 
  {
    if(pecasMesmaCasa[0].posicao != 66) 
    {
      pecasMesmaCasa.forEach(p => {
        p.componenteHTML.classList.add("tamNone")
      })
    }
    else if (pecasMesmaCasa[0].posicao == 66) 
    {
      pecasMesmaCasa.forEach(p => {
        p.componenteHTML.classList.add("tam2")
      })
    }
  }
}



function seguranca(posicao){ //returna true se essa casa for safe
  
  let retorno = false

  for(let i = 0; i < casasSeguras.length; i++)
  {
    if(posicao == casasSeguras[i]) {
      retorno = true
    }
  }

  
  console.log(`casa ${posicao} é segura: ${retorno} `)

  return retorno
}
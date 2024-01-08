import {Peca} from './Peca.js'

var btnDado = document.querySelector("#btnDado")
var dado = document.querySelector("#valorDado")
var valorDado = 0
var dadoDisponivel = true
var td = document.querySelectorAll("td")
var pecas = document.querySelectorAll('.iconP')

var trajetoria = [4]

var jogador = [4]

for(let i = 0; i < 4; i++) {
  jogador[i] = false
}
jogador[0] = true

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
    p = pecas[i+4]
    peca[i] = new Peca(2, p, trajetoria[2][0])
  }
  else if(i >= 12 && i < 16) {
    p = pecas[i-4]
    peca[i] = new Peca(3, p, trajetoria[1][0])
  }

}


peca[8].trajetoria = 2
mudarPosicao(8)
peca[12].trajetoria = 2
mudarPosicao(12)
/*
peca[2].trajetoria = 2
mudarPosicao(2)
*/
/*
peca[3].trajetoria = 2
mudarPosicao(3)
*/

console.log(peca, trajetoria, jogador)

var p = []
for(let i = 0; i < 16; i ++){
  p[i] = peca[i].livre
}
console.log(p)

//console.log(trajetoria)
//console.log(jogador)
 /* -- INICIANDO PECAS -- */

btnDado.addEventListener('click', function () 
{    
  dado.value = Math.floor((Math.random()*6) + 1) //gerando valor aleatorio entre 1 e 6

  valorDado = dado.value
  dado.innerHTML = dado.value
  console.log("clicou btnDado: ", valorDado)

  let jogadorDaVez = 0
  while (jogador[jogadorDaVez] == false) //esta verificando qual jogador ta na vez
  {
    jogadorDaVez++
  }
    
  let disponivel = jogadorPecasDisponivel(jogadorDaVez)

  console.log(`jogador: ${jogadorDaVez}. disponiveis: ${disponivel}`)

  if(jogador[jogadorDaVez] && valorDado != 6 && jogadorPecasDisponivel(jogadorDaVez) == 0) 
  {
    console.log('passou a vez')
    //passando a vez para o proximo jogador
    passarVez(jogadorDaVez)
  }
  else if (jogador[jogadorDaVez] && valorDado == 6 && jogadorPecasDisponivel(jogadorDaVez) == 0) 
  {
    console.log('tirei uma peça da home')
    let p
    for(let i = 0; i < 16; i++)
    {
      if(peca[i].jogador == jogadorDaVez && peca[i].trajetoria == 0) 
      {
        p = i
      }
    }
    valorDado = 1 //tirar uma peça da Home
    mudarPosicao(p)
  }
  else if (jogador[jogadorDaVez] && valorDado != 6 && jogadorPecasDisponivel(jogadorDaVez) == 1) 
  { //move unica peça disponivel
    console.log('so tem uma peça pra mover')
    let p
    for(let i = 0; i < 16; i++)
    {
      if(peca[i].jogador == jogadorDaVez && peca[i].trajetoria != 0) 
      {
        p = i
      }
    }
    mudarPosicao(p)
    passarVez(jogadorDaVez)
  }  
  else if(jogador[jogadorDaVez] && todasPecasMesmoLugar(jogadorDaVez)) 
  { //move a primeira peça encontrada
    console.log('todas estavam na mesma casa')
    let p
    for(let i = 0; i < 16; i++)
    {
      if(peca[i].jogador == jogadorDaVez && peca[i].trajetoria != 0) 
      {
        p = i
      }
    }
    mudarPosicao(p)
    passarVez(jogadorDaVez)//passar a vez
  }
  
})

//CLIQUE DAS PEÇAS
for (let index = 0; index < pecas.length; index++) 
  {
  peca[index].componenteHTML.addEventListener("click", function () 
  {
    if(jogador[peca[index].jogador] && valorDado > 0 &&peca[index].trajetoria + valorDado <= 57) 
    {
      console.log(`clicou na peça: ${index},
      jogador: ${peca[index].jogador},
      posicao: ${peca[index].posicao},
      trajetoria: ${peca[index].trajetoria}.`)

    
      if(peca[index].trajetoria == 0 && valorDado == 6) //a peça está bloqueda mais o dado deu 6?
      { 
        valorDado = 1
        mudarPosicao(index)
      }
      else if(peca[index].trajetoria != 0 &&  valorDado == 6) //se o dado deu 6 nao passa a vez pro proximo jogador
      { 
        mudarPosicao(index)
      }    
      else if(peca[index].trajetoria != 0 && valorDado != 6) 
      {
        mudarPosicao(index)
        //passando a vez para o proximo jogador
        let j = peca[index].jogador
        jogador[j] = false
        j++
        j = j % 4
        jogador[j] = true

        console.log('passou a vez')
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
  valorDado = 0
}

function jogadorPecasDisponivel(index) //verifica se o jogador[index] 
{                                      //tem alguma peça com trajeto != 0                   
  let resposta = 0

  for(let i = 0; i < 16; i++)
  {
    if(peca[i].jogador == index && peca[i].trajetoria > 0) {
      resposta++
    }
  }

  return resposta
}


function todasPecasMesmoLugar(index)  //verifca se todas as peças do jogador[index]
{                                     //estão fora da Home e no mesmo lugar
  let pF = []
  let pD = []
  
  let tamF = 0
  let tamD = 0
  
  for(let i = 0; i < 16; i++) {
    if(peca[i].jogador == index && peca[i].trajetoria > 0) 
    {//peças fora
      pF[i] = peca[i].trajetoria
      tamF++
    }
    else if(peca[i].jogador == index && peca[i].trajetoria == 0)
    {//peças dentro
      pD[tamD] = peca[i].trajetoria
      tamD++
    }
  }
  let f = pF[0]
  let preposicaoF = pF.every(element => element == f)
  console.log(`todas as ${pF.length} peças de fora estao na msm casa: `, preposicaoF)

  let d = pD[0]
  let preposicaoD = pD.every(element => element == d)
  console.log(`há ${pD.length} peças dentro da home:`, preposicaoD)

  if(preposicaoF && preposicaoD) {
    return true
  }
  else {
    return false
  }

}

function passarVez(jogadorDaVez){
  jogador[jogadorDaVez] = false
    jogadorDaVez++
    jogadorDaVez = jogadorDaVez % 4
    jogador[jogadorDaVez] = true
    console.log(jogador)
}
import {Peca} from './Peca.js'

var btnDado = document.querySelector("#btnDado")
var dado = document.querySelector("#valorDado")
var valorDado = 0
var dadoLivre = true
var td = document.querySelectorAll("td")
var pecas = document.querySelectorAll('.iconP')

var trajetoria = [4]

var jogador = [4]

for(let i = 0; i < 4; i++) {
  jogador[i] = false
}
jogador[0] = true

var casasSeguras = [61, 26, 20, 70, 95, 132, 137, 87]

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

/*  posicionando peças para testes
peca[8].trajetoria = 2
mudarPosicao(8)

peca[12].trajetoria = 1
mudarPosicao(12)

peca[2].trajetoria = 1
mudarPosicao(2)

peca[5].trajetoria = 13
mudarPosicao(5)
*/

console.log(peca, trajetoria, jogador)

 /* -- INICIANDO PECAS -- */
btnDado.addEventListener('click', function () 
{    
  if(dadoLivre) {
    dado.value = Math.floor((Math.random()*6) + 1) //gerando valor aleatorio entre 1 e 6
  
    valorDado = dado.value
    //valorDado = 2  //definindo um valor fixo para o dado para testes
    dado.innerHTML = dado.value
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
    {//move a prieira peça encontrada
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
      passarVez()
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
      passarVez()//passar a vez
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
  let pF = []                         //ou valorDado !=6 e todas as peças q n estao na home estao no mesmo lugar
  let pD = []
  
  let tamF = 0
  let tamD = 0
  
  for(let i = 0; i < 16; i++) {
    if(peca[i].jogador == index && peca[i].trajetoria > 0) 
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

  if(jogadorPecasDisponivel(index) == 1) {
    console.log('so ha uma peça fora da home')
    return false
  }
  //else if(preposicaoF && preposicaoD) {
  else if(preposicaoF) {
    return true
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

  for(let i = 0; i < 16; i++){
    if(index != i 
      && peca[index].posicao == peca[i].posicao 
      && peca[index].jogador != peca[i].jogador 
      && seguranca(peca[index].posicao) == false) 
    {
      pecasAdvMesmaCasa[tam] = peca[i]
      tam++

        //zerando as peças adversarias q estao na mesma casa, fazendoa-as voltar pra home
      resetarPosicao(peca[i])
      console.log(`peça ${index} resetou a peça ${i}. posicao: ${peca[i].posicao}`)
    }
  }
  console.log(`havia ${pecasAdvMesmaCasa.length} peças adversarias na casa: ${peca[index].posicao}. Sao elas: `, pecasAdvMesmaCasa)

  if(tam > 0) // nao passa a vez se comer uma peça
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


function seguranca(posicao){ //returna true se essa casa for safe
  
  let retorno = false

  for(let i = 0; i < 8; i++)
  {
    if(posicao == casasSeguras[i]) {
      retorno = true
    }
  }

  
  console.log(`casa ${posicao} é segura: ${retorno} `)

  return retorno
}
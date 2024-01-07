export class Peca {
    _jogador
    _componenteHTML
    _posicao
    _trajetoria

    constructor(jogador, componenteHTML ,posicao) {
        this._jogador = jogador
        this._componenteHTML = componenteHTML
        this._posicao = posicao
        this._trajetoria = 0
    }

    set jogador(novoJogador) {
        this._jogador = novoJogador
    }
    get jogador() {
        return this._jogador
    }

    set posicao(novaPosicao) {
        this._posicao = novaPosicao
    }
    get posicao() {
        return this._posicao
    }

    set trajetoria(novaTrajetoria) {
        this._trajetoria = novaTrajetoria
    }
    get trajetoria() { 
        return this._trajetoria
    }

    set componenteHTML(novoComponenteHTML) {
        this._componenteHTML = novoComponenteHTML
    }

    get componenteHTML(){
        return this._componenteHTML
    }
}
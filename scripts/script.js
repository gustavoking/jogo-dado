'use strict';

const jogadorUm = document.querySelector('.player--0');
const jogadorDois = document.querySelector('.player--1');
const pontuacaoUm = document.querySelector('#score--0');
const pontuacaoDois = document.getElementById('score--1');
const atualUm = document.getElementById('current--0');
const atualDois = document.getElementById('current--1');

const dado = document.querySelector('.dice');
const btnNovo = document.querySelector('.btn--new');
const btnLanca = document.querySelector('.btn--roll');
const btnSegurarPont = document.querySelector('.btn--hold');

let pontuacoes;
let pontuacaoAtual;
let jogadorAtual;
let jogando;



btnLanca.addEventListener('click', function () {
    if (jogando) {

        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        dado.classList.remove('hidden');
        dado.src = `../images/dice-${dice}.png`;

        // 3. Check for rolled 1

        if (dice !== 1) {

            // Add dice to current score
            pontuacaoAtual += dice;
            document.getElementById(
                `current--${jogadorAtual}`
            ).textContent = pontuacaoAtual;
        } else {

            // Switch to next player
            mudarJogador();
        }
    }
});

const mudarJogador = function () {
    document.getElementById(`current--${jogadorAtual}`).textContent = 0;
    pontuacaoAtual = 0;
    jogadorAtual = jogadorAtual === 0 ? 1 : 0;
    jogadorUm.classList.toggle('player--active');
    jogadorDois.classList.toggle('player--active');
};

btnNovo.addEventListener('click', function () {
    iniciar()
})


btnSegurarPont.addEventListener('click', function () {
    if (jogando) {

        // 1. Add current score to active player's score
        pontuacoes[jogadorAtual] += pontuacaoAtual;
        // pontuacoes[1] = pontuacoes[1] + pontuacaoAtual

        document.getElementById(`score--${jogadorAtual}`)
            .textContent = pontuacoes[jogadorAtual];

        // 2. Check if player's score is >= 100
        if (pontuacoes[jogadorAtual] >= 100) {

            // Finish the game
            jogando = false;
            dado.classList.add('hidden');

            document
                .querySelector(`.player--${jogadorAtual}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${jogadorAtual}`)
                .classList.remove('player--active');
        } else {

            // Switch to the next player
            mudarJogador();
        }
    }
});

// Starting conditions
const iniciar = function () {
    pontuacoes = [0, 0];
    pontuacaoAtual = 0;
    jogadorAtual = 0;
    jogando = true;

    pontuacaoUm.textContent = 0;
    pontuacaoDois.textContent = 0;
    atualUm.textContent = 0;
    atualDois.textContent = 0;

    dado.classList.add('hidden');
    jogadorUm.classList.remove('player--winner');
    jogadorDois.classList.remove('player--winner');
    jogadorUm.classList.add('player--active');
    jogadorDois.classList.remove('player--active');
};
iniciar();

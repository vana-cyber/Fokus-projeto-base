const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const banner = document.querySelector('.app__image');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const comecarOuPausarBt = document.querySelector('#start-pause span');
const displayTempo = document.getElementById('timer');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const temporizador = document.getElementById('timer');
const startPauseBt = document.getElementById('start-pause');
const icone = document.querySelector('.app__card-primary-butto-icon'); 
let tempoDecorridoEmSegundos = 1500;
let intevaloId = null;

const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFim = new Audio('/sons/beep.mp3');

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

            case "descanso-curto":
                 titulo.innerHTML = `Que tal dar uma respirada? 
                 <strong class="app__title-strong"> Faça uma pausa curta!</strong>`

                break;

            case "descanso-longo":
                titulo.innerHTML = `Hora de voltar à superfície.
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
    
                break;
                
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFim.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intevaloId) {
        zerar();
        comecarOuPausarBt.textContent = "Começar";
        icone.setAttribute('src', `/imagens/play_arrow.png`);
        musicaPause.play();
        return;
    }

    comecarOuPausarBt.textContent = "Pausar";
    icone.setAttribute('src', `/imagens/pause.png`);
    musicaPlay.play();
    intevaloId = setInterval(contagemRegressiva, 1000);
    
}

function zerar() {
    clearInterval(intevaloId)
    intevaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

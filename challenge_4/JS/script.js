let blackjackGame = {
    'you' : {'scoreSpan' : '#your-points', 'div' : '#player-box', 'score' : 0},
    'bot' : {'scoreSpan' : '#bot-points', 'div' : '#bot-box', 'score' : 0},
    'cards' : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    'cardsMap' : {'1' : [1,11], '2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, '11' : 10 , '12' : 10, '13' : 10},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you']
const BOT = blackjackGame['bot']

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

const hitSound = new Audio('./Sound/Swoosh.mp3');
const winSound = new Audio('./Sound/Cash.mp3');
const lossSound = new Audio('./Sound/Aww.mp3');

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `./Image/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false;

        let playerImages = document.querySelector('#player-box').querySelectorAll('img');
        let botImages = document.querySelector('#bot-box').querySelectorAll('img');

        for (i = 0; i < playerImages.length; i++){
            playerImages[i].remove();
        }

        for (i = 0; i < botImages.length; i++){
            botImages[i].remove();
        }

        YOU['score'] = 0;
        BOT['score'] = 0;

        document.querySelector('#your-points').textContent = 0;
        document.querySelector('#your-points').style.color = 'black';
        document.querySelector('#bot-points').textContent = 0;
        document.querySelector('#bot-points').style.color = 'black';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] === true;
    }
}

function randomCard() { 
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer){
    if (card === '1'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
    
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    blackjackGame['isStand'] = true;
    while (BOT['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, BOT);
        updateScore(card, BOT);
        showScore(BOT);   
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = Winner();
    showResult(winner);
}

function Winner() {
    let winner;

    if (YOU['score'] <= 21){
        if (YOU['score'] > BOT['score'] || (BOT['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < BOT['score']){
            blackjackGame['losses']++;
            winner = BOT;
        } else if (YOU['score'] === BOT['score']){
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && BOT['score'] <= 21){
        blackjackGame['losses']++;
        winner = BOT;
    } else if (YOU['score'] > 21 && BOT['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true){
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!'
            messageColor = 'green';
            winSound.play();
        } else if (winner === BOT) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}


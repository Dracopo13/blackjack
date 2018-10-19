

// Blackjack
// by: Dick Fricke

// Card Variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

// DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');
    debbieButton = document.getElementById('debbie');

// Game variables

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    debbieWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){

    gameStarted = true;
    gameOver = false;
    playerWon = false;
    debbieWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', function(){
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

debbieButton.addEventListener('click', function(){
    gameOver = true;
    debbieWon = true;
    checkForEndOfGame();
    showStatus();
})

// create deck

function createDeck(){
    
    let deck=[];
    for (let suitIdx=0; suitIdx<suits.length; suitIdx++){
        for (let cardValueIdx = 0; cardValueIdx < cardValues.length; cardValueIdx++){
            let card = {
                suit: suits[suitIdx],
                value: cardValues[cardValueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

// shuffle deck

function shuffleDeck(deck){
    for (let i = 0; i< deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
    console.log("I shuffled for you Debbie");
    
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

// get next card from deck

function getNextCard(){
    return deck.shift();
}



function showStatus() {
    if (!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack!';
        return;
    } 

    let dealerCardString = '';
    for (let i=0; i< dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = '';
    for (let i=0; i< playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText =
        'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' +
        
        'player has: \n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

    if (gameOver){
        if (debbieWon){
            textArea.innerText += "DEBBIE WINS!";
        }
        else if (playerWon){
            textArea.innerText += "YOU WIN!";
        }
        else {
            textArea.innerText += "DEALER WINS";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
    
    // for (var i=0; i<deck.length; i++){
    //   textArea.innerText += '\n' + getCardString(deck[i]);
    //}
}

function updateScores(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
};

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'A') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
};

function getCardNumericValue (card){
    switch(card.value){
        case 'A':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        default:
            return 10;
    }
};

function checkForEndOfGame(){
    
    updateScores();

    if (gameOver){
        // let dealer take cards
        while(dealerScore < playerScore 
                && playerScore <= 21
                && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
                }
            }
    
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }

    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
    }
};



function game(yourChoice) {
    console.log(yourChoice);
    let humanChoice = yourChoice.id;
    let computerChoice = randomRPS()
    console.log(computerChoice)

    result = decideWinner(humanChoice, computerChoice);
    console.log(result);
    

    message = finalMessage(result);
    console.log(message);
    gameFrontEnd(humanChoice, computerChoice, message);
    
    
}

function randomRPS(){
    let choice = Math.floor(Math.random() * 3);
    return ['rock', 'paper', 'scissors'][choice];
}

function decideWinner(humanChoice, computerChoice) {
    const rpsDatabase = {
        'rock' : {'paper': 0, 'rock': 0.5, 'scissors': 1},
        'paper' : {'scissor': 0, 'paper': 0.5, 'rock': 1},
        'scissors' : {'rock': 0, 'scissors': 0.5, 'paper': 1}, 
    }

    let yourScore = rpsDatabase[humanChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][humanChoice];

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': 'You Lost !', 'color': 'red'}
    }
    else if (yourScore === 0.5) {
        return {'message': 'Tie', 'color': 'yellow'}
    }
    else {
        return {'message': 'You Won !!', 'color': 'green'}
    }
}

function gameFrontEnd(humanChoice, computerChoice, message){
    let imageDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src,
    }



    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let computerDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanChoice] + "' style = 'filter: drop-shadow(0px 10px 50px rgb(2, 255, 86));'>";
    messageDiv.innerHTML = "<h1 style='color : " + message['color'] +"; font-size : 60px';>" + message['message'] + "</h1>";
    computerDiv.innerHTML = "<img src='" + imageDatabase[computerChoice] + "' style = 'filter: drop-shadow(0px 10px 50px rgb(2, 255, 86));'>";

    document.getElementById('game-images').appendChild(humanDiv);
    document.getElementById('game-images').appendChild(messageDiv);
    document.getElementById('game-images').appendChild(computerDiv);

}



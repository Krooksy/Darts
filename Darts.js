// Player objects
let player1 = {
    name: 'Jordan',
    winner: false,
    scoreRemaining: 501,
    turnsTaken: 0,
    deciderShot: 0,
};

let player2 = {
    name: 'Katie',
    winner: false,
    scoreRemaining: 501,
    turnsTaken: 0,
    deciderShot: 0,
};

let roundScores = {
    jordan: 0,
    katie: 0,
};

const resetStats = () => {
    player1 = {
        name: 'Jordan',
        winner: false,
        scoreRemaining: 501,
        turnsTaken: 0,
        deciderShot: 0,
    };

    player2 = {
        name: 'Katie',
        winner: false,
        scoreRemaining: 501,
        turnsTaken: 0,
        deciderShot: 0,
    };
};

// Possible scores with a single dart, each time the function is called, a random value from the array is selected.
const randomBoardScore = () => {
    const boardNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50];
    const randNum = Math.floor(Math.random() * boardNumbers.length);
    return boardNumbers[randNum];
};

// Possible multipliers with the score above, again randomised.
const randomMultiplier = () => {
    const multiplierChance = [1, 1, 1, 1, 1, 1, 2, 2, 3];
    const randNum = Math.floor(Math.random() * multiplierChance.length);
    return multiplierChance[randNum];
};

// Words used later on in logging to console what the dart's multiplier was.
const multiplierWords = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
};

// This function decides who throws first and changes the object properties if necessary.
const decideFirstThrower = () => {
    player1.deciderShot = randomBoardScore() * randomMultiplier();
    player2.deciderShot = randomBoardScore() * randomMultiplier();

    // Changes the name of player one based on the score of their throws.
    if (player1.deciderShot < player2.deciderShot) {
        player1.name = 'Katie';
        player2.name = 'Jordan';
        console.log(`${player1.name} scored a higher score of ${player2.deciderShot} against ${player2.name}'s ${player1.deciderShot} and will throw first. \n`);
    } else {
        console.log(`${player1.name} scored a higher score of ${player1.deciderShot} aginst ${player2.name}'s ${player2.deciderShot} and will throw first. \n`);
    }

    // Reset values to zero for the next loop.
    player1.deciderShot = player2.deciderShot = 0;
};

// This function decides a winner if the game goes to a tie.
const overtimeWinner = (player) => {
    let threeDartTotal = 0;
    // the loop starts at 1 to make it easier to log which dart number is being thrown
    for (let i = 1; i < 4; i++) {
        let remainder = player.scoreRemaining - threeDartTotal;

        // Assigns score to a dart with a potential multiplier.
        const boardScore = randomBoardScore();
        let boardMulti = randomMultiplier();

        // Sets Multiplier to 1 if either of the centre points are scored - these can't have doubles or triples.
        if (boardScore == 25 || boardScore == 50) {
            boardMulti = 1;
        }

        // Calculates the single dart scores and accumalates them
        const singleDart = boardScore * boardMulti;
        threeDartTotal += singleDart;

        // Logs the score of darts to the console after each throw. Uses the multiplierWords object to access the multplier words as needed
        if (boardScore == 50) {
            console.log(`Dart ${i} scored ${singleDart} with a BULLSEYE!`);
        } else if (boardScore == 0) {
            console.log(`Dart ${i} MISSED!`);
        } else {
            console.log(`Dart ${i} scored ${singleDart} with a ${multiplierWords[boardMulti]} ${boardScore}`);
        }
    }
    console.log(`${player.name} scored ${threeDartTotal}! \n`);
    return threeDartTotal;
};

// This function similutes the chance of throwing a double for the win.
const doubleToWin = (player, dtwNum) => {

    // Gives a 50/50 chance of scoring the double  
    const winProbabilityArray = [0, 0, 1, 1];
    const winProbChance = Math.floor(Math.random() * winProbabilityArray.length);
    const requiredDouble = dtwNum / 2;

    if (winProbabilityArray[winProbChance] == 1) {
        player.winner = true;
        player.scoreRemaining = 0;
        console.log(`${player.name} scored double ${requiredDouble} in ${player.turnsTaken} turns \n`);
    } else {
        console.log(player.name + ' missed the double! \n');
    }
};

// This function will throw three darts, calculate the scores and finally deduct that value from the values above.
const throwDarts = (player) => {
    // Resets the three dart total to zero before the next loop.
    console.log(`${player.name} to throw. ${player.scoreRemaining} needed.`);
    let threeDartTotal = 0;
    let previousTotal = player.scoreRemaining;

    // Loops through 3 times and accumulates the dart scores and the loop starts at 1 to make it easier to log which dart number is being thrown
    for (let i = 1; i < 4; i++) {
        let remainder = player.scoreRemaining - threeDartTotal;

        if (remainder <= 40 && remainder > 1 && remainder % 2 == 0) {
            doubleToWin(player, remainder);
            break;
        }

        // Assigns score to a dart with a potential multiplier.
        const boardScore = randomBoardScore();
        let boardMulti = randomMultiplier();

        // Sets Multiplier to 1 if either of the centre points are scored - these can't have doubles or triples.
        if (boardScore == 25 || boardScore == 50) {
            boardMulti = 1;
        }

        // Calculates the single dart scores and accumalates them
        const singleDart = boardScore * boardMulti;
        threeDartTotal += singleDart;

        // Logs the score of darts to the console after each throw. Uses the multiplierWords object to access the multplier words as needed
        if (boardScore == 50) {
            console.log(`Dart ${i} scored ${singleDart} with a BULLSEYE!`);
        } else if (boardScore == 0) {
            console.log(`Dart ${i} MISSED!`);
        } else {
            console.log(`Dart ${i} scored ${singleDart} with a ${multiplierWords[boardMulti]} ${boardScore}`);
        }
    }

    // Increments the current players turnsTaken property
    player.turnsTaken++;

    // This ends the execution if a player wins during the the throwDarts function.
    if (player1.winner == true || player2.winner == true) {
        return 0;
    }

    // Subtracts the accumalation of the three darts from the target score and logs to console or declares player bust and resets their score to the previous total.
    if (player.scoreRemaining - threeDartTotal <= 1) {
        player.scoreRemaining = previousTotal;
        console.log(`BUST! ${player.name} has ${player.scoreRemaining} remaining. \n`);
        return player.scoreRemaining;
    } else {
        player.scoreRemaining -= threeDartTotal;
        console.log(`${player.name} scored ${threeDartTotal} and has ${player.scoreRemaining} remaining! \n`);
        return player.scoreRemaining;
    }
};

for (let i = 0; roundScores.jordan < 3 && roundScores.katie < 3; i++) {

    // Decide who throws first with 1 dart each, highest score throws first.
    decideFirstThrower();

    // while neither player has been designated the winner, continue playing until the score is within the 'double to win' window.
    while (player1.winner == false && player2.winner == false) {
        player1.scoreRemaining = throwDarts(player1);

        if (player1.winner == false) {
            player2.scoreRemaining = throwDarts(player2);
        } else if (player2.scoreRemaining <= 160) {
            player2.scoreRemaining = throwDarts(player2);
        } else {
            break;
        }

        // Check winning scenario and display the coressponding result.
        // Overtime
        if (player1.winner == true && player2.winner == true && player1.turnsTaken == player2.turnsTaken) {
            console.log('Tie game! Overtime coming up... \n');
            const winner = overtimeWinner(player1) > overtimeWinner(player2) ? player1 : player2;
            roundScores[winner.name.toLowerCase()]++;
            console.log(`The winner is ${winner.name}!`);
            break;

        } else if (player1.winner || player2.winner == true) {
            const winner = player1.scoreRemaining < player2.scoreRemaining ? player1 : player2;
            console.log(`${winner.name} has won! \n`);
            roundScores[winner.name.toLowerCase()]++;
            break;
        }

        if (player1.winner == false && player2.winner == false && player1.turnsTaken > 20 && player2.turnsTaken > 20) {
            const suddenDeathWinner = player1.scoreRemaining < player2.scoreRemaining ? player1 : player2;
            suddenDeathWinner.roundsWon++;
            console.log(`The game has surpassed 20 turns! ${suddenDeathWinner.name} is the winner with the lower score of ${suddenDeathWinner.scoreRemaining} \n`);
            break;
        }
    }
    console.log('############################################################### \n');
    resetStats();
}
const overallWinnner = roundScores.jordan > roundScores.katie ? 'Jordan' : 'Katie';
const wonRounds = Math.max(roundScores.jordan, roundScores.katie);
const lostRounds = Math.min(roundScores.jordan, roundScores.katie);
console.log(`Game over! ${overallWinnner} won with ${wonRounds} rounds to ${lostRounds}`);

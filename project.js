const prompt = require('prompt-sync')();
const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 3,
    C: 4,
    D: 5
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter the amount to be deposited: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount < 0) {
            console.log("Enter a valid amount");
        } else {
            return numberDepositAmount;
        }
    }
};

const getLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines < 0 || numberOfLines > 3) {
            console.log("Enter valid input");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet amount per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet < 0 || numberBet > balance / lines) {
            console.log("Enter valid input");
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randIndex, 1);
        }
    }
    return reels;

};

const transpose = (reels) => {
    let n = reels.length;
    for (let i = 0; i < reels.length; i++) {
        for (let j = i + 1; j < reels.length; j++) {
            [reels[i][j], reels[j][i]] = [reels[j][i], reels[i][j]];;
        }
    }
    return reels;
}

const printRows = (transposedReels) => {
    for (const row of transposedReels) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (transposedReels, bets, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = transposedReels[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bets * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balance = deposit();
    //console.log("Your balance is $" + balance);
    while(true){
        
        console.log("Your balance is $" + balance);
        const playAgain = prompt("Would you like to play(y/n)?");
        if(playAgain != 'y'){
            break;
        }
        const lines = getLines();
        const bets = getBet(balance, lines);
        balance -= bets*lines;
        const reels = spin();
        const transposedReels = transpose(reels);
        printRows(transposedReels);
        const winnings = getWinnings(transposedReels, bets, lines);
        balance += winnings;
        console.log("You won, $" + winnings);

        if(balance<=0){
            console.log("You ran out of money");
            break;
        }
        

    }
    
}
game();

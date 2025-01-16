const prompt = require('prompt-sync')();
const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A:2,
    B:3,
    C:4,
    D:5
};

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
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
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        if(isNaN(numberOfLines) || numberOfLines < 0 || numberOfLines >3){
            console.log("Enter valid input");
        }else{
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet amount per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet < 0 || numberBet > balance/lines){
            console.log("Enter valid input");
        }else{
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randIndex = Math.floor(Math.random()* reelSymbols.length)
            const selectedSymbol =  reelSymbols[randIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randIndex, 1);
        }
    }
    return reels;

};

const transpose = (reels) => {
    let n = reels.length;
    for(let i = 1; i<reels.length; i++){
        for(let j = 0; j<i-1; j++){
            [reels[i][j], reels[j][i]] = [reels[j][i], reels[i][j]]; ;
        }
    }
    return reels;
}

let balance = deposit();
const lines = getLines();
const bet = getBet(balance, lines);
const reels = spin();
console.log(reels);
const transposedReels = transpose(reels);
console.log(transposedReels);
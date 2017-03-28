// Settings
var userBet = 0;
// Bot
var betRound = 50;
var forceBet = false;
var lastBet = 0;
var interval = 2500;
var lastBalance = 0;
var gamesCounter = 0;
var initialBalance = parseInt($(".balance .num").text().replace(",", ""));
var initialTime = new Date();

function start(){
    var currentBalance = parseInt($(".balance .num").text().replace(",", ""));
    lastBalance = currentBalance;
    var bet = userBet;
    if (bet == 0){
        bet = Math.floor(Math.floor(currentBalance * 0.005) / betRound) * betRound;
    }
    if (forceBet){
        bet = bet + (25 * lastBet);
    }
    lastBet = bet;
    gamesCounter += 1;
    var balanceDifference = currentBalance - initialBalance;
    var balancePercentage = (currentBalance/initialBalance*100).toFixed(2)
    var currentTime = new Date();
    var timeDifference = (currentTime - initialTime) / 1000;
    console.log("GAME #"+gamesCounter);
    console.log("Balance: "+currentBalance);
    console.log("Difference: "+balanceDifference+" ("+balancePercentage+"%)");
    console.log("Minutes: "+(timeDifference/60).toFixed(2));
    console.log("Bet: "+bet);

    //Set bet settings
    $("#bet").val(bet);
    var mineButton = $(".mine_options button").first();
    mineButton.click();
    $("#start_game").click();
    setTimeout(play, interval);
}

function play(){
    var randomChoice = Math.floor(Math.random() * 25) + 1;
    var game = $(".game").first();
    var tile = game.find("li[data-tile="+randomChoice+"]").first();
    tile.click();
    setTimeout(cashout, interval);
}

function cashout(){
    var game = $(".game").first();
    var cashoutButton = game.find(".cashout").first();
    cashoutButton.click();
    setTimeout(function(){
        var currentBalance = parseInt($(".balance .num").text().replace(",", ""));
        if (lastBalance > currentBalance){
            console.log("LOSE!");
            forceBet = true;
        }else{
            console.log("WIN!");
            forceBet = false;
        }
        console.log("--- --- ---- --- ----");
        start();
    }, interval);
}
start();
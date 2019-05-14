
// p1: boolean, did player 1 lose
function gameOver(p1) {
    console.log("Player 1 lost: " + p1);
    GAME_OVER = true;
    return;

    var gameOver = document.createElement('div');
    gameOver.id = "game_over";

    var mainText = document.createElement('div');
    mainText.className = "gameOverText";
    gameOver.appendChild(mainText);

    var playAgain = document.createElement('INPUT');
    playAgain.type = 'button';
    playAgain.value = "Play Again";
    playAgain.id = "play-again-button";
    playAgain.className = "fancyButton";

    playAgain.onclick = function() {
        $("#game_over").remove();

    };


}
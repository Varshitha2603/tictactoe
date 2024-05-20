const tiles = document.querySelectorAll(".tile");
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let turn = PLAYER_X;
const boardState = Array(tiles.length);
boardState.fill(null);
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game_over_area");
const gameOverText = document.getElementById("game_over_text");
const playAgain = document.getElementById("play_again");
playAgain.addEventListener("click", startNewGame);
const gameOverSound = new Audio("Sounds/winningSound.mp3");
const clickSound = new Audio("Sounds/osSound.mp3");
tiles.forEach(tile => tile.addEventListener("click", tileClick));
function setHoverText(){
    tiles.forEach(tile => {
        tile.classList.remove("x_hover");
        tile.classList.remove("o_hover");
    });
    const hoverClass = `${turn.toLowerCase()}_hover`;
    tiles.forEach((tile) => {
        if(tile.innerText == ""){
            tile.classList.add(hoverClass);
        }
    })
}
setHoverText();
function tileClick(event){
    if(gameOverArea.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ""){
        return;
    }
    if(turn === PLAYER_X){
        tile.innerText = PLAYER_X;
        boardState[tileNumber-1] = PLAYER_X;
        turn = PLAYER_O;
    }
    else{
        tile.innerText = PLAYER_O;
        boardState[tileNumber-1] = PLAYER_O;
        turn = PLAYER_X;
    }
    clickSound.play();
    setHoverText();
    checkWinner();
}
function checkWinner(){
    for(const winningCombination of winningCombinations){
        // console.log(winningCombination);
        const {combo, strikeClass} = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];
        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if(allTileFilledIn){
        gameOverScreen(null);
    }
}
function gameOverScreen(winnerText){
    let text = "Draw";
    if(winnerText != null){
        text = `Winner is ${winnerText}`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
}
function startNewGame(){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYER_X;
    setHoverText();
    gameOverSound.pause();
}
const winningCombinations = [
    {combo: [1,2,3], strikeClass: "strike_row_1"},
    {combo: [4,5,6], strikeClass: "strike_row_2"},
    {combo: [7,8,9], strikeClass: "strike_row_3"},
    {combo: [1,4,7], strikeClass: "strike_column_1"},
    {combo: [2,5,8], strikeClass: "strike_column_2"},
    {combo: [3,6,9], strikeClass: "strike_column_3"},
    {combo: [1,5,9], strikeClass: "strike_diagonal_1"},
    {combo: [3,5,7], strikeClass: "strike_diagonal_2"}
];
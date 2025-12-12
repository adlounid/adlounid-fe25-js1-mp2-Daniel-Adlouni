let players = ["Spelare 1", "Spelare 2"];
let scores = [0, 0];     // Totala poäng
let roundScore = 0;      // Poäng i pågående omgång
let currentPlayer = 0;   // Vems tur
let rounds = 0;
let gameActive = false;

function startGame() {
    // Hämta namn
    players[0] = document.getElementById("player1Name").value || "Spelare 1";
    players[1] = document.getElementById("player2Name").value || "Spelare 2";

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    updateUI(); // Uppdaterar spelare och poäng
    gameActive = true;
}

function rollDice() {
    if (!gameActive) return;

    let dice = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice").innerText = dice;

    if (dice === 1) {
        // Tappa omgångens poäng
        roundScore = 0;
        nextPlayer();
    } else {
        roundScore += dice;
    }

    updateUI();
}

function hold() {
    if (!gameActive) return;

    // Lägg poängen till totalen
    scores[currentPlayer] += roundScore;
    roundScore = 0;

    // När spelaren har vunnit (når 100 poäng)
    if (scores[currentPlayer] >= 100) {
        document.getElementById("winner").innerText =
            players[currentPlayer] + " vann spelet efter " + rounds + " omgångar!";
        gameActive = false;
        return;
    }

    nextPlayer();
    updateUI();
}

function nextPlayer() {
    rounds++;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
}

function updateUI() {
    document.getElementById("currentPlayer").innerText =
        "Det är " + players[currentPlayer] + "s tur";

    document.getElementById("roundScore").innerText = roundScore;
    document.getElementById("p1score").innerText = players[0] + ": " + scores[0] + " poäng";
    document.getElementById("p2score").innerText = players[1] + ": " + scores[1] + " poäng";
    document.getElementById("rounds").innerText = rounds;
}
document.getElementById("setupForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    startGame();         
});

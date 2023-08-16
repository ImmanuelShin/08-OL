'use strict'

// Greetings section.

function hello() {
    alert("Hello!");
}

// Name Asking section.

const proompt = "What is your name?"

function askName(proompt) {
    let name = prompt(proompt);
    if (name === null) {
        return;
    } else if (name === "") {
        iD("name_area").innerHTML = "Nice to meet you, lazy anonymous user! I hope you enjoyed the memes!"
    } else if (/\d/.test(name)) {
        let newProompt = "There's no way your name contains numbers."
        askName(newProompt);
    } else {
        iD("name_area").innerHTML = "Nice to meet you, " + name + "! I hope you enjoyed the memes!"
    }
}

// Clicker game section.

let count = 0;

function clicker() {
    count++;
    iD("tally").innerHTML = count;
}

function reset() {
    count = 0;
    iD("tally").innerHTML = count;
}

// Memory game section.

let round = 3;
let iteration = 0;
let gameString = "";
let attempt = 0;
const attemptPrompt = "Write the numbers in order of appearance without spaces between."
const maxAttempts = 2;

function rng() {
    return Math.floor(Math.random() * 10);
}

// Starts the memory game. Calls delayedLoop() whilst timeout calling answer(). The timeout is synced to the current round. The greater the round, the more numbers that need to be printed, the longer answer() has to wait.
function getNumbers(innRound) {
    let aprompt = "Type the numbers you saw in order without any spaces inbetween."
    round++;
    delayedLoop();
    setTimeout(function() {
        answer(aprompt);
    }, (round*1000 + 1500));
}

// setIntervals randomly printing a number and adding that number to gameString. Stops when iteration equals round. Set to go off every 1000ms.
function delayedLoop() {
    let timerId = setInterval(function (){
        iteration++;
        if (iteration <= round) {
            let x = rng();
            iD("memory_line").innerHTML = x;
            flash();
            gameString = gameString + x.toString();
        } else {
            iD("memory_line").innerHTML = "&nbsp;";
            clearTimeout(timerId);
            iteration = 0;
        }
    }, 1000);
}

// Prompts for an answer. Checks for null, wrong/right answers. Gives 2 tries before ending. Either soft resets or hard resets game depending on input.
function answer(aprompt) {
    attempt++;
    let pAnswer = prompt(aprompt)
    if (pAnswer === null) {
        alert("Not in the gaming mood? The game will sadly reset.")
        resetGame();
        return;
    } else if (pAnswer == gameString) {
        alert("Correct! You just memorized " + round + " digits. Starting again will add one more digit. See how far you can go!");
        softReset();
    } else if (pAnswer !== gameString && attempt < 2) {
        let newPrompt = "Nope, you got " + (maxAttempts - attempt) + " more try."
        answer(newPrompt);
    } else {
        alert("Too bad! You are out of tries. The answer was " + gameString + ". Try again?");
        resetGame();
    }
}

// Soft resets game: clears gameString and number of attempts.
function softReset() {
    gameString = "";
    attempt = 0;
}

// Hard resets game: Resets all parameters back to base levels.
function resetGame() {
    round = 3;
    iteration = 0;
    gameString = "";
    attempt = 0;
    iD("memory_line").innerHTML = "&nbsp;";
}

// sets promise that will resolve after ms milliseconds.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Changes opacity of the numbers between 0 and 1 to "flash" the number. This ensures repeated numbers don't go unnoticed. 
async function flash() {
    iD("memory_line").style.opacity = "0";
    await sleep(100);
    iD("memory_line").style.opacity = "1";
}

function iD(element) {
    return document.getElementById(element);
}

// Rating area

// Fairly self explanatory. Prompts user and checks for numbers. If number, checks for range. If in range, calls addStar()
let ratingPrompt = "What do you rate this website, 1-37?";
function userRating(uPrompt) {
    iD("img_area").textContent = "";
    let rating = prompt(uPrompt);
    if (rating === null) {
        return;
    } else if (isNaN(rating) || rating == "") {
        userRating("That ain't a number, buddy.");
    } else if (!isNaN(rating) && rating < 1) {
        userRating("It can't be that bad. A low score of one is the most I can bear.");
    } else if (!isNaN(rating) && rating > 37) {
        userRating("You flatter me, but high score of 37 is the most I will allow myself to indulge.")
    } else if (rating >= 1 && rating <= 12) {
        alert("Only a " + rating + ", huh? Feels bad.");
        addStars(rating);
    } else if (rating > 12 && rating <= 25) {
        alert("A " + rating + "? Alright, that's not too bad!");
        addStars(rating);
    } else if (rating > 25 && rating <= 36){
        alert("Wow, a " + rating + "! I done did a pretty good job!");
        addStars(rating);
    } else {
        alert("Nice! Perfect score! Thanks for the super impactful rating!");
        addStars(rating);
    }
}

// Creates a div, img, and p element. Img and p element will go inside div. They all change depending on the rating passed through up in userRating()
function addStars(n) {
    const height = 75;
    const width = 75;
    const base = 1;
    const scale = 0.1;
    for (let i = 0; i < n; i++) {
        let newDiv = document.createElement("div");
        let newImg = document.createElement("img");
        let newP = document.createElement("p");
        let divId = "star-box" + (i + 1);
        newDiv.setAttribute("id", divId);
        newImg.setAttribute("src", "Assets/Star.png");
        newImg.setAttribute("alt", "Star");
        newImg.setAttribute("height", height*(base + scale*i));
        newImg.setAttribute("width", width*(base + scale*i));
        newP.innerHTML = i + 1;
        iD("img_area").appendChild(newDiv);
        iD(divId).appendChild(newImg);
        iD(divId).appendChild(newP);
    }
}
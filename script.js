//PROBLEM STATEMENT: Indovinare il numero che utente sta pensando

//1.Quando l'utente clicca su inizia, genero il primo tentativo N da 0 a 100;

//2A. Se N è il numero pensato, l'utente cliccherà su corretto e uscirà un messaggio di successo
//2B. Se N è sbagliato, l'utente cliccherà su uno dei due bottoni
    //2B1. Se L'utente clicca su "troppo basso", il value MIN di range cambia in N, e genero un nuovo  N
    //2B2. Se l'utente clicca su "troppo alto", il value MAX di range cambia in N, e genero un nuovo N

//3. Ripeto STEP2 fino a quando il numero è corretto.


const buttonGroup = document.querySelector(".button-group");
const buttonStart = document.querySelector(".start")
const buttonCorrect = document.querySelector(".correct");
const buttonLow = document.querySelector(".low");
const buttonHigh = document.querySelector(".high");
const buttonRestart = document.createElement("button");

const numberValueDiv = document.querySelector(".illustration-div");
const illustrationStart = document.querySelector(".img-start");
const illustrationRestart = document.querySelector(".img-restart");
const numberValue = document.createElement("p");

let n;
let arrayNumbers = [];
let min;
let max;


// Generate a random number in a range 
function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //return Math.floor((min + max + 1) / 2 )
}

//Change textContent and push n(=random number) in to array
function changeContentAndPush() {
    numberValue.textContent = n;
    numberValue.style.cursor = "auto";
    arrayNumbers.push(n);
}

//disable buttons Low and High
function removeButtons() {
    if((n - 1) == min && (n + 1) == max) {
        if(min != 0 && max != 100) {
        buttonLow.setAttribute('disabled', '');
        buttonHigh.setAttribute('disabled', '');
        }
    }
}

function disableButtonHigh() {
    if(n == max){
        buttonHigh.setAttribute('disabled', '');        
    }
}

function disableButtonLow() {
    if(n == min){
        buttonLow.setAttribute('disabled', '');        
    }
}

//Update n value
function updateN() {
    n = generateNumber(min, max);
    if (arrayNumbers.includes(n)){ 
        //execute generateNumber() until n isn't include in the array
        while(arrayNumbers.includes(n) == true){
        n = generateNumber(min, max)
        removeButtons();
        }
        changeContentAndPush();  
        console.log("sono in while")
    }
    else {
        changeContentAndPush();
        console.log("sono in else")
    }
}

buttonStart.addEventListener("click", 
    function(){
        min = 0;
        max = 100;
        n = generateNumber(min, max);
        changeContentAndPush()
        //replace button and illustration
        buttonLow.style.display = "block";
        buttonHigh.style.display = "block";
        buttonCorrect.style.display = "block";
        buttonStart.style.display = "none";
        illustrationStart.style.display = "none";
        //set numberValue
        numberValueDiv.appendChild(numberValue);
        numberValue.classList.add("number","m-0");
        numberValue.style.lineHeight = 3;
        //set      
        numberValue.setAttribute("aria-live", "assertive")
    })

buttonCorrect.addEventListener("click", function() {
    //hide buttons and number
    buttonLow.style.display = "none";
    buttonHigh.style.display = "none";
    buttonCorrect.style.display = "none";
    numberValue.style.display = "none";
    //set illustration and buttonRestart
    illustrationRestart.style.display = "block";
    buttonGroup.appendChild(buttonRestart);
    buttonRestart.classList.add("button", "button-restart", "mb-4", "mb-md-0");
    buttonRestart.textContent = "Riprova";
})

buttonLow.addEventListener("click", function() {
    //set a new min range
    min = n;
    updateN();  
    removeButtons();
    disableButtonHigh();
    disableButtonLow();
})

buttonHigh.addEventListener("click", function() {
    //set a new max range
    max = n;
    updateN();
    removeButtons;
    disableButtonHigh();
    disableButtonLow();
})

buttonRestart.addEventListener("click",
    function refreshPage(){
        window.location.reload();
    } 
)


import { theEnd } from "./functions.js";
//kod för advergamet fill the cup, eller fill thermos.

let userPoints = 0;
let whichTurn = 0;
let clicks = 0;
let userMedals = 0;
let users = jsonarray;
let turns = [
    {
        //superfart
        speed: 20,
        goal: 200,
        fillColor: "#734a28",
        fill: "coffee",
        fillImage: "beans.png"
    },
    {
        //långsam. tjock smörja
        speed: 50,
        goal: 100,
        fillColor: "#944700",
        fill: "boba",
        fillImage: "boba.png"
    },
    {
        //medelsnabb
        speed: 30,
        goal: 260,
        fillColor: "#efedee",
        fill: "milk",
        fillImage: "milk.png"
    },
    {
        //medelsnabb
        speed: 30,
        goal: 150,
        fillColor: "#cade7a",
        fill: "tea",
        fillImage: "tea-bag.png"
    },
    {
        speed: 20,
        goal: 90,
        fillColor: "#eceff1",
        fill: "sugar",
        fillImage: "sugar.png"
    },

]

export function pickTurn(){
    //5 banor.
    let backupTurns = [
        {
            //superfart
            speed: 20,
            goal: 200,
            fillColor: "brown",
            fill: "coffee",
            fillImage: "coffee.png"
        },
        {
            //långsam. tjock smörja
            speed: 15,
            goal: 100,
            fillColor: "purple",
            fill: "boba",
            fillImage: "boba.png"
        },
        {
            //medelsnabb
            speed: 30,
            goal: 260,
            fillColor: "beige",
            fill: "milk",
            fillImage: "milk.png"
        },
        {
            //medelsnabb
            speed: 30,
            goal: 150,
            fillColor: "bisque",
            fill: "tea",
            fillImage: "tea-bag.png"
        },
        {
            speed: 20,
            goal: 90,
            fillColor: "white",
            fill: "sugar",
            fillImage: "sugar.png"
        },
    
    ]

    //reseta allt
    if (turns.length === 0){
        userPoints = 0;
        whichTurn = 0;
        clicks = 0;
        userMedals = 0;
        turns = [...backupTurns];
    }
        let randomTurn = turns[Math.floor(Math.random()*turns.length)];
        //banan körs
        //snabbhet av vätskan, var linjen är, och vätskans färg
        fillTheCup(randomTurn.speed, randomTurn.goal, randomTurn.fillColor, randomTurn.fill, randomTurn.fillImage);
        
        //ta bort banan från listan
        let removeTurn = turns.findIndex(obj => obj.fillColor === randomTurn.fillColor);
        turns.splice(removeTurn, 1);
    }

//param1: hur snabbt vätskan fylls på. Ju högre tal, desto segare
//param2: var "målet" är. 150 är i mitten av koppen ungefär
//param3: färgen på vätskan som fylls på
//param4: namnet på färgen/vätskan
function fillTheCup(speed, goal, fillColor, fillText, fillImage){
    let FILLbtn = document.querySelector(".cup");
    let fill = document.querySelector(".fill");
    let line = document.querySelector(".line");
    let intervalFill;
    FILLbtn.style.pointerEvents = "all";

    //ingrediens
    let ingredientsDIV = document.querySelector("#ingredients");
    let ingredientsText = document.querySelector("#fillText");
    ingredientsText.innerHTML = fillText;
    ingredientsDIV.style.backgroundImage = `url(assets/images/fill/${fillImage})`;

    //linjen av koppen
    fill.style.height = "0px";
    fill.style.background = fillColor;
    line.style.bottom = "0px";
    line.style.bottom = goal + "px";

    FILLbtn.addEventListener("mousedown", (e) => {
        let height = 0;
        clicks++
        e.stopImmediatePropagation();
        
        intervalFill = setInterval(() => {
            height = height + 10;
            fill.style.height = height + "px";
        }, speed);

        setTimeout(() => {
            nextTurn();
        }, 2500);
    })

        //stannar om vätskan blir mer än koppens höjd
        //offsetheight ska ändras om koppens höjd ändras.
        setInterval(() => {
            if(fill.offsetHeight >= 270){
                clearInterval(intervalFill);
                setTimeout(() => {
                    fill.style.height = "0px";
                }, 1000);
                showTurnPoints("OVERFLOW", "darkorange", "");
            }
        }, speed);

    FILLbtn.addEventListener("mouseup", (e) => {
        FILLbtn.style.pointerEvents = "none";
        let fillHeight = fill.offsetHeight -3;
        clearInterval(intervalFill);
        e.stopImmediatePropagation();

        //skickar med var användaren stannade
        //gentemot var linjen är
        checkResults(fillHeight, goal)
    })
}

function updateProgressBar(pointsInWidth){
    let progressBar = document.querySelector("#progressBar");
    progressBar.style.width = pointsInWidth + "px";
}

//räknar ut hur mycket poäng användaren får
//när linje & fyllning jämförs
function checkResults(fill, goal){
    let plusPoints = 0;
    let line = document.querySelector(".line");
    let lineNumber = line.style.bottom.replaceAll("px", "");
    let filling = document.querySelector(".fill");
    goal = lineNumber;
    console.log("fill", fill);
    console.log("goal", goal);

        if(fill > goal){
        //fyllningen är mer än linjen
        let difference = fill - goal;
        if(difference === 0){
            plusPoints = 100;
            userMedals = userMedals + 1;
        }else if(difference >= 100
            || fill === 270){
            plusPoints = -100;
        }else if (difference >= 51){
            plusPoints = -10;
        }else if (difference === 40){
            plusPoints = 10;
        }else if (difference === 30){
            plusPoints = 20;
        }else if (difference === 20){
            plusPoints = 30;
        } 
        else if (difference === 10){
            plusPoints = 50;
        } 
    } else{
        //fyllningen är mindre än linjen
        let difference = goal - fill;
        if(difference === 0){
            //exakt på linjen. Högst poäng
            plusPoints = 100;
            userMedals = userMedals + 1;
        //}else if(filling == 270){
        //    plusPoints = -100;
        }else if(difference >= 150
            || fill === 270){
            plusPoints = -100;
        }else if (difference >= 51){
            plusPoints = 10;
        }else if (difference === 40){
            plusPoints = 20;
        }else if (difference === 30){
            plusPoints = 40;
        }else if (difference === 20){
            plusPoints = 60;
        } 
        else if (difference === 10){
            plusPoints = 80;
        } 
    }
    if (plusPoints > 0){
        showTurnPoints(plusPoints, "white", "+");
    } else {
        showTurnPoints(plusPoints, "darkorange", "");
    }

    console.log("pluspoints", plusPoints);
    //uppdaterar användarens poäng
    userPoints = userPoints + plusPoints;
    updateUserPoints(userPoints);
    updateProgressBar(userPoints);
    updateMedals(userMedals);
    return plusPoints;
}

function updateUserPoints(userPoints){
    let turnPointsDIV = document.querySelector(".turnPointsDIV");
    let userPointsSPAN = document.querySelector("span");
    userPointsSPAN.classList.add("userPoints");

    userPointsSPAN.innerHTML = `TOTAL: ${userPoints}`;

    turnPointsDIV.append(userPointsSPAN);
}

export function updateMedals(nmOfMedals){
    let medalContainer = document.querySelector("#medalContainer");
    medalContainer.innerHTML = "";

    if(userMedals === 4){
        //gör inget, högst 3 medaljer :DDD
        return;
    } else {
        for (let index = 0; index < nmOfMedals; index++) {
            //annars lägg till en medalj
            let oneMedal = document.createElement("div");

            oneMedal.innerHTML = "<img src='../assets/images/fill/star-medal.png' class='medalPic'>";
            oneMedal.classList.add("oneMedal");

            medalContainer.append(oneMedal);
        }
    }
}

function showTurnPoints(points, textcolor, symbol){
    let oneTurnPoints = document.createElement("div");
    let turnPointsDIV = document.querySelector(".turnPointsDIV");
    oneTurnPoints.classList.add("oneTurnPoints");
    turnPointsDIV.classList.add("turnPointsDIV");
    oneTurnPoints.innerHTML = "";
    oneTurnPoints.style.color = textcolor;

    if(points === "OVERFLOW"){
        console.log("OVERFLOW");
        oneTurnPoints.style.left = "220px";
        oneTurnPoints.style.top = "100px";
        oneTurnPoints.style.zIndex = "101";
    }

    oneTurnPoints.innerHTML = symbol + points;
    turnPointsDIV.append(oneTurnPoints);

    setTimeout(() => {
        oneTurnPoints.remove();
    }, 1500);    
}

//all base-elements in fillthecup advergame. not interactive
export function elementsDOM(){
    let fillAdvergameWrapper = document.querySelector(".fillAdvergameWrapper")
    fillAdvergameWrapper.innerHTML = "";

    fillAdvergameWrapper.innerHTML = `
        <div class="turnPointsDIV snowfall"></div>
        <div id="topElements">
            <div id="ingredients">
                <span></span>
                <span id="fillText"></span>
            </div>
            <div id="progressContainer">
                <div id="progressBar"></div>
            </div>
            <div id="medalContainer">
                <span></span>
            </div>
        </div>
        <div id="bottomElements">
            <div class="btnContainer">
            </div>
            <div class="cup">
                <div class="fill"></div>
                <div class="line"></div>
            </div>
            <div></div>
        </div>
    `;
}

function nextTurn(){
    //nästa bana. Om användaren kört 5st 
    //avslutas spelet.
    whichTurn = whichTurn + 1;
    if(whichTurn === 5){
        //ta fram slutet o sånt
        theEnd("Cupcius", userPoints, "/assets/images/fill/cupciusLogo.png");
    } else {
        let FILLbtn = document.querySelector(".cup");
        let nextBtn = document.createElement("button");

        nextBtn.classList.add("nextBtn");
        nextBtn.innerHTML = "NEXT LEVEL ->";

        document.querySelector(".turnPointsDIV").append(nextBtn);

        document.querySelector(".nextBtn").addEventListener("click", () => {
            document.querySelector(".nextBtn").remove();
            pickTurn();
        })
    }
}


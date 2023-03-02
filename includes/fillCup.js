let userPoints = 0;
let whichTurn = 0;
let clicks = 0;
//från php
let users = jsonarray;

let turns = [
    {
        //superfart
        speed: 20,
        goal: 200,
        fillColor: "brown",
        fill: "coffee"
    },
    {
        //långsam. tjock smörja
        speed: 50,
        goal: 100,
        fillColor: "purple",
        fill: "blueberry soup"
    },
    {
        //medelsnabb
        speed: 30,
        goal: 260,
        fillColor: "steelblue",
        fill: "water"
    },
    {
        //medelsnabb
        speed: 30,
        goal: 150,
        fillColor: "lightbrown",
        fill: "tea"
    },
    {
        speed: 20,
        goal: 90,
        fillColor: "yellow",
        fill: "gingershot"
    },

]

startPage();


function pickTurn(){
    //5 banor.
    let backupTurns = [
        {
            //superfart
            speed: 20,
            goal: 200,
            fillColor: "brown",
            fill: "coffee"
        },
        {
            //långsam. tjock smörja
            speed: 50,
            goal: 100,
            fillColor: "purple",
            fill: "blueberry soup"
        },
        {
            //medelsnabb
            speed: 30,
            goal: 260,
            fillColor: "steelblue",
            fill: "water"
        },
        {
            //medelsnabb
            speed: 30,
            goal: 150,
            fillColor: "lightbrown",
            fill: "tea"
        },
        {
            speed: 20,
            goal: 90,
            fillColor: "yellow",
            fill: "gingershot"
        },
    
    ]

    //reseta allt
    if (turns.length === 0){
        userPoints = 0;
        whichTurn = 0;
        clicks = 0;
        turns = [...backupTurns];
    }

        let randomTurn = turns[Math.floor(Math.random()*turns.length)];

        //banan körs
        //snabbhet av vätskan, var linjen är, och vätskans färg
        fillTheCup(randomTurn.speed, randomTurn.goal, randomTurn.fillColor);
        
        //ta bort banan från listan
        let removeTurn = turns.findIndex(obj => obj.fillColor === randomTurn.fillColor);
        turns.splice(removeTurn, 1);
    }


//param1: hur snabbt vätskan fylls på. Ju högre tal, desto segare
//param2: var "målet" är. 150 är i mitten av koppen ungefär
//param3: färgen på vätskan som fylls på
function fillTheCup(speed, goal, fillColor){
    let FILLbtn = document.querySelector("#fill");
    let fill = document.querySelector(".fill");
    let line = document.querySelector(".line");
    let intervalFill;

    fill.style.height = "0px";
    fill.style.backgroundColor = fillColor;
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
        }, 3500);
    })

        //stannar om vätskan blir mer än koppens höjd
        setInterval(() => {
            if(fill.offsetHeight === 270){
                clearInterval(intervalFill);
                setTimeout(() => {
                    fill.style.height = "0px";
                }, 2000);
            }
            //OVERFLOW!!
        }, speed);

    FILLbtn.addEventListener("mouseup", (e) => {
        let fillHeight = fill.offsetHeight;
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
    goal = lineNumber;
    console.log("goal", goal);

        if(fill > goal){
        //fyllningen är mer än linjen
        let difference = fill - goal;
        if(difference === 0){
            plusPoints = 100;
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
    } else{
        //fyllningen är mindre än linjen
        let difference = goal - fill;
        if(difference === 0){
            //exakt på linjen. Högst poäng
            plusPoints = 100;
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
    //uppdaterar användarens poäng
    userPoints = userPoints + plusPoints;
    updateUserPoints(userPoints);
    showTurnPoints(plusPoints);
    updateProgressBar(userPoints);  

    return plusPoints;
}

function updateUserPoints(userPoints){
    let pointsDIV = document.querySelector("#points");
    pointsDIV.innerHTML = userPoints;
}

function showTurnPoints(points){
    let oneTurnPoints = document.createElement("div");
    let turnPointsDIV = document.querySelector(".turnPointsDIV");
    oneTurnPoints.classList.add("oneTurnPoints");
    turnPointsDIV.classList.add("turnPointsDIV");

    oneTurnPoints.innerHTML = "";
    oneTurnPoints.innerHTML = points;

    turnPointsDIV.append(oneTurnPoints);

    setTimeout(() => {
        oneTurnPoints.remove();
    }, 2500);

}

//all base-elements in fillthecup advergame. not interactive
function elementsDOM(){
    let fillAdvergameWrapper = document.querySelector(".fillAdvergameWrapper")
    fillAdvergameWrapper.innerHTML = "";

    fillAdvergameWrapper.innerHTML = `
        <div class="turnPointsDIV"></div>
        <div id="topElements">
            <div id="ingredients"></div>
            <div id="progressContainer">
                <div id="progressBar"></div>
            </div>
            <div id="points"></div>
        </div>
        <div id="bottomElements">
            <div class="btnContainer">
                <button id="fill">POUR!</button>
            </div>
            <div id="cup">
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
    console.log(whichTurn);
    if(whichTurn === 5){
        //ta fram leaderboard o sånt
        theEnd();
    } else {

        let nextBtn = document.createElement("button");

        nextBtn.classList.add("nextBtn");
        nextBtn.innerHTML = "NEXT LEVEL";

        document.querySelector(".turnPointsDIV").append(nextBtn);

        document.querySelector(".nextBtn").addEventListener("click", () => {
            document.querySelector(".nextBtn").remove();
            pickTurn();
        })
    }
}

function theEnd(){
    let gameDIV = document.querySelector(".fillAdvergameWrapper");

    gameDIV.innerHTML = `
        <div class="topEnd">
            <h2>MUG GAME</h2>
        </div>
        <div class="middleEnd">
            <h4>YOUR RESULTS</h4>
            <div>
                <div class="medal"></div>
                <div class="medal"></div>
                <div class="medal"></div>
            </div>
        </div>
        <div class="bottomEnd">
            <h5>ENTER NAME HERE TO LEADERBOARD: </h5>
            <input class="addName" type="text"> 
            <button id="sendName">ADD</button>
        </div>
        <div>
            <h5>OR PLAY AGAIN</h5>
            <button class="again">PLAY AGAIN</button>
        </div>
    `;

    document.querySelector("#sendName").addEventListener("click", () => {
        let empty = true;
        let addName = document.querySelector(".addName");

        let oneUser = {
            userName: addName.value,
            points: userPoints
        }
        users.push(oneUser);

        if(addName.value.length <= 0){
            empty = true;
        } else {
            empty = false;
        }

        if (empty === true){
            document.querySelector(".addName").style.border = "2px solid red";
            //ERROR kod för att inputen är tom

        }else {
            const data = {users};
            const req = new Request("../db/server.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json"}
        })

        fetch(req).then(response => response);

        setTimeout(() => {
            //väntar lite innan användaren skickas till startpage
            startPage();
        }, 2500);
        }
    })

    document.querySelector(".again").addEventListener("click", () => {
        //kom till startsidan
        startPage();
    })

}

function startPage(){
    let videoNGameDIV = document.querySelector("#videoNGame");
    videoNGameDIV.innerHTML = "";
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");

    fillAdvergameWrapper.innerHTML = "";
    fillAdvergameWrapper.innerHTML = `
        <div class="topStart">
            <h2>MUG GAME</h2>
            <h5>Fill the mug with enough ingredients and win points</h5>
        </div>
        <div class="middleStart">
            <div id="leaderboardWrapper">
                <h5>TOP TEN PLAYERS</h5>
                <div id="userList"></div>
            </div>
            <div id="cup"></div>
            <div></div>
        </div>
        <div class="bottomStart">
            <h3>PRESS <button id="start">HERE</button> TO START</h3>
        </div>
    `;

    document.querySelector("#videoNGame").append(fillAdvergameWrapper);

    leaderboardDIV();

    //and so it begins
    document.querySelector("#start").addEventListener("click", () => {
        elementsDOM();
        pickTurn();
    })


}

function leaderboardDIV(){
    let userList = document.querySelector("#userList");
    let index = 0;

    users.forEach(element => {
        index = index + 1
        let userDIV = document.createElement("div");
        userDIV.classList.add("userDIV");
        userDIV.innerHTML = index + ". " + element.userName;

        userList.append(userDIV);
    });
}



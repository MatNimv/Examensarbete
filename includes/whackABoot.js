//import { theEnd } from "./functions.js";

console.log("whack.js");

let link = linkToSend;
if (link == 2){
    startPage("FILL THERMOS",
    "Click and hold on the cup to fill it with ingredients, if you hit the mark you get full points!",
    "cup"
);
} else if (link == 1){

    startPage("Whack A Boot",
    "Stomp the invanders",
    "boot");
}

export function whackAMole(){
    const holes = document.querySelectorAll('.hole');
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.querySelector('.userPoints');
    let timeUp = false;
    let userPoints = 0;
    //in seconds
    let gameTime = 100;

    document.querySelector("#startGame").addEventListener("click", () => {
        document.querySelector("#startGame").remove();
        startGame();
        timerDIV();

        //skon följer användarens mus
        let gameWrapper = document.querySelector("#gridWrapper")
        document.querySelector(".boot").classList.add("floatBoot");
        let boot = document.querySelector('.boot');
        const onMouseMove = (e) =>{
            boot.style.left = e.pageX + 'px';
            boot.style.top = e.pageY + 'px';
        }
        document.addEventListener('mousemove', onMouseMove);

        //skon ska rotera när man klickar på moles
        gameWrapper.addEventListener("click", () => {
            boot.style.background = "url(assets/images/whack/bootRotated.png)";
            boot.style.backgroundSize = "cover";

            setTimeout(() => {
                boot.style.background = "url(assets/images/whack/boot.png)";
                boot.style.backgroundSize = "cover";
            }, 300);
        })
    })

    function randomTime(min, max) { 
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];

        //bestäm vilken bild som ska dyka upp
        let element = hole.firstElementChild;
        let randCreature = whichCreature(element);
        element.style.background = `url(assets/images/whack/${randCreature}.svg) bottom center no-repeat`;
        element.style.backgroundSize = "50%";

        return hole;
    }

    function peep() {
        const time = randomTime(900, 1500);
        const hole = randomHole(holes);
        hole.classList.add('up');

        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        scoreBoard.textContent = "Your Score: " + 0;
        timeUp = false;
        userPoints = 0;
        peep();
        let realGameTime = `${gameTime}` + "000";
        setTimeout(() => timeUp = true, realGameTime)
    }

    holes.forEach(hole => hole.addEventListener('click', (e) => {
        if(!e.isTrusted) return; 
        e.target.parentNode.classList.remove('up');
        scoreBoard.textContent = "Your Score: " + userPoints;
        let creatureClick = e.target;

        if(hole.classList.contains("up")){
            console.log("up");
            giveOrTake(creatureClick);
        }
        else{
            //användaren ser att de missade
            let overlay = document.querySelector(".turnPointsDIV");
            let missAlert = document.createElement("span");
            missAlert.classList.add("miss");
            missAlert.innerHTML = "MISS!"
            overlay.append(missAlert);

            setTimeout(() => {
                missAlert.remove();
            }, 1000);

            let floatBootPlace = document.querySelector(".floatBoot")
            var rect = floatBootPlace.getBoundingClientRect();
            missAlert.style.left = rect.left - 170 + "px";
            missAlert.style.top = rect.top + "px";
        }
    }));   
    
    function timerDIV(){
        var timeleft = gameTime;
        var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Finished";
            setTimeout(() => {
                theEnd("Canada Boots Company", userPoints);
            }, 3000);
        } else {
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
        }, 1000);
    }

    function giveOrTake(element){
        let overlay = document.querySelector(".turnPointsDIV");
        let showPoints = document.createElement("div");
        showPoints.classList.add("showPoints");
        console.log(element);
        //ge poäng
        if (element.firstElementChild.classList.contains("friendPurple")
        || element.firstElementChild.classList.contains("friendRed")){
            userPoints = userPoints - 1
            showPoints.innerHTML = "-1";
        //ta poäng
        }else if(element.firstElementChild.classList.contains("monsterRed" 
        || element.firstElementChild.classList.contains("monsterPurple"))){
            userPoints = userPoints + 1
            showPoints.innerHTML = "+1";
        }
        overlay.append(showPoints);
        setTimeout(() => {
            showPoints.remove();
        }, 1000);
    }

    function whichCreature(element){
        let creaturePopUps = ["monsterPurple", "monsterRed", "friendRed", "friendPurple"];
        let randCreaturePopUps = creaturePopUps[Math.floor(Math.random()*creaturePopUps.length)];

        if (element.classList.contains("friendPurple")){
            element.classList.remove("friendPurple");
        }
        else if (element.classList.contains("friendRed")){
            element.classList.remove("friendRed");
        }
        else if(element.classList.contains("monsterRed")){
            element.classList.remove("monsterRed");
        } 
        else if(element.classList.contains("monsterPurple")){
            element.classList.remove("monsterPurple");
        }
        element.classList.add(randCreaturePopUps);

        return randCreaturePopUps;
    }
}

export function whackElementsDOM(){
    let fillAdvergameWrapper = document.querySelector(".fillAdvergameWrapper")
    fillAdvergameWrapper.innerHTML = "";

    fillAdvergameWrapper.innerHTML = `
        <div class="turnPointsDIV"></div>
        <div id="topElements">
            <div id="pointsDIV">
                <span class="userPoints"></span>
            </div>
            <div id="progressContainer">
                <div id="progressBar"></div>
                <span>Your progress</span>
            </div>
        </div>
        <div id="middleElements">
            <div class="boot"></div>
            <button id="startGame">START</button>
            <div id="timer"></div>
        </div>
        <div id="gridWrapper">
            <div id="holeWrapper">
                <div class="hole hole1">
                    <div class="mole"></div>
                </div>
                <div class="hole hole2">
                    <div class="mole"></div>
                </div>
                <div class="hole hole3">
                    <div class="mole"></div>
                </div>
                <div class="hole hole4">
                    <div class="mole"></div>
                </div>
                <div class="hole hole5">
                    <div class="mole"></div>
                </div>
                <div class="hole hole6">
                    <div class="mole"></div>
                </div>
            </div>
        </div>
    `;

}



export function startPage(game, description, gameThing){
    let videoNGameDIV = document.querySelector("#videoNGame");
    videoNGameDIV.innerHTML = "";
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");

    fillAdvergameWrapper.innerHTML = "";
    fillAdvergameWrapper.innerHTML = `
        <div class="topStart">
            <h2 class="mugGameTitle">${game}</h2>
            <h5 class="mugGameInstructions">${description}</h5>
        </div>
        <div class="middleStart">
            <div id="leaderboardWrapper">
                <h5 class="topten">TOP TEN PLAYERS</h5>
                <div id="userList"></div>
            </div>
            <div id="${gameThing}"></div>
            <div></div>
        </div>
        <div class="bottomStart">
            <h3>LET'S GET <button id="start">STARTED</button></h3>
        </div>
    `;

    document.querySelector("#videoNGame").append(fillAdvergameWrapper);

    leaderboardDIV();
    //and so it begins

    document.querySelector("#start").addEventListener("click", () => {
        let link = linkToSend;
        if (link == 2){
            elementsDOM();
            pickTurn();
        } else if (link == 1){
            whackElementsDOM();
            whackAMole();
        }
    })
}

export function theEnd(title, points){
    let gameDIV = document.querySelector(".fillAdvergameWrapper");

    gameDIV.innerHTML = `
    <div class="endWrapper">
        <div class="topEnd">
            <h2 class="companyEndName">${title}</h2>
        </div>
        <div class="middleEnd">
            <h4 class="yourResults">YOUR RESULTS: ${points}</h4>
            <div id="medalContainer">
            </div>
        </div>
        <div class="bottomEnd">
            <h5 class="enterNameText">JOIN THE LEADERBOARD</h5>
            <input class="addName" type="text" placeholder="ENTER NAME HERE"> 
            <button id="sendName">ADD</button>
        </div>
        <div>
            <h5 class="orPlayAgain">OR</h5>
            <button class="again">PLAY AGAIN</button>
        </div>
    </div>
    `;
    let link = linkToSend;
    let userMedals;
    if (link === 2){
        if (points >= 100){
            userMedals = 1
        }
        else if (points >= 200){
            userMedals = 2
        }
        else if (points >= 200){
            userMedals = 3
        }
        updateMedals(userMedals);
    }

    document.querySelector("#sendName").addEventListener("click", () => {
        let link = linkToSend;
        let users = jsonarray;
        console.log(points);
        let empty = true;
        let addName = document.querySelector(".addName");

        let oneUser = {
            userName: addName.value,
            points: points
        }

        if(addName.value.length <= 0){
            empty = true;
            document.querySelector(".addName").style.border = "2px solid red";
        } else {
            empty = false;
            document.querySelector(".addName").style.border = "none";

            users.push(oneUser);
            if (link === 2){
                let fillGame = [];
                fillGame.push(users);
            }else {
                let whackGame = [];
                whackGame.push(users);
            }
        }

        if (empty === false){
            let data;
            if (link === 2){
                let fillGame = [];
                fillGame.push(users);
                data = {fillGame};
            }else {
                let whackGame = [];
                whackGame.push(users);
                data = {whackGame};
            }
            
            const req = new Request("../db/server.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json"}
        })

        fetch(req).then(response => response);

        setTimeout(() => {
            if (link === 2){
                //väntar lite innan användaren skickas till startpage
                startPage("FILL THERMOS", 
                "Click and hold on the cup to fill it with ingredients, if you hit the mark you get full points!",
                "cup"
            );
            }else if (link == 1){
                startPage("Whack A Boot",
                "Stomp the invanders",
                "boot");
                }
        }, 2000);
        }
    })

    document.querySelector(".again").addEventListener("click", () => {
        if (link == 2){
            //kom till startsidan
            startPage("Fill The Cup", 
            "Fill the mug with enough ingredients and win points",
            "cup");
        } else if (link == 1) {
            startPage("Whack A Boot",
            "Stomp the invanders",
            "boot");
        }
    })
}


function sortByProperty(a, b){
    if ( a.points < b.points ){
        return 1;
    }
    if ( a.points > b.points ){
        return -1;
    }
    return 0;
    }

export function leaderboardDIV(){
    let userList = document.querySelector("#userList");
    let leaderBoardUsers = jsonarray;
    let sortedUsers = leaderBoardUsers.sort(sortByProperty);
    
    for (let index = 1; index < 11; index++) {
        const element = sortedUsers[index];
        
        let userDIV = document.createElement("div");
        userDIV.classList.add("userDIV");

        if(element === undefined){
            userDIV.innerHTML = `<span class="userName">${index}. </span><span class="userPoints"></span> `;
        }else {
            userDIV.innerHTML = `<span class="userName">${index}. ${element.userName}: </span class="userPoints"><span> ${element.points}</span>`; 
        }
        userList.append(userDIV);
    }
}

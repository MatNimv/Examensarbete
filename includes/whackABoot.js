import { skipAd, addVideo } from "./functions.js";

let seconds = 0;
setInterval(() => {
    seconds++
}, 1000);

let link = linkToSend;
if (link == 1){

    startPage("Whack A Boot",
    "",
    "boot");

    skipAd();

    setTimeout(() => {
        document.querySelector(".skipping").addEventListener("click", () => {
            document.querySelector(".skipping").remove();
            addVideo();
            //när användaren skippar ska timern för hen avslutas.
            let data;
            let whack = [];
            whack.push(seconds);
            data = {whack};
    
            const req = new Request("../db/server.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json"}
            })
    
            fetch(req).then(response => response);
            })
    }, 11000);
    
}

export function whackAMole(){
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.userPoints');
    let timeUp = false;
    let userPoints = 0;
    let lastHole;
    //in seconds
    let gameTime = 20;
    let creaturePopUps = [
        "monsterPurple","monsterPurple","monsterPurple","monsterPurple","monsterPurple",
        "monsterRed","monsterRed","monsterRed","monsterRed","monsterRed",
        "friendRed","friendRed","friendRed","friendRed","friendRed",
        "friendPurple","friendPurple","friendPurple","friendPurple"];

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

        if (hole === lastHole){
            return randomHole(holes);
        }
        lastHole = hole;


        //bestäm vilken bild som ska dyka upp
        let element = hole.firstElementChild;
        let randCreature = whichCreature(element);
        element.style.background = `url(assets/images/whack/${randCreature}.svg) bottom center no-repeat`;
        element.style.backgroundSize = "50%";
        
        return hole;

    }

    function peep() {
        const time = randomTime(900, 1500);
        let hole = randomHole(holes);
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
        let creatureClick = e.target;

        if(hole.classList.contains("up")){
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
                theEnd("Canada Boots Company", userPoints, "/assets/images/whack/canadabootsLogo.png", "whack");
            }, 3000);
        } else {
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
        }, 1000);
    }
    let userMedals = 0;

    function updateMedals(){
        let medalContainer = document.querySelector("#medalContainer");
        medalContainer.innerHTML = "";
        
        if (userPoints == 14){
            userMedals = userMedals + 1;
        } else if (userPoints == 10){
            userMedals = userMedals + 1;
        } else if(userPoints == 4){
            userMedals = userMedals + 1;
        }

        if(userPoints < 14 && userMedals === 3){
            userMedals = userMedals - 1;
        } else if(userPoints < 10 && userMedals === 2){
            userMedals = userMedals - 1;
        } else if (userPoints < 4 && userMedals === 1){
            userMedals = userMedals - 1;
        }
    
        for (let index = 0; index < userMedals; index++) {
            //annars lägg till en medalj
            let oneMedal = document.createElement("div");
        
            oneMedal.innerHTML = "<img src='../assets/images/fill/star-medal.png' class='medalPic'>";
            oneMedal.classList.add("oneMedal");
        
            medalContainer.append(oneMedal);
            }
        }

    function giveOrTake(element){
        let overlay = document.querySelector(".turnPointsDIV");
        let showPoints = document.createElement("div");
        showPoints.classList.add("showPoints");
        //ge poäng
        if (element.firstElementChild.classList.contains("friendPurple")
        || element.firstElementChild.classList.contains("friendRed")){
            userPoints = userPoints - 4;
            showPoints.innerHTML = "-4";
        //ta poäng
        }else if(element.firstElementChild.classList.contains("monsterRed") 
        || element.firstElementChild.classList.contains("monsterPurple")){
            userPoints = userPoints + 2
            showPoints.innerHTML = "+2";
        }

        let floatBootPlace = document.querySelector(".floatBoot")
        var rect = floatBootPlace.getBoundingClientRect();
        showPoints.style.left = rect.left - 110 + "px";
        showPoints.style.top = rect.top + "px";

        scoreBoard.textContent = "Your Score: " + userPoints;

        overlay.append(showPoints);
        setTimeout(() => {
            showPoints.remove();
        }, 1000);

        updateMedals();
    }

    function whichCreature(element){

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
        

        let specificCreat = creaturePopUps.findIndex(elem => (elem == randCreaturePopUps));
        creaturePopUps.splice(specificCreat, 1);

        element.classList.add(randCreaturePopUps);

        return randCreaturePopUps;
    }

    
    function theEnd(title, points, logo, thanklink){
        let gameDIV = document.querySelector(".fillAdvergameWrapper");
        gameDIV.innerHTML = `
        <div class="endWrapper snowfall">
            <div class="topEnd">
                <h2 class="companyEndName">Created for <a href="thanks.php?advergame=${thanklink}">${title}</a></h2>
            </div>
            <div class="middleEnd">
                <h4 class="yourResults">YOUR RESULTS: ${points} points!</h4>
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
            <div class="logoDiv">
                <a href="thanks.php?advergame=whack"><img class="logo" src="${logo}"></a>
            </div>
        </div>
        `;
        let link = linkToSend;
        updateMedals();
    
        document.querySelector("#sendName").addEventListener("click", () => {
            let users = jsonarray;
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
                    startPage("Whack A Boot",
                    "",
                    "boot");
                    document.querySelector(".fillAdvergameWrapper").remove();
            }, 2000);
    }
})

    document.querySelector(".again").addEventListener("click", () => {
            startPage("Whack A Boot",
            "",
            "boot");
            document.querySelector(".fillAdvergameWrapper").remove();
        })

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
            </div>
            <div id="medalContainer">
                <span></span>
            </div>
        </div>
        <div id="middleElements">
            <div class="gameInstructions">Hover the boot over the invaders, click to stomp them and earn points! Be careful not to hit the friendly squirrels though.</div>
            <div class="boot"></div>
            <button id="startGame">START</button>
            <div id="timer"></div>
            <a href="thanks.php?advergame=whack"><div class="logoSecondPage"></div></a>
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



function startPage(game, description, gameThing){
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");
    fillAdvergameWrapper.classList.add("snowfall");

    fillAdvergameWrapper.innerHTML = "";
    fillAdvergameWrapper.innerHTML = `
        <div class="topStart">
            <div class="promoMsg">This game is created by Canada Boots Company</div>
            <a href="thanks.php?advergame=whack"><div class="logoFirstPage"></div></a>
            <h2 class="gameTitle">${game}</h2>
            <h5 class="gameInstructions">${description}</h5>
        </div>
        <div class="middleStart">
            <div id="leaderboardWrapper">
                <h5 class="topten">TOP TEN PLAYERS</h5>
                <div class="userList"></div>
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
        if (link == 2){
            elementsDOM();
            pickTurn();
        } else if (link == 1){
            whackElementsDOM();
            whackAMole();
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

function leaderboardDIV(){
    let userList = document.querySelector(".userList");
    let leaderBoardUsers = jsonarray;
    let sortedUsers = leaderBoardUsers.sort(sortByProperty);
    
    for (let index = 0; index < 10; index++) {
        const element = sortedUsers[index];
        
        let numb = index + 1;

        let userDIV = document.createElement("div");
        userDIV.classList.add("userDIV");

        if(element === undefined){
            userDIV.innerHTML = `<span class="userName">${numb}. </span><span class="userPoints"></span> `;
        }else {
            userDIV.innerHTML = `<span class="userName">${numb}. ${element.userName}: </span class="userPoints"><span> ${element.points}</span>`; 
        }
        userList.append(userDIV);
    }
}

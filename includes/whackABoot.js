import { startPage, theEnd } from "./fillCup.js";


startPage("Whack A Boot",
"Stomp the invanders",
"boot");

setTimeout(() => {
    skipAd();
}, 5000);


export function whackAMole(){
    const holes = document.querySelectorAll('.hole');
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.querySelector('.userPoints');
    let timeUp = false;
    let userPoints = 0;
    let gameTime = 200;

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
            console.log("klick på grid");
            boot.style.background = "url(assets/images/whack/bootRotated.png)";
            boot.style.backgroundSize = "cover";

            setTimeout(() => {
                console.log("timeout");
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
        const time = randomTime(700, 1500);
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

    moles.forEach(mole => mole.addEventListener('click', (e) => {
        if(!e.isTrusted) return; 
        e.target.parentNode.classList.remove('up');
        scoreBoard.textContent = "Your Score: " + userPoints;
        let creatureClick = e.target;
        console.log("click mole");
        giveOrTake(creatureClick, userPoints);
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
        overlay.innerHTML = "";
        //ge poäng
        if (element.classList.contains("friendPurple")
        || element.classList.contains("friendRed")){
            userPoints = userPoints - 1
            showPoints.innerHTML = "-1";
        //ta poäng
        }else if(element.classList.contains("monsterRed" 
        || element.classList.contains("monsterPurple"))){
            userPoints = userPoints + 1
            showPoints.innerHTML = "+1";
        }
        overlay.append(showPoints);
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


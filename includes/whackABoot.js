import { startPage, theEnd } from "./fillCup.js";


startPage("Whack A Boot",
"Stomp the invanders",
"boot");


export function whackAMole(){
    const holes = document.querySelectorAll('.hole');
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.querySelector('.userPoints');
    let timeUp = false;
    let userPoints = 0;
    let gameTime = 20;

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

        //skon ska rotera när man klickar på mole
        gameWrapper.addEventListener("click", () => {
            console.log("click på grid");
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
        return hole;
    }

    function peep() {
        const time = randomTime(200, 1000);
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
        userPoints++;
        e.target.parentNode.classList.remove('up');
        scoreBoard.textContent = "Your Score: " + userPoints;
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


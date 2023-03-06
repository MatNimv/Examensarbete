import { startPage, leaderboardDIV } from "./fillCup.js";


startPage("Whack A Boot",
"Stomp the invanders",
"boot");


export function whackAMole(){
    const holes = document.querySelectorAll('.hole');
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.querySelector('.userPoints');
    let timeUp = false;
    let score = 0;

    document.querySelector("#startGame").addEventListener("click", () => {
        document.querySelector("#startGame").remove();
        startGame();
    })

    function randomTime(min, max) { 
        return Math.round(Math.random() * (max - min) + min);
    }


    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        console.log(hole);
        return hole;
    }

    function peep() {
        const time = randomTime(10000, 20000);
        const hole = randomHole(holes);
        console.log("hole: " + hole);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        peep();
        setTimeout(() => timeUp = true, 20000)
    }

    moles.forEach(mole => mole.addEventListener('click', (e) => {
        console.log("hallå");
        if(!e.isTrusted) return; 
        console.log("hej");
        score++;
        e.target.parentNode.classList.remove('up');
        console.log(e.target);
        scoreBoard.textContent = score;
    }));
    
    //for (let index = 0; index < moles.length; index++) {
    //    moles[index].addEventListener("click", (e) => {
    //        e.stopPropagation();
    //        if(!e.isTrusted) return; 
    //        score++;
    //        this.parentNode.classList.remove('up');
    //        console.log(e.target);
    //        scoreBoard.textContent = score;
    //    })
    //    
    //}
    
    
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
            <img class="boot" src="assets/images/userPics/user5.png">
            <button id="startGame">START</button>
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


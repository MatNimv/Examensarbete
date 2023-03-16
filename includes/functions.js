import { elementsDOM, pickTurn, updateMedals } from "./fillCup.js"
import { whackElementsDOM, whackAMole } from "./whackABoot.js"
//gemensamma funktioner för index.php och video.php
let users = jsonarray;

let link = linkToSend;
if (link == 2){
    startPage("FILL THERMOS",
    "Click and hold on the cup to fill it with ingredients, if you hit the mark you get full points!",
    "cup"
);
} else if (link == 1){

    startPage("WHACK A BOOT",
    "Hover the boot over the invaders and click and stomp them to earn points.",
    "boot");
}

setTimeout(() => {
    skipAd();
}, 5000);

export function videoDOM(title, thumbnail, user, link){
    let videoWrapper = document.createElement("div");

    videoWrapper.classList.add("videoWrapper");

    videoWrapper.innerHTML = `
        <a href="${link}"><div class="thumbnail"><img src="${thumbnail}"></div></a>
        <div class="userNtitle">
            <div class="videoUser"><img src="${user}"></div>
            <a href="${link}"><span class="videoTitle">${title}</span></a>
        </div>
    `;

    document.querySelector("#allVideosWrapper").append(videoWrapper);
}

export function categoryDOM(title){
    let categoryWrapper = document.createElement("div");
    categoryWrapper.classList.add("categoryWrapper");

    categoryWrapper.innerHTML = `
        <span>${title}</span>
    `;

    document.querySelector("#allCategoriesWrapper").append(categoryWrapper);
}

export function isEven(n) {
   return n % 2 == 0;
}

export function skipAd(){
    let skipDIV = document.createElement("div");
    let overlay = document.createElement("div");
    let videoNGame = document.querySelector("#videoNGame");
    overlay.classList.add("overlay");
    skipDIV.classList.add("skip");

    skipDIV.innerHTML = "<div><span>Skip Ad</span><div></div></div>";

    videoNGame.append(overlay);
    overlay.append(skipDIV);

    skipDIV.addEventListener("click", () => {
        addVideo();
    })
}

export function startPage(game, description, gameThing){
    let videoNGameDIV = document.querySelector("#videoNGame");
    videoNGameDIV.innerHTML = "";
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");
    fillAdvergameWrapper.classList.add("snowfall");

    fillAdvergameWrapper.innerHTML = "";
    fillAdvergameWrapper.innerHTML = `
        <div class="topStart">
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

export function theEnd(title, points){
    let gameDIV = document.querySelector(".fillAdvergameWrapper");

    gameDIV.innerHTML = `
    <div class="endWrapper snowfall">
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
                "Hover the boot over the invaders and click and stomp them to earn points",
                "boot");
                }
        }, 2000);
        }
    })

    document.querySelector(".again").addEventListener("click", () => {
        if (link == 2){
            //kom till startsidan
            startPage("Fill The Cup", 
            "Click and hold on the cup to fill it with ingredients, if you hit the mark you get full points!",
            "cup");
        } else if (link == 1) {
            startPage("Whack A Boot",
            "Hover the boot over the invaders and click and stomp them to earn points.",
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
    let userList = document.querySelector(".userList");
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

function addVideo(){
    //lägg in title från php
    let title = "YOINK";
    let videoNGame = document.querySelector("#videoNGame");
    let videoWrap = document.createElement("video");
    var source = document.createElement('source');

    source.setAttribute('src', `assets/videos/${title}.mp4`);
    source.setAttribute('type', 'video/mp4');
    videoWrap.setAttribute("controls", "controls");

    videoNGame.innerHTML = "";
    videoWrap.appendChild(source);


    videoNGame.append(videoWrap);


}
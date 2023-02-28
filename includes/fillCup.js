
elementsDOM();
let userPoints = 0;
let progressBar = 0; //högst 500p
let clicks = 0;
let oneFill = 0;
let turnPoint = [];


//param1: hur snabbt vätskan fylls på. Ju högre tal, desto segare
//param2: var "målet" är. 150 är i mitten av koppen ungefär
fillTheCup(20, 200);

userPoints = userPoints + oneFill;
console.log("userpoints: " + userPoints);

function fillTheCup(speed, goal){
    let FILLbtn = document.querySelector("#fill");
    let fill = document.querySelector(".fill");
    let line = document.querySelector(".line");
    let intervalFill;


    line.style.bottom = goal + "px";

    FILLbtn.addEventListener("mousedown", () => {
        let height = 0;
        clicks++

        intervalFill = setInterval(() => {
            height = height + 10;
            fill.style.height = height + "px";
        }, speed);

        //stannar om vätskan blir mer än koppens höjd
        setInterval(() => {
            if(fill.offsetHeight === 270){
                clearInterval(intervalFill);
            }
        }, speed);

        
    })

    FILLbtn.addEventListener("mouseup", () => {
        let fillHeight = fill.offsetHeight;
        clearInterval(intervalFill);

        //skickar med var användaren stannade
        //gentemot var linjen är
        oneFill = checkResults(fillHeight, goal)
        oneFill = oneFill + oneFill;
        
    })
}

function updateProgressBar(pointsInWidth){
    let progressBar = document.querySelector("#progressBar");
    console.log(pointsInWidth);
    progressBar.style.width = pointsInWidth + "px";
}

//räknar ut hur mycket poäng användaren får
//när linje & fyllning jämförs
function checkResults(fill, goal){
    let plusPoints = 0;

    if(fill === goal){
        //exakt på linjen. Högst poäng
        console.log("10/10 alla poäng");
        plusPoints = 100;
    } else if(fill > goal){
        //fyllningen är mer än linjen
        let difference = fill - goal;
        if (difference >= 31){
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
        if (difference >= 31){
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
    let turnPointsDIV = document.createElement("div");
    oneTurnPoints.classList.add("oneTurnPoints");
    turnPointsDIV.classList.add("turnPointsDIV");

    oneTurnPoints.innerHTML = "";
    oneTurnPoints.innerHTML = points;

    document.querySelector(".fillAdvergameWrapper").append(turnPointsDIV);
    turnPointsDIV.append(oneTurnPoints);

    setTimeout(() => {
        oneTurnPoints.remove();
    }, 2500);
}//

//all elements in fillthecup advergame. not interactive
function elementsDOM(){
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");

    fillAdvergameWrapper.innerHTML = `
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

    document.querySelector("#videoNGame").append(fillAdvergameWrapper);
}



elementsDOM();


let FILLbtn = document.querySelector("#fill");

FILLbtn.addEventListener("mousedown", () => {
    console.log("start");
    let fill = document.querySelector(".fill");
    let height = 0;
    

    var addHeight = setInterval(() => {
        height = height + 10;
        fill.style.height = height + "px";
        console.log(height);
    }, 100);

    FILLbtn.addEventListener("mouseup", () => {
        console.log("stopp");
        clearInterval(addHeight);
    })
})




//all elements in fillthecup advergame. not interactive
function elementsDOM(){
    let fillAdvergameWrapper = document.createElement("div");
    fillAdvergameWrapper.classList.add("fillAdvergameWrapper");

    fillAdvergameWrapper.innerHTML = `
        <div id="topElements">
            <div id="ingredients"></div>
            <button id="fill">FILL!</button>
            <div id="points">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div id="bottomElements">
            <div id="cup">
                <div class="fill"></div>
            </div>
        </div>
    `;

    document.querySelector("#videoNGame").append(fillAdvergameWrapper);
}


//et timerID;
//et counter = 0;
//et pressHoldEvent = new CustomEvent("pressHold");
/// Increase or decreae value to adjust how long
/// one should keep pressing down before the pressHold
/// event fires
//et pressHoldDuration = 1000;
/// Listening for the mouse and touch events    
//ILLbtn.addEventListener("mousedown", pressingDown, false);
//ILLbtn.addEventListener("mouseup", notPressingDown, false);
//ILLbtn.addEventListener("mouseleave", notPressingDown, false);
//ILLbtn.addEventListener("touchstart", pressingDown, false);
//ILLbtn.addEventListener("touchend", notPressingDown, false);
/// Listening for our custom pressHold event
//ILLbtn.addEventListener("pressHold", doSomething, false);
//unction pressingDown(e) {
// // Start the timer
//   requestAnimationFrame(timer);
//   e.preventDefault();
//   console.log("Pressing!");
//
//
//unction notPressingDown(e) {
// // Stop the timer
//   cancelAnimationFrame(timerID);
//   counter = 0;
//   FILLbtn.style.setProperty("--scale-value", 1);
//   console.log("Not pressing!");
//
//
///
/// Runs at 60fps when you are pressing down
///
//unction timer() {
//   console.log("Timer tick!");
//
//   if (counter < pressHoldDuration) {
//       timerID = requestAnimationFrame(timer);
//       counter++;
//       FILLbtn.style.setProperty("--scale-value", 1 + counter / 50);
//   } else {
//       console.log("Press threshold reached!");
//       FILLbtn.dispatchEvent(pressHoldEvent);
//   }
//
//
//unction doSomething(e) {
//   console.log("pressHold event fired!");
//
//
//et scale = 1 + counter / 50;
//ILLbtn.style.transform = "scale3d(" + scale + ", " + scale + ", 1)";
//
//
//
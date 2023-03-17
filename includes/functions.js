
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

export function skipAd(link, seconds){
    let skipDIV = document.createElement("div");
    let overlay = document.createElement("div");
    let videoNGame = document.querySelector("#videoNGame");
    overlay.classList.add("overlay");
    skipDIV.classList.add("skip");


    let timeleft = 5;
    let timer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(timer);
            skipDIV.classList.add("skipping");
            skipDIV.classList.remove("skip");
            skipDIV.innerHTML = "<div><span>Skip Ad</span><div></div></div>";
        } else {
            skipDIV.innerHTML = `<div><span>Skip Ad in ${timeleft}s...</span><div></div></div>`;
        }
        timeleft -= 1
    }, 1000);

    videoNGame.append(overlay);
    overlay.append(skipDIV);
}

export function addVideo(){
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

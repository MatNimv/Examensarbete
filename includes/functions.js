//gemensamma funktioner för index.php och video.php

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
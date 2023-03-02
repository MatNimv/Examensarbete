export function videoDOM(title, thumbnail, user){
    let videoWrapper = document.createElement("div");

    videoWrapper.classList.add("videoWrapper");

    videoWrapper.innerHTML = `
        <div class="thumbnail"><img src="${thumbnail}"></div>
        <div class="userNtitle">
            <div class="videoUser"><img src="${user}"></div>
            <span class="videoTitle">${title}</span>
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



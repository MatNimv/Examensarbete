import { videoDOM, categoryDOM, isEven } from "./includes/functions.js";

//kod för endast landingpage.

//ARRAYS
//alla videor med titel
let videoInfo = [
    {
        videoTitle: "A Wild Susuwatari Appeared",
    },
    {
        videoTitle: "Biggest Showdown Of All Time",
    },
    {
        videoTitle: "Cutest Confusest Puppy",
    },
    {
        videoTitle: "Little Kitten Playing His Toy Mouse",
    },
    {
        videoTitle: "Mmmmm Refreshing",
    },
    {
        videoTitle: "Watch Puppy Get Wrecked",
    },
    {
        videoTitle: "A Wild Susuwatari Appeared",
    },
    {
        videoTitle: "Biggest Showdown Of All Time",
    },
    {
        videoTitle: "Cutest Confusest Puppy",
    },
    {
        videoTitle: "Little Kitten Playing His Toy Mouse",
    },
    {
        videoTitle: "Mmmmm Refreshing",
    },
    {
        videoTitle: "Watch Puppy Get Wrecked",
    },
]
let folders = [
    "Home",
    "Subscriptions",
    "Your History",
    "Your Videos",
    "Watch Later",
]
let categories = [
    "Music",
    "Gaming",
    "ASMR",
    "Lego",
    "Politics",
    "Drama",
    "Horror"
]
let times = ["3:27","21:17","15:01","2:08","5:41","19:33","1:49","11:28","6:32","3:49","16:12","3:18","5:03","8:27"];

//initialize alla videor på framsidan
for (let index = 0; index < videoInfo.length; index++) {
    const element = videoInfo[index];
    let link = "";

    let checkEvenNum = isEven(index);

    //varannan video ska ha en annorlunda länk
    if (checkEvenNum === true){
        link = "video.php?link=1" + "&title=" + element.videoTitle;
    }else {
        link = "video.php?link=2" + "&title=" + element.videoTitle;
    }

    let src = element.videoTitle;
    src.replace(/ /g, '%20')

    console.log(src);

    videoDOM(element.videoTitle, 
        `assets/images/thumbnails/${src}.png`, 
        `assets/images/userPics/user.png`,
        link, times[index]);
    index + 1;
}

leftMain();

function leftMain(){
    for (let index = 0; index < folders.length; index++) {
        const element = folders[index];
    
        folderDOM(element);
        index + 1;
    }
    
    //initialize alla kategorier på framsidan
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
    
        categoryDOM(element);
        index + 1;
    }
}


function folderDOM(title){
    let foldWrapper = document.querySelector("#fold");
    let oneFold = document.createElement("div");

    oneFold.innerHTML = `
        <span>${title}</span>
    `;

    foldWrapper.append(oneFold);
}


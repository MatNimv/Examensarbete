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
let categories = [
    "Hämnd",
    "Musik",
    "Shiet",
    "Spel",
    "ASMR",
    "Klick"
]

console.log("index.js");


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
        link);
    index + 1;
}

//initialize alla kategorier på framsidan
for (let index = 0; index < categories.length; index++) {
    const element = categories[index];

    categoryDOM(element);
    index + 1;
}
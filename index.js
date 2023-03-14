import { videoDOM, categoryDOM, isEven } from "./includes/functions.js";

//kod för endast landingpage.

//ARRAYS
//alla videor med titel
let videoInfo = [
    {
        videoTitle: "How to play Horizon and not die all the time",
    },
    {
        videoTitle: "Meditate like Dobby",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Clickers are the new influencers",
    },
    {
        videoTitle: "Meditate like Voldemort",
    },
    {
        videoTitle: "Azkaban ASMR",
    },
    {
        videoTitle: "How to build a website. pls.",
    },
    {
        videoTitle: "Meditate like Aloy",
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

    videoDOM(element.videoTitle, 
        `assets/images/thumbnails/thumb${index}.png`, 
        `assets/images/userPics/user${index}.png`,
        link);
    index + 1;
}

//initialize alla kategorier på framsidan
for (let index = 0; index < categories.length; index++) {
    const element = categories[index];

    categoryDOM(element);
    index + 1;
}
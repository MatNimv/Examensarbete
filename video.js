//kod angående fill the cup advergame
import { videoDOM } from "./includes/functions.js";
let videoInfo = [
    {
        videoTitle: "How to play Horizon and not die all the time",
        videoUserPic: "/assets/images/userPics/zoomanka.jpg",
        videoThumbnail: "/assets/images/userPics/zoomanka.jpg"
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
console.log(videoInfo);

//initialize alla videor på framsidan
for (let index = 0; index < videoInfo.length; index++) {
    const element = videoInfo[index];

    videoDOM(element.videoTitle, `assets/images/thumbnails/thumb${index}.png`, `assets/images/userPics/user${index}.png`);
    index + 1;
}
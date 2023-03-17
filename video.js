//kod angående de två advergamesen. 
//främst de statiska elementen på videosidan.
import { videoDOM } from "./includes/functions.js";
let whichLink = linkToSend;
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

//initialize alla videor på framsidan
for (let index = 0; index < videoInfo.length; index++) {
    const element = videoInfo[index];

    videoDOM(element.videoTitle, `assets/images/thumbnails/thumb${index}.png`, 
    `assets/images/userPics/user.png`,
    `video.php?link=${whichLink}`);
    index + 1;
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    console.log(content);
    
    if (content.style.display === "block") {
      content.style.display = "none";
      showAttrs(array);
    } else {
      content.style.display = "block";
    }
    if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
  });
} 


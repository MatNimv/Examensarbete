//kod angående de två advergamesen. 
//främst de statiska elementen på videosidan.
import { videoDOM } from "./includes/functions.js";
let whichLink = linkToSend;
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

//initialize alla videor på framsidan
for (let index = 0; index < videoInfo.length; index++) {
    const element = videoInfo[index];

    let src = element.videoTitle;
    src.replace(/ /g, '%20')

    videoDOM(element.videoTitle, `assets/images/thumbnails/${src}.png`, 
    `assets/images/userPics/user.png`,
    `video.php?link=${whichLink}&title=${element.videoTitle}`);
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


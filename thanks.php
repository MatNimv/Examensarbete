<?php 
error_reporting(-1);

require_once "includes/functions.php";

$adverGamers = loadJson("db/skipAndLink.json");

$oneClick = 1;
//beroende på vilken getparameter ska en av spelen
//laddas in på vardera sida
//och få ett + besökare på sidan
if (isset($_GET)){
    if($_GET["advergame"] == "fill"){
        //lägg till ett plus i skipUsers

        array_push($adverGamers[1]["fill"][0]["linkClicks"], $oneClick);
        saveJson("db/skipAndLink.json", $adverGamers);

    } else if($_GET["advergame"] == "whack"){

        array_push($adverGamers[0]["whack"][0]["linkClicks"], $oneClick);
        saveJson("db/skipAndLink.json", $adverGamers);
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Beastly&family=Rubik+Bubbles&family=Rubik+Dirt&family=Rubik+Mono+One&family=Rubik+Moonrocks&family=Rubik:wght@600&display=swap" rel="stylesheet"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Golos+Text:wght@400;500;600&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="/assets/style.css" >
    <link rel="stylesheet" href="/assets/video.css" >
    <title>Metube</title>
</head>
<body>
    <header>
        <div><a href="index.php">MeTube</a></div>
        <div id="searchBar">Search</div>
        <div id="profile"></div>
    </header>
    <main id="thanksMain">
        <h1>Thank you for showing interest in our product.</h1>
        <h2>We hope you liked our advertisement!</h2>
    </main>
    <footer id="thanksFooter">
        <span>Alice & Matilda 2023</span>
    </footer>
</body>
</html>
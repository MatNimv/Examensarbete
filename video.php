<?php 
error_reporting(-1);

require_once "includes/functions.php";

//beroende på vilken getparameter ska en av spelen laddas in på vardera sida
if (isset($_GET)){
    $whichGameJS = "";
    $whichGameCSS = "";
    $whichLinkToSend = "";
    if($_GET["link"] == 1){
        $whichGameJS = '<script type="module" src="includes/fillCup.js"></script>';
        $whichGameCSS = '<link rel="stylesheet" href="/assets/fillCup.css">';
        $whichLinkToSend = 2;
        $users = loadJson("db/fillUsers.json");
    } else {
        $whichGameJS = '<script type="module" src="includes/whackABoot.js"></script>';
        $whichGameCSS = '<link rel="stylesheet" href="/assets/whackABoot.css">';
        $whichLinkToSend = 1;
        $users = loadJson("db/whackUsers.json");
    }
}
?>

<script>
    let jsonarray = <?php echo json_encode($users); ?>
</script>
<script>
    let linkToSend = <?php echo $whichLinkToSend; ?>
</script>

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
    <?php echo $whichGameCSS ?>
    
    <title>Metube</title>
</head>
<body>
<header>
        <div>MeTube</div>
        <div id="searchBar"></div>
        <div id="profile"></div>
    </header>

    <main>
    <div id="mainVideo">
        <div id="videoNGame"></div>
        <div id="videoInfo">
            <h3>Title</h3>
            <div id="profile">
                <div id="user"></div>
            </div>
        </div>
        <div class="infoBox">
        <button type="button" class="collapsible">Information</button>
                <div class="content">
                    <p>Lorem ipsum...</p>
                </div> 
        </div>
    </div>
        <div id="allVideosWrapper"></div>
    </main>
    <footer>
        <span>Alice & Matilda 2023</span>
    </footer>
    <script type="module" src="video.js"></script>
    <?php echo $whichGameJS; ?>
    
</html>
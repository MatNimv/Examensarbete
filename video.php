<?php 
error_reporting(-1);

require_once "includes/functions.php";

$whackAttrs = [
    '<p class="oneAttr">Monster: <a href="https://www.flaticon.com/free-icons/monster" title="monster icons">Monster icons created by Smashicons - Flaticon</a></p>',
    '<p class="oneAttr">Squirrel: <a href="https://www.flaticon.com/free-icons/squirrel" title="squirrel icons">Squirrel icons created by Freepik - Flaticon</a></p>',
    '<p class="oneAttr">Boot: <a href="https://www.flaticon.com/free-icons/boot" title="boot icons">Boot icons created by Freepik - Flaticon</a></p>',
    '<p class="oneAttr">Logo: <a href="https://www.flaticon.com/free-icons/rocky-mountains" title="rocky mountains icons">Rocky mountains icons created by Pop Vectors - Flaticon</a></p>',
    '<p class="oneAttr">Medal: <a href="https://www.flaticon.com/free-icons/prize" title="prize icons">Prize icons created by vectorsmarket15 - Flaticon</a></p>',
    '<p class="oneAttr">Avatar: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by kmg design - Flaticon</a>
    </p>',
    '<p class="oneAttr">Next-button: <a href="https://www.flaticon.com/free-icons/next-button" title="next-button icons"> icons created by inkubators - Flaticon</a></p>',
];
$fillAttrs = [
    '<p class="oneAttr">Coffee package: <a href="https://www.flaticon.com/free-icons/coffee-bean" title="coffee bean icons">Coffee bean icons created by Freepik - Flaticon</a>
    </p>',
    '<p class="oneAttr">Bubble boba jar: <a href="https://www.flaticon.com/free-icons/food" title="food icons">Food icons created by Freepik - Flaticon</a>
    </p>',
    '<p class="oneAttr">Coffee beans: <a href="https://www.flaticon.com/free-icons/drink" title="drink icons">Drink icons created by srip - Flaticon</a>
    </p>',
    '<p class="oneAttr">Milk: <a href="https://www.flaticon.com/free-icons/milk" title="milk icons">Milk icons created by Freepik - Flaticon</a>
    </p>',
    '<p class="oneAttr">Sugar: <a href="https://www.flaticon.com/free-icons/sugar" title="sugar icons">Sugar icons created by Freepik - Flaticon</a>
    </p>',
    '<p class="oneAttr">Logo: <a href="https://www.flaticon.com/free-icons/food-and-restaurant" title="food and restaurant icons">Food and restaurant icons created by berkahicon - Flaticon</a></p>',
    '<p class="oneAttr">Background: <a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-forest-landscape_19964703.htm#query=forest%20illustration&position=12&from_view=keyword&track=ais">Image by Freepik</a></p>',
    '<p class="oneAttr">Medal: <a href="https://www.flaticon.com/free-icons/prize" title="prize icons">Prize icons created by vectorsmarket15 - Flaticon</a></p>',
    '<p class="oneAttr">Avatar: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by kmg design - Flaticon</a>
    </p>',
    '<p class="oneAttr">Next-button: <a href="https://www.flaticon.com/free-icons/next-button" title="next-button icons"> icons created by inkubators - Flaticon</a></p>',
];

//beroende på vilken getparameter ska en av spelen laddas in på vardera sida
if (isset($_GET)){
    $title = $_GET["title"];
    $whichGameJS = "";
    $whichGameCSS = "";
    $whichLinkToSend = "";
    if($_GET["link"] == 1){
        $whichGameJS = '<script type="module" src="includes/fillCup.js"></script>';
        $whichGameCSS = '<link rel="stylesheet" href="/assets/fillCup.css">';
        $whichLinkToSend = 2;
        $users = loadJson("db/fillUsers.json");
        $array = $fillAttrs;
    } else {
        $whichGameJS = '<script type="module" src="includes/whackABoot.js"></script>';
        $whichGameCSS = '<link rel="stylesheet" href="/assets/whackABoot.css">';
        $whichLinkToSend = 1;
        $users = loadJson("db/whackUsers.json");
        $array = $whackAttrs;
    }
}

?>

<script>
    let jsonarray = <?php echo json_encode($users); ?>
</script>
<script>
    let linkToSend = <?php echo $whichLinkToSend; ?>
</script>
<script>
    let titleOfVideo = "<?php echo $title; ?>"
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
    <?php echo $whichGameCSS; ?>
    
    <title>Metube</title>
</head>
<body>
<header>
        <div><a href="index.php">MeTube</a></div>
        <div id="searchBar"></div>
        <div id="profile"></div>
    </header>

    <main>
    <div id="mainVideo">
        <div id="videoNGame"></div>
        <div id="videoInfo">
            <h3> <?php echo $title; ?> </h3>
            <div id="profile">
                <div id="user"></div>
            </div>
        </div>
        <div class="infoBox">
        <button type="button" class="collapsible">Information</button>
                <div class="content">
                    <?php 
                        foreach($array as $value ) {
                            echo $value;
                        }
                    ?>
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
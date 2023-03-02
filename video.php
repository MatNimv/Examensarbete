<?php 
error_reporting(-1);

require_once "includes/functions.php";

$users = loadJson("db/fillUsers.json");
?>

<script>
    let jsonarray = <?php echo json_encode($users); ?>
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
    <link rel="stylesheet" href="/assets/style.css" >
    <link rel="stylesheet" href="/assets/video.css" >
    <link rel="stylesheet" href="/assets/fillCup.css" >
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
                <div>Subscribe</div>
                <div>
                    <div>LIKE</div>
                    <div>NO LIKE</div>
                </div>
            </div>
        </div>
    </div>
        <div id="allVideosWrapper"></div>
    </main>
    <footer>
        <span>Alice & Matilda 2023</span>
    </footer>
    <script type="module" src="video.js"></script>
    <script type="module" src="includes/fillCup.js"></script>
</body>
</html>
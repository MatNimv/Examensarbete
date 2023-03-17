<?php
error_reporting(-1);
require_once "../includes/functions.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
}

// Alla är välkommna
header("Access-Control-Allow-Origin: *");

$_POST = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    var_dump($_POST);
    
    if(isset($_POST["fillGame"])){
        saveJson("fillUsers.json", $_POST["fillGame"][0]);
    } else if(isset($_POST["whackGame"])){
        saveJson("whackUsers.json", $_POST["whackGame"][0]);
    } else if (isset($_POST["fill"])){
        $secondsUsers = loadJson("skipUsers.json");
        var_dump($secondsUsers);
        array_push($secondsUsers[1]["fill"], $_POST["fill"][0]);

        saveJson("skipUsers.json", $secondsUsers);
    }else if (isset($_POST["whack"])){
        $secondsUsers = loadJson("skipUsers.json");
        array_push($secondsUsers[0]["whack"], $_POST["whack"][0]);

        saveJson("skipUsers.json", $secondsUsers);
    }
}

?>

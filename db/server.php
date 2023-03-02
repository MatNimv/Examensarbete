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

    saveJson("fillUsers.json", $_POST["users"]);

}

?>

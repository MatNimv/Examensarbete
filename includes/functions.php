<?php //alla jsonfunktioner

$data = file_get_contents("php://input");

function loadJson($database)
{
    $json = file_get_contents($database);
    return json_decode($json, true);
}

function saveJson($database, $data)
{
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($database, $json);
}






?>
<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    if (empty($_POST) && file_get_contents('php://input')!==""){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

    $token = $_POST["token"];

    $ff = new common();

    $tmpStr = $ff->checkToken($token);
    
    echo json_encode($tmpStr,JSON_PRETTY_PRINT);

?>
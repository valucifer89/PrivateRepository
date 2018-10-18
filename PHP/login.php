<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    if (empty($_POST) && file_get_contents('php://input')!==""){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

    $username = $_POST["user"];
    $password = $_POST["password"];

    $ff = new common();
    $tmpStr = $ff->select(__UTENTI__, " user = '$username' and pass = '$password' ");

    echo json_encode($tmpStr,JSON_PRETTY_PRINT);

?>
<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    if (empty($_POST) && file_get_contents('php://input')!==""){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

    $username = $_GET["user"];
    $password = $_GET["password"];
    $nominativo = $_GET["nominativo"];
    $email = $_GET["email"];
    $id_permission = $_GET["id_permission"];
    
    $values = array();
    array_push($values,"'$nominativo'");
    array_push($values,"'$username'");
    array_push($values,"'$email'");
    array_push($values,$id_permission);
    
    $ff = new common();

    $tmpStr = $ff->insertRegister(__UTENTI__, $values, $username, $password);

    echo json_encode($tmpStr,JSON_PRETTY_PRINT);

?>
<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    if (empty($_POST) && file_get_contents('php://input')!==""){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

    $values = array();
    array_push($values,"'".$_POST['nominativo']."'");
    array_push($values,"'".$_POST['user']."'");
    array_push($values,"'".$_POST['email']."'");
    array_push($values,"'".$_POST['id_permission']."'");
    
    $ff = new common();
    echo json_encode($ff->insertRegister(__UTENTI__, $values, $_POST["user"], $_POST["password"]), JSON_PRETTY_PRINT);

?>
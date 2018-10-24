<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    $ff = new common();

    $tmpStr = $ff->select(__PERMISSION__);

    echo json_encode($tmpStr,JSON_PRETTY_PRINT);

?>
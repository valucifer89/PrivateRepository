<?php

    include (dirname(__DIR__)."/PHP/_configuration/common.php");
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    header("Access-Control-Allow-origin: *");
    header("Content-Type: application/json");
    header("Cache-Control: no-cache");

    $ff = new common();
    echo json_encode($ff->select(__PERMISSION__), JSON_PRETTY_PRINT);

?>
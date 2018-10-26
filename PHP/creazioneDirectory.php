<?php
    include (dirname(__DIR__)."/PHP/_configuration/configuration.php");
    
    $name_directory = __BASE_DIR__;
    $root_directory = str_replace("/PHP","",$name_directory);
    
    if (!file_exists($root_directory)) {
        mkdir($root_directory, 0777, true);
    }
    
    
    $project = "carmel";
    
    if (!file_exists($root_directory.'/'.$project)) {
        mkdir($root_directory.'/'.$project, 0777, true);
    }
	
    echo "root: ".$root_directory."<br>";
    echo "dirproj: ".$root_directory.'/'.$project."<br>";
    
?>
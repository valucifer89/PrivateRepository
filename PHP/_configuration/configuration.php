<?php
    //database connection (servername, username, password, dbname)
    define("__DATABASE__", array("localhost", "id7444976_indra", "indra", "id7444976_project"));
    define('__SECRET_KEY__','chiave');
    
    //definizione delle tabelle
    //Utenti
    define("__UTENTI__", "utenti");
    define("__COLONNE_UTENTI__", "nominativo,username,password,email");
    
    //Permission
    define("__PERMISSION__", "permission");
    
    //Progetti
    define("__PROGETTI__", "progetti");
    define("__DESCR_PROGETTI__", "descrizione_progetto");
    
    //Path root directory
    define("__BASE_DIR__", dirname(__DIR__)."/Progetti")
?>
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
    
    //Permission
    define("__PROGETTI__", "progetti");
?>
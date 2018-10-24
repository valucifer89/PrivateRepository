<?PHP 
$browser = $_SERVER["HTTP_USER_AGENT"]; 

if (preg_match("/MSFirefox/", $browser) || preg_match("/MSChrome/", $browser)) { 
die ("spiacente, navigazione bloccata a questo browser"); 
} else{
    echo "vai tranquillo ".$_SERVER["HTTP_USER_AGENT"]; 
}
?> 
<?php

    function encryptIt( $q ) {
            $cryptKey  = 'chiave';
            $qEncoded      = base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), $q, MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ) );
            return( $qEncoded );
        }
    
    function decryptIt( $q ) {
            $cryptKey  = 'chiave';
            $qDecoded      = rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), base64_decode( $q ), MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ), "\0");
            return( $qDecoded );
        }
        
    function getToken($p){
            return bin2hex($p);
        }
    
    function getqwen($p){
            return hex2bin('63686961766576616c6576616c65');
        }
    
    $p = "vale";
    $q = "vale";
    $inp = $p.$q;
    
    echo "Encode: ".getToken($inp)."<br>";
    echo "Decode: ".getqwen(getToken($inp))."<br>";
    



?>
<?php
    include ('configuration.php');
    
    class common{
        private $servername;
        private $username;
        private $password;
        private $dbname; 
        private $connection;
        
        
        //public
        public function __construct(){
            $database = __DATABASE__;
            $this->servername = $database[0];  $this->username = $database[1];
            $this->password   = $database[2];  $this->dbname   = $database[3];
        }
        
        public static function checkToken($p){
            $str = str_replace(__SECRET_KEY__,"",hex2bin($p));
            $outp = ["result" => $str];
            return $outp;
        }
        
        public function selectLogin($table, $user, $pass){
            $this->connection();
            
            $inp = $user.$pass;
            
            $passwordCrypt = self::encryptIt($inp);
            
            $str = $this->createSelect($table);
            
            $where = " user = '$user' and pass = '$passwordCrypt' ";
            
            $str = $str.$this->createWhere($where);
            
            $stmt = $this->connection->prepare($str);
            $stmt->execute();
            
            $stmt->store_result();
            
            if ($stmt->num_rows > 0){
                
                $result = $this->connection->query($str);
                
                $tmp = array();
                
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                     array_push($tmp,$row);
                }
                
                $outp = ["token" => self::getToken($inp), "result" => $tmp];
                
            }else{
                 $outp = ["result" => "0"];
            }
            
            $this->closeConnection();
            
            return $outp;
            
        }
        
        public function selectProject($tableProg, $tableDescr){
            $this->connection();
            
            $str = $this->createSelectProject($tableProg, $tableDescr);
            
            $stmt = $this->connection->prepare($str);
            $stmt->execute();
            
            $stmt->store_result();
            
            if ($stmt->num_rows > 0){
                
                $result = $this->connection->query($str);
                
                $tmp = array();
                
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                     array_push($tmp,$row);
                }
                
                $outp = ["result" => $tmp];
                
            }else{
                $outp = ["result" => "0"];
            }
            
            $this->closeConnection();
            
            return $outp;
            
        }
        
       
        public function select($table, $where = " "){
            $this->connection();
            
            $str = $this->createSelect($table);
            
            if ($where == " "){
                $str = $str.$this->createWhere();
            }else{
                $str = $str.$this->createWhere($where);
            }
            
            $stmt = $this->connection->prepare($str);
            $stmt->execute();
            
            $stmt->store_result();
            
            if ($stmt->num_rows > 0){
                
                $result = $this->connection->query($str);
                
                $tmp = array();
                
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                     array_push($tmp,$row);
                }
                
                $outp = ["result" => $tmp];
                
            }else{
                $outp = ["result" => "0"];
            }
            
            $this->closeConnection();
            
            return $outp;
            
        }
        
        public function insertRegister($table, $values, $user, $pass){
            
            $this->connection();
            
            $passcrypt = self::encryptIt($user.$pass);
            
            $str = $this->createInsert($table);
            
            array_push($values, "'$passcrypt'");
            
            $str = $str." (nominativo, user, email, id_permission, pass) values (".$this->createValues($values).")";
            
            $stmt = $this->connection->stmt_init();
            $stmt = $this->connection->prepare($str);
            
            if ($stmt->execute() ){
                $arr = array('result'=> true);
            }else{
                $arr = array('result'=> false);
            }
   
            $this->closeConnection();
            
            return $arr;
            
        }
        
        public function insert($table, $values){
            
            $this->connection();
            
            $str = $this->createInsert($table);
            
            $str = $str." values (".$this->createValues($values).")";
            
            $stmt = $this->connection->stmt_init();
            $stmt = $this->connection->prepare($str);
            
            if ($stmt->execute() ){
                $arr = array('Result'=> true);
            }else{
                $arr = array('Result'=> false);
            }
   
            $this->closeConnection();
            
            return $arr;
            
        }
        
        public function update($table, $set, $where = " "){
            $this->connection();
            
            $str = $this->createUpdate($table);
            
            if($where == " "){
                $str = $str." set ".$this->createSet($set)." ";
            }else{
                 $str = $str." set ".$this->createSet($set)." ".$this->createWhere($where);
            }
            
            $stmt = $this->connection->stmt_init();
            $stmt = $this->connection->prepare($str);
            
            if ($stmt->execute() ){
                $arr = array('Result'=> true);
            }else{
                $arr = array('Result'=> false);
            }
   
            $this->closeConnection();
            
            return $arr;
        }
        
        public function delete($table, $where = " "){
            $this->connection();
            
            $str = $this->createDelete($table);
            
            if ($where == " "){
                $str = $str.$this->createWhere();
            }else{
                $str = $str.$this->createWhere($where);
            }
            
            $stmt = $this->connection->prepare($str);
            
            if ($stmt->execute() ){
                $arr = array('Result'=> true);
            }else{
                $arr = array('Result'=> false);
            }
   
            $this->closeConnection();
            
            return $arr;
            
        }
        
        
        //private
        private function connection(){
            $this->connection = new mysqli($this->servername,  $this->username,  $this->password,  $this->dbname);
            
            if ($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
            } 
        }
        
        private function closeConnection(){
            $this->connection->close();
        }
        
        private function createSelect($table){
            return "select * from $table ";
        }
        
        private function createSelectProject($tableProj, $tableDescr){
            return "select * from $tableProj as a, $tableDescr as b where a.id = b.id_progetto";
        }
        
        private function createWhere($where = " "){
            $tmpWhere = " where 1=1 ";
            
            if ($where == " "){
                //vuoto
            }else{
                $tmpWhere = $tmpWhere." and ".$where;
            }
            
            return $tmpWhere;
        }
        
        private function createInsert($table){
            return "insert into $table ";
        }
        
        private function createValues($values){
            return implode(",",$values);
        }
      
        private function createUpdate($table){
            return "update $table ";
        }      
        
        private function createSet($set){
            $setAll = array();
            
            foreach($set as $k => $v){
                array_push($setAll, $k."='".$v."'");
            }
            
            return implode(",",$setAll);
        }
        
        private function createDelete($table){
            return "delete from $table ";
        }
        
        private static function encryptIt( $q ) {
            $cryptKey  = __SECRET_KEY__;
            $qEncoded      = base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), $q, MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ) );
            return( $qEncoded );
        }
    
        private static function decryptIt( $q ) {
            $cryptKey  = __SECRET_KEY__;
            $qDecoded      = rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), base64_decode( $q ), MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ), "\0");
            return( $qDecoded );
        }
        
        private static function getToken($p){
            return bin2hex(__SECRET_KEY__.$p);
        }
        
    }



?>
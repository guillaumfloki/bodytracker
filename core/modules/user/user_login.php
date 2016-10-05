<?php
$core_path = "../../engine/";
include($core_path."init.php");
$request = json_decode(file_get_contents("php://input"));
$username = $request->username;
$password = $request->password;
$hash = newPassword($password);
$res = $mysqli->query("SELECT * FROM user WHERE username = '$username' AND password = '$hash'");
$a=null;
if(mysqli_num_rows($res)>0){
    $a = sql2json($res, 'currentUser');
}
echo $a;
?>
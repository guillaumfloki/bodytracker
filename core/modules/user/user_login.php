<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$request = json_decode(file_get_contents("php://input"));
$username = $request->username;
$password = $request->password;
$hash = newPassword($password);
$res = $mysqli->query("SELECT id FROM user WHERE username = '$username' AND password = '$hash'");
$a = '0';
if (mysqli_num_rows($res) > 0) {
    mysqli_free_result($res);
    $t = time();
    $mysqli->query("UPDATE user SET last_login='$t' WHERE username = '$username' AND password = '$hash'");
    $a = sql2json($mysqli->query("SELECT * FROM user WHERE username = '$username' AND password = '$hash'"), 'currentUser');
}
echo $a;
?>
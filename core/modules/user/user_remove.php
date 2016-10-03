<?php
$core_path = "../../engine/";
include($core_path."init.php");
$request = json_decode(file_get_contents("php://input"));
$id = $request->id;
$status = $request->status;
$s = null;
$res = query("SELECT id FROM user WHERE id='$id'");
if(mysqli_num_rows($res)>0){
	$s = query("UPDATE user SET status='$status' WHERE id='$id'");
}
$r = 'KO';
if($s){
	$r = 'OK';
}
echo $r;
?>
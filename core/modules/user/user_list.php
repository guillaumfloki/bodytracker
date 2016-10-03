<?php
$core_path = "../../engine/";
include($core_path."init.php");
$request = json_decode(file_get_contents("php://input"));
$id = $request->id;
$s = query("SELECT * FROM user WHERE id = '$id'");
$arr = mysqli_fetch_assoc($s);
mysqli_free_result($s);
$r = 'KO';
if($s){
	$r = json_encode($arr);
}
echo $r;
?>
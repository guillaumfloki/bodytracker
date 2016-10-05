<?php
$core_path = "../../engine/";
include($core_path."init.php");
$request = json_decode(file_get_contents("php://input"));
$username = $request->username;
$lastname = $request->lastname;
$firstname = $request->firstname;
$age = $request->age;
$gender = $request->gender;
$pwd2 = $request->pwd2;
$height = $request->height;
$weight = $request->weight;
//insert
$p = newPassword($pwd2);
$s = query("INSERT INTO user (lastname, firstname, age, username, password, gender, height, weight) VALUES ('$lastname', '$firstname', '$age', '$username', '$p', '$gender', '$height', '$weight')");
$id = $mysqli->insert_id;
$r = 'KO';
if($s){
	$r = json_encode($request);
    $r[] = $id;
}
echo $r;
?>
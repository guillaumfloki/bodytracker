<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$request = json_decode(file_get_contents("php://input"));
foreach ($request as $key => $value) {
    ${$key} = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
$datetime = date2TS($datetime);
$q = $mysqli->query("INSERT INTO body_measures (id, id_user, date, weight, neck, chest, shoulders, arm_right, arm_left, calf_right, calf_left, thigh_right, thigh_left, waist, image) VALUES ('', '$id_user', '$datetime', '$weight', '$neck', '$chest', '$shoulders', '$arm_right', '$arm_left', '$calf_right', '$calf_left', '$thigh_right', '$thigh_left', '$waist', '$image')");
$r = "0";
if ($q) {
    $r = "1";
}
echo $r;
logout();
?>
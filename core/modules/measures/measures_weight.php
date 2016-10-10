<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$id = $_GET['id'];
$res = $mysqli->query("SELECT weight, date, height, target_weight FROM body_measures, user WHERE id_user = '$id' AND user.id = body_measures.id_user ");

$arr2 = mysqli_fetch_array($res);
$arr = sort_by_date($res, 'date', 'weight');
array_unshift($arr, [intval($arr2['height']), intval($arr2['target_weight'])]);
mysqli_free_result($res);
$a = json_encode($arr);
echo $a;
logout();
?>
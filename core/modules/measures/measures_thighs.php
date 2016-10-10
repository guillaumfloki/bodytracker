<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$id = $_GET['id'];
$res = $mysqli->query("SELECT weight, date FROM body_measures WHERE id_user = '$id' ");
$a = json_encode(sort_by_date($res, 'date', 'weight'));
echo $a;
logout();
?>
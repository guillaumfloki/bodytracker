<?php
$core_path = "../../engine/";
include($core_path."init.php");
$res = query("SELECT * FROM user");
$a = sql2json($res);
echo json_encode($a);
?>
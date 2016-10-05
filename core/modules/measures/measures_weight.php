<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$id = $_GET['id'];
$res = $mysqli->query("SELECT weight, date FROM body_measures WHERE id_user = '$id' ");
$a = [];
$tmpArr = [];
if (mysqli_num_rows($res) > 0) {
    while ($arr = mysqli_fetch_assoc($res)) {
        $tmpArr[intval($arr['date'])] = intval($arr['weight']);
    }
    ksort($tmpArr);
    foreach ($tmpArr as $key => $value) {
        $dateArr[] = ts2date($key);
        $weightArr[] = $value;
    }
    $a[] = $dateArr;
    $a[] = $weightArr;
}
$arr = json_encode($a);
echo $arr;
logout();
?>
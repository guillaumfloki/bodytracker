<?php
$core_path = "../../engine/";
include($core_path . "init.php");
/*
array returned:
[0]=> (array) user info (height, start weight, target weight) (metric)
[1]=> (array) date values (dd/mm/YYYY)
[2]=> (array) weight values (metric)
*/
$id = $_GET['id'];
// get user data from body_measures
$res = $mysqli->query("SELECT weight, date, height, start_weight, target_weight, neck, chest, shoulders, arm_right, arm_left, calf_right, calf_left, thigh_right, thigh_left, waist FROM body_measures, user WHERE id_user = '$id' AND body_measures.id_user = user.id");
$a = [];
$tmp_arr = [];
$tmp_arr2 = [];
$date_arr = [];
$val_arr = [];
$start_values = [];
// more than 1 row
if (mysqli_num_rows($res) > 1) {
    while ($arr = mysqli_fetch_assoc($res)) {
        // duplicate values for late exploit
        $start_values = $arr;
        // data assoc array : date = value
        $tmp_arr['weight'] = intval($arr['weight']);
        $tmp_arr['neck'] = intval($arr['neck']);
        $tmp_arr['chest'] = intval($arr['chest']);
        $tmp_arr['shoulders'] = intval($arr['shoulders']);
        $tmp_arr['arm_right'] = intval($arr['arm_right']);
        $tmp_arr['arm_left'] = intval($arr['arm_left']);
        $tmp_arr['calf_right'] = intval($arr['calf_right']);
        $tmp_arr['calf_left'] = intval($arr['calf_left']);
        $tmp_arr['thigh_right'] = intval($arr['thigh_right']);
        $tmp_arr['thigh_left'] = intval($arr['thigh_left']);
        $tmp_arr['waist'] = intval($arr['waist']);
        $tmp_arr2[intval($arr['date'])][] = $tmp_arr;
    }

    // sort array by date
    ksort($tmp_arr2);

    // split arrays
    foreach ($tmp_arr2 as $key => $value) {
        $date_arr[] = ts2date($key);
        $val_arr[] = $value[0];
    }
} elseif (mysqli_num_rows($res) == 1) { // 1 row
    $arr = mysqli_fetch_assoc($res);
    $start_values = $arr;
    $date_arr[] = ts2date(intval($arr["date"]));
    $val_arr[] = intval($arr['weight']);
}
// join arrays into one array
$a[] = $date_arr;
$a[] = $val_arr;
// push values at the beginning of the main array = non dynamic user infos
array_unshift($a, [intval($start_values['height']), intval($start_values['start_weight']), intval($start_values['target_weight'])]);
mysqli_free_result($res);
echo json_encode($a);
logout();
?>
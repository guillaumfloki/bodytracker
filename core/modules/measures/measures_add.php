<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$request = json_decode(file_get_contents("php://input"));
foreach ($request as $key => $value) {
    ${$key} = addslashes($value);
}
$datetime = datetime($datetime);
$full_date = explode(" ", $datetime);
$date_start = date("Y-m-d H:i:s", date2ts($full_date[0])) . ".000000";
$date_end = date("Y-m-d H:i:s", date2ts($full_date[0]) + 3600 * 24) . ".000000";
$datetime_to_insert = $datetime.'.000000';
//image data
$res_img = $mysqli->query("SELECT * FROM tmp_images WHERE date BETWEEN '$date_start' AND '$date_end' AND id_user = '$id_user'");
$id_image = '';
if (mysqli_num_rows($res_img) > 0) {
    $values_arr = [];
    while ($arr_img = mysqli_fetch_assoc($res_img)) {
        foreach ($arr_img as $key => $value) {
            if ($key != 'id') {
                $values_arr[] = $value;
            }
        }
        $q = "INSERT INTO `images` SET `id_user`=?, `image_type`=?, `image_uri`=?,`image_thumb_uri`=?, `image_size`=?, `image_name`=?, `date`=? ";
        $stmt = $mysqli->prepare($q);
        $stmt->bind_param("isssiss", $values_arr[0], $values_arr[1], $values_arr[2], $values_arr[3], $values_arr[4], $values_arr[5], $values_arr[6]);
        $stmt->execute();
        $id_image = $mysqli->insert_id;
        $stmt->close();
    }
}
mysqli_free_result($res_img);
$q = $mysqli->query("INSERT INTO body_measures (id_user, date, weight, neck, chest, shoulders, arm_right, arm_left, calf_right, calf_left, thigh_right, thigh_left, waist, id_image) VALUES ('$id_user', '$datetime_to_insert', '$weight', '$neck', '$chest', '$shoulders', '$arm_right', '$arm_left', '$calf_right', '$calf_left', '$thigh_right', '$thigh_left', '$waist', '$id_image')");
$r = "0";
if ($q) {
    $mysqli->query("UPDATE tmp_images SET active = 0 WHERE id = '$id_image'");
    $r = "1";
}
echo $q;
logout();
?>
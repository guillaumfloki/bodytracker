<?php
$core_path = "../../engine/";
include($core_path . "init.php");
$image = $_FILES['measures_image'];
$id_user = addslashes($_POST['user']);
$q = null;
$dest_path = "../../../app/dist/images/";
$new_file = '';
$br = "<br>";
//image data
$imgData = file_get_contents($image['tmp_name']);
$image_type = addslashes($image['type']);
$image_size = addslashes($image['size']);
$image_name = addslashes($image['name']);
$image_type = explode("/", $image_type);
$image_type = $image_type[1];

//select last id image
$res_img = $mysqli->query("SELECT MAX(id) as last_id_img FROM images WHERE id_user='$id_user'");
$arr_img = mysqli_fetch_assoc($res_img);
mysqli_free_result($res_img);
// create folders & paths
$new_id_img = $arr_img['last_id_img'] + 1;
$updted_path = $dest_path . $id_user . '/';
if (!is_dir($updted_path)) {
    mkdir($updted_path);
}

$updted_path = $updted_path . $new_id_img . '/';
if (!is_dir($updted_path)) {
    mkdir($updted_path);
}

$datetime = time();
$new_file = $updted_path . $datetime . "." . $image_type;
$updted_new_file = "../app/dist/images/" . $datetime . "." . $image_type;
// copy new image into newly created folder
$copy = copy($image['tmp_name'], $new_file);
$r = "0";
if (@is_file($new_file)) {
    $query = $mysqli->prepare("INSERT INTO images VALUES (?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param('', $id_user, $image_type, $updted_new_file, $image_size, $image_name, $datetime);
    $query->execute();
    $query->close();
    if ($q) {
        $r = "1";
    }
}
echo is_file($new_file);
logout();
?>
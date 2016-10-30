<?php
/*TODO
 *
 * [x] optimiser taille et poids de l'image
 *    avant enregistrement sur le serveur
 * [] créer table temporaire où l'image est stockée
 *      si formulaire soumis, image copiée dans table image et id_image copiée dans body_measures
 *      si formulaire PAS soumis, ligne dans table temporaire détruite supprimée au bout de 10mn
 * [] exécuter ce script au submit du fomulaire
 *
 * */

$core_path = "../../engine/";
include($core_path . "init.php");
$image = $_FILES['measures_image'];
$id_user = addslashes($_POST['user']);
$q = null;
$dest_path = "../../../app/dist/images/";
$new_file = '';
//image data
$imgData = file_get_contents($image['tmp_name']);
$image_type = addslashes($image['type']);
$image_size = addslashes($image['size']);
$image_name = addslashes($image['name']);
$image_type = explode("/", $image_type);
$image_type = $image_type[1];

//select last id image
$res_img = $mysqli->query("SELECT MAX(images.id) as last_id_img, username FROM images, user WHERE id_user='$id_user' AND user.id = images.id_user");
$arr_img = mysqli_fetch_assoc($res_img);
mysqli_free_result($res_img);
$new_id_img = $arr_img['last_id_img'] + 1;
// full size & thumbnail
list($imageWidth, $imageHeight, $imageAttr) = getimagesize($image['tmp_name']);
$updated_path = $dest_path . $id_user . '/' . $new_id_img . '/';
// create folders & paths
if (!is_dir($updated_path)) {
    mkdir($updated_path, null, true);
}

$datetime = datetime();
$bid_date_arr = explode(' ', $datetime);
$date_arr = explode('-', $bid_date_arr[0]);
$date = $date_arr[0] . $date_arr[1] . $date_arr[2];
$new_file = $id_user . '_' . $new_id_img . '_' . $date . "_" . sha1(random(6) . $arr_img['username'] . random(6)) . '.' . $image_type;
$new_file_path = $updated_path . $new_file;

// copy new image into newly created folder
copy($image['tmp_name'], $new_file_path);
makeThumbnails($updated_path, $new_file, $new_id_img);

$r = "0";
if (@is_file($new_file_path)) {
    $q = "INSERT INTO `images` SET `id_user`=?, `image_type`=?, `image_uri`=?, `image_size`=?, `image_name`=?, `date`=? ";
    $stmt = $mysqli->prepare($q);
    $stmt->bind_param("ississ", $id_user, $image_type, $new_file_path, $image_size, $image_name, $datetime);
    $stmt->execute();
    $stmt->close();
    $r = "1";
}
echo $r;
logout();
?>
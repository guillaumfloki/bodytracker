<?php
$core_path = "../../engine/";
include($core_path."init.php");
$request = json_decode(file_get_contents("php://input"));
$id = $request->id;
$s = query("SELECT id, image_uri, image_thumb_uri, image_name, date date FROM images WHERE id_user = '$id' ORDER BY date");
$r = 'KO';
if($s){
    $r = sql2json($s, 'userGallery');
}
echo $r;
?>
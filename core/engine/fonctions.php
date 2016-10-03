<?php
//execute une requete sql
function query($q){
	global $mysqli;
	if(!$res=$mysqli->query($q,MYSQLI_STORE_RESULT)){
		die("ERREUR DE REQUETE.<br />La requ&ecirc;te : ".$q."<br/>Erreur : " .$mysqli->error);
	}else{
		return($res);
	}
}
function logout(){
	global $mysqli;
	return $mysqli->close();
}

function fetch_assoc($res){
	$tab=$res->fetch_assoc();
	return $tab;
}
function num_rows($res){
	return $n=$res->num_rows;
}
function free_result($res){
	return mysqli_free_result($res);
}

//AFFICHAGE DU PRINT_R
function debug($a) {
	echo "<pre>";print_r($a);echo "</pre>";
}
//----------------------------------------------

/*********GESTION DES MOTS DE PASSE *****************/
//fonction  qui récupère le mdp depuis la base
function getPassword($u) {
	$uid = stripslashes(trim($u));
	$res = requete("SELECT password FROM user WHERE id = '$u' ");
	$tab = fetch_assoc($res);
	free_result($res);
	if(!empty($tab['password'])){
		return $tab['password'];
	}else{
		return false;
	}
}
//fonction de création de mot de passe
function newPassword($n) {
	$sha = hash("sha256","iLovEyOuHyeJin".$n."bLiNk-182");
	return $sha;
}
//fonction de remplacement de mot de passe dans la base
function setPassword($u, $p, $flag) {
	$uid = stripslashes(trim($u));
	$pass = stripslashes(trim($p));
	$sha = newPassword($p);
	if($flag){
		query("UPDATE user SET password = '$sha' WHERE id = '$uid' ");
	}
}

//fonction de vérification de mot de pass
function checkPassword($user, $pass) {
if(empty($pass)) return false;
$existing = getPassword($user);
$crypt = hash("sha256","iLovEyOuHyeJin".$pass."bLiNk-182");
return ($existing === $crypt);
}

/*FONCTION POUR AFFICHER LE PLURIEL DES NOMS ET ADJECTIFS*/
function pluriel($a){
	$p = ($a > 1) ? "s" : "";
	return $p;
}
//fonction de chargement de fichier
function charge_fichier($fichier){
	$pointeur = fopen($fichier, "r");
	$str      = fread($pointeur, filesize($fichier));
	fclose($pointeur);
	return $str;
}

//formatage TimeStamp d'une date lisible
function date2TS($date, $full=false){
	if($date != '' && $date != '0000/00/00'){
		$e = explode("/",$date);
		if(isset($full) && $full==true){
			$t = explode(":",$e[1]);
			$time = $t[0].",".$t[1].",".$t[2];
			return $date = mktime($time,$e[1], $e[0], $e[2]);
		}else{
			return $date = mktime(0,0,0,$e[1], $e[0], $e[2]);
		}		
	}else{
		return $date = '';
	}
}
//formatage lisible d'un timestamp (arg. opt. pour les heures, mn, etc.)
function ts2date($ts, $full=false){
	return (isset($full) && $full == true) ? date("d/m/Y H:i:s",$ts) : date("d/m/Y",$ts);
}

function sql2json($res, $object_name){
	$new_tab=[];
	while ($tab = mysqli_fetch_assoc($res)) {
		foreach($tab as $k=>$val){
			$new_tab[$k] = nl2br($val);
		}
	}
	mysqli_free_result($res);
	$new_tab[$object_name] = json_encode($new_tab);
	return $new_tab[$object_name];
}


/*----------  désérialise une liste en base 64  ----------*/
function deserialise($serialized_data){
	return unserialize(base64_decode($serialized_data));
}
function serialise($unserialized_data){
	return base64_encode(serialize($unserialized_data));
}

/*----------  check if a string is serialized  ----------*/
function is_serialized( $data ) {
    // if it isn't a string, it isn't serialized
	if ( !is_string( $data ) )
		return false;
	$data = trim( $data );
	if ( 'N;' == $data )
	return true;
	if ( !preg_match( '/^([adObis]):/', $data, $badions ) )
		return false;
	switch ( $badions[1] ) {
		case 'a' :
		case 'O' :
		case 's' :
		if ( preg_match( "/^{$badions[1]}:[0-9]+:.*[;}]\$/s", $data ) )
		return true;
		break;
		case 'b' :
		case 'i' :
		case 'd' :
		if ( preg_match( "/^{$badions[1]}:[0-9.E-]+;\$/", $data ) )
		return true;
		break;
	}
	return false;
}
//send mail
//require 'Mail' php class from 'class/Mail.php'
function send_mail($from,$email,$cc,$bcc,$msg,$object,$file_name,$path_dep=""){ 
    // create the mail
	$m= new Mail; 
	$m->From($from);
	$m->To($email);
	$m->Subject($object);
	// set the body
	$m->Body($msg);        
	$m->Bcc($bcc);
	$m->Cc($cc);
	$m->Priority(1) ;
	if( is_array( $file_name ) ){
		$file= $file_name;
	}else{
		$file[] = $file_name;
	}
	for( $i=0; $i< sizeof($file); $i++ ) {
		if ("$file[$i]"!="") {
			$m->Attach( "$file[$i]", "application/octet-stream" );
		}
	}
	$send=$m->Send();
	return $send;
}

/*------------------*/
function tableFromSql($res){
	$t = "<table class='simpletable'>";
	if(mysqli_num_rows($res) > 0){
		$t .= "<thead>";
		$t .= "<tr>";
		//heading cells
		while($col = $res->fetch_field()){
			$t .= "<th>".$col->name."</th>";
		}
		$t .= "</tr></thead><tbody>";
		//body cells
		while($row=$res->fetch_assoc()){
			$t .= "<tr>";
			foreach($row as $cell){
				$t .= "<td>".$cell."</td>";	
			}
			$t .= "</tr>";
		}
		$t .= "</table>";
		mysqli_free_result($res);
	}
	return $t;
}
?>
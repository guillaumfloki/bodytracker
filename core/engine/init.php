<?php
include("connect.php");
include("fonctions.php");
$mysqli->set_charset("utf8");
session_start();
$path=isset($path) ? $path : '';
$msg="";
$currentY = date('Y');
define("SITE_ROOT", "/");
$url=SITE_ROOT;
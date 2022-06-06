<?php
$_POST = json_decode( file_get_contents("php://input"), true );    //декодировка JSON для php
echo var_dump($_POST);     //для обычного формата XMLHttpRequesr




<?php
include "Lib.php";

$user_id = $_POST['id'];
$pwd = $_POST['pwd'];
$name = $_POST['name'];
$email = $_POST['email'];
$regdate = date("Y-m-d H:i:s");
$ip = $_SERVER['REMOTE_ADDR']; // 클라이언트 ip

$user_id = mysqli_real_escape_string($connect, $user_id);
$pwd = mysqli_real_escape_string($connect, $pwd);
$name = mysqli_real_escape_string($connect, $name);
$email = mysqli_real_escape_string($connect, $email);
$regdate = mysqli_real_escape_string($connect, $regdate);
$ip = mysqli_real_escape_string($connect, $ip);


echo $user_id;
echo $pwd;
echo $name;
echo $email;
echo $ip;

$query = "INSERT INTO LUSH_members (user_id, pwd, name, email, regdate, ip) values('$user_id',md5('$pwd'),'$name','$email','$regdate','$ip')";
mysqli_query($connect,$query);
// $data = mysqli_fetch_array($result);

print_r($data);

Header("Location: ../page/signupFinish.html");
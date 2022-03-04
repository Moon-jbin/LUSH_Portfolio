<?php

include "Lib.php";

$user_Id = $_POST['user_Id'];
$user_id = mysqli_real_escape_string($connect, $user_Id);

$query="select * from LUSH_members where user_id='$user_Id'";

$result = mysqli_query($connect,$query);
$data = mysqli_fetch_array($result);

// print_r($data[1]);   db에서 찾은 아이디 값

if($data[1]==$user_Id){
  echo "overLap";
}else{
  echo "nonOverLap";
}
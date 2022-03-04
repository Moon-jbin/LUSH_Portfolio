(function($){

  $("body").attr("onselectstart","return false");


  // pupup 기술

var key_cnt = 0;
// 팝업 슬라이드

// var height = $(".key-slide").height(); // 공지사항 높이값

// var num = $(".key-slide").length; // 공지사항 갯수

// var max_height = height * num; // 전체 높이
// var move = 0; // 움직일 숫자 값

function popupRolling() {
  //   // move += height;
  //   // $(".keyword-slide-wrap")
  //   //   .stop()
  //   //   .animate({ top: -move }, 600, function () {
  //   //     if (move > max_height) {
  //   //       move = 0;
  //   //     }
  //   //     $(".keyword-slide-wrap").css({ top: -move }, 0);
  //   //   });
  //   // $(".keyword-slide-wrap").append($(".key-slide").clone());

  $(".keyword-slide-wrap")
    .stop()
    .animate({ top: -76.03 * key_cnt }, 600, function () {
      if (key_cnt > 5) {
        key_cnt = 0;
      }
      $(".keyword-slide-wrap")
        .stop()
        .animate({ top: -76.03 * key_cnt }, 0);
    });
}

function keyNextCount() {
  key_cnt++;
  popupRolling();
}

setInterval(keyNextCount, 2000);
// $(".keyword-slide-wrap").append($(".key-slide").clone());

//팝업 나타내기

$(".search-btn").on({
  click: function () {
    $("#popup").stop().show();
  },
});

//팝업 나가기

$(".popup-exit-btn").on({
  click: function () {
    $("#popup").stop().hide();
  },
});

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


//이메일 직접입력 폼

$('.email-enter').on({
  click(){
    if(!$(".email-enter").hasClass("arrow-up")){
      $(this).addClass("arrow-up")
    }else{
      $(this).removeClass("arrow-up")
    }


    if($(".email-enter").hasClass("arrow-up")){
      $(".email-enter > ul").css("display","block")
    }else{
      $(".email-enter > ul").css("display","none")
    }
  }
})

// 직접입력 선택시 input box에 value값으로 넣기
let emailEnter = null;
$(".email-enter > ul > li").on({
  click(e){
    let emailValue = $("#email").val();
    emailEnter = e.target.outerText;
    
    $('.email-enter > span').text(emailEnter);
    if($("#email").val()==""){
      $('#email').val("@"+emailEnter)
      // console.log("값이 없을때 이메일 넣기")
    }else {
      if(!/[@]/.test(emailValue)){
        $("#email").val(emailValue+"@"+emailEnter);
      }else if (/[@]/.test(emailValue)) {
        $("#email").val((emailValue.replace(/\@.*$/,"@"+emailEnter)));
      }
    }
  }
})

$("#email").on({
  keyup(){
    let emailValue = $("#email").val();
    if(( /.com/.test(emailValue)&&/[@]/.test(emailValue) ) || (/.net/.test(emailValue)&&/[@]/.test(emailValue)) ){
      // 사용가능한 이메일입니다. addClass
      $(".email-wrap").addClass("email-use");
      $("#email").addClass("email-use");
      $(".email-useable").css("display","block");
      // 사용불가능한 이메일입니다. removeClass
      $(".email-wrap").removeClass("email-non-use");
      $("#email").removeClass("email-non-use");
      $(".email-non-useable").css("display","none");
      $(".email-non-useable").removeClass("non-pass-email");
      
    }else{
      // 사용가능한 이메일입니다. removeClass
      $(".email-wrap").removeClass("email-use");
      $("#email").removeClass("email-use");
      $(".email-useable").css("display","none");
      // 사용불가능한 이메일입니다. addClass
      $(".email-wrap").addClass("email-non-use");
      $("#email").addClass("email-non-use");
      $(".email-non-useable").css("display","block");
      $(".email-non-useable").addClass("non-pass-email");
    }

    if($("#email").val()==""){
      // 사용불가능한 이메일입니다. removeClass
      $(".email-wrap").removeClass("email-non-use");
      $("#email").removeClass("email-non-use");
      $(".email-non-useable").css("display","none");
    }
  }
})


// 아이디 최소 4이상 입력해주세요. 구간

function idForm () {
  // console.log($("#id").val().length)
  let userId = $("#id").val();
 
  if($("#id").val().length < 4 || $("#id").val().length > 15 ) {
    $(".id-wrap").addClass("error");
    $("#id").addClass("error");
    $(".id-error-ms").css("display","block")
    // 사용가능한 아이디 removeClass
    $(".id-wrap").removeClass("id-use-ms");
    $("#id").removeClass("id-use-ms");
    $(".id-useable").css("display","none");
  }else{
    $(".id-wrap").removeClass("error");
    $("#id").removeClass("error");
    $(".id-error-ms").css("display","none")
    // 사용가능한 아이디 addClass
    $(".id-wrap").addClass("id-use-ms");
    $("#id").addClass("id-use-ms");
    $(".id-useable").css("display","block");
  }
  
  // 중복된 아이디 ajax POST 방식으로 확인
 $.ajax({
   url:"../joinPHP/idOverLap.php",
   type:"POST",
   data: {user_Id: userId},
   success: function(result){

    if(result =="overLap"){
      $(".id-wrap").addClass("over-error");
      $("#id").addClass("over-error");
      $(".id-over-error-ms").addClass("over-chk");
      $(".id-over-error-ms").css("display","block");
      // 사용가능한 아이디 removeClass
      $(".id-wrap").removeClass("id-use-ms");
      $("#id").removeClass("id-use-ms");
      $(".id-useable").css("display","none");
    }else{
      $(".id-wrap").removeClass("over-error");
      $("#id").removeClass("over-error");
      $(".id-over-error-ms").removeClass("over-chk");
      $(".id-over-error-ms").css("display","none");
      // if($("#id").val().length > 4 || $("#id").val().length < 15){
      //   // 사용가능한 아이디입니다. addClass
      //   $(".id-wrap").addClass("id-use-ms");
      //   $("#id").addClass("id-use-ms");
      //   $(".id-useable").css("display","block");
      // }else{
      //   $(".id-wrap").removeClass("id-use-ms");
      //   $("#id").removeClass("id-use-ms");
      //   $(".id-useable").css("display","none");
      // }
      
      
    }

    if($("#id").val()==""){
      $(".id-wrap").removeClass("over-error");
      $("#id").removeClass("over-error");
      $(".id-over-error-ms").removeClass("over-chk");
      $(".id-over-error-ms").css("display","none");
    }

   },
   error: function(){
     alert("error!");
   }
 });

 if($("#id").val()==""){
  $(".id-wrap").removeClass("error");
  $("#id").removeClass("error");
  $(".id-error-ms").css("display","none")
 }
}

$("#id").on({
  keyup(e){
    idForm ();
  }
})


// 비밀번호 최소 8자 이상 입력해주세요. 구간
$("#pwd").on({
  keyup(){
    let pw = $("#pwd").val();
    if(  pw.length > 20 || pw.length < 8 || !/[0-9]/g.test(pw) || !/[a-z]/g.test(pw) || !/[`~!@#$%^&*()|;:/?]/g.test(pw) || /[\s]/g.test(pw) ){
      // 비밀번호 error메세지 addClass
      $(".pwd-wrap").addClass("error");
      $("#pwd").addClass("error");
      $(".pwd-error-ms").css("display","block");
      // 사용가능한 비밀번호 addClass
      $(".pwd-wrap").removeClass("pwd-use-ms");
      $("#pwd").removeClass("pwd-use-ms");
      $(".pwd-useable").css("display","none");

    }else if( $("#id").val()==$("#pwd").val() ){

      // 비밀번호 아이디 중복
      $(".pwd-wrap").addClass("pwdId-overLab-error");
      $("#pwd").addClass("pwdId-overLab-error");
      $(".pwdId-overLab-error-ms").css("display","block");

      // 사용가능한 비밀번호 addClass
      $(".pwd-wrap").removeClass("pwd-use-ms");
      $("#pwd").removeClass("pwd-use-ms");
      $(".pwd-useable").css("display","none");

    }
    else{
      // 사용불가능한 비밀번호 removeClass
      $(".pwd-wrap").removeClass("error");
      $("#pwd").removeClass("error");
      $(".pwd-error-ms").css("display","none");

      // 비밀번호 아이디 중복 removeClass
      $(".pwd-wrap").removeClass("pwdId-overLab-error");
      $("#pwd").removeClass("pwdId-overLab-error");
      $(".pwdId-overLab-error-ms").css("display","none");

      // 사용가능한 비밀번호 addClass
      $(".pwd-wrap").addClass("pwd-use-ms");
      $("#pwd").addClass("pwd-use-ms");
      $(".pwd-useable").css("display","block");
    }
   
    // console.log(/[0-9]/g.test(pw));
    // console.log(/[a-z]/g.test(pw));
    // console.log(/[`~!@#$%^&*()|;:/?]/g.test(pw));
    // console.log("공백",/[\s]/g.test(pw));


    // pwd 값이 비어있을 경우 에러 메세지 removeClass
    if($("#pwd").val()==""){
      $(".pwd-wrap").removeClass("error");
      $("#pwd").removeClass("error");
      $(".pwd-error-ms").css("display","none");
    }
  }
})


// 비밀번호 확인 : 비밀번호가 서로 다릅니다.
$("#pwd-chk").on({
  keyup(){

    if($("#pwd").val()!=$("#pwd-chk").val()){
      // 비밀번호가 서로 다르다 addClass
      $(".pwd-chk-wrap").addClass("error");
      $("#pwd-chk").addClass("error");
      $(".pwd-chk-error-ms").css("display","block");
      // 비밀번호가 같습니다. removeClass
      $(".pwd-chk-wrap").removeClass("pwd-chk-use");
      $("#pwd-chk").removeClass("pwd-chk-use");
      $(".pwd-chk-useable").css("display","none");
    }else{
      // 비밀버호가 서로 다르다 removeClass
      $(".pwd-chk-wrap").removeClass("error");
      $("#pwd-chk").removeClass("error");
      $(".pwd-chk-error-ms").css("display","none");
      // 비밀번호가 같습니다. removeClass
      $(".pwd-chk-wrap").addClass("pwd-chk-use");
      $("#pwd-chk").addClass("pwd-chk-use");
      $(".pwd-chk-useable").css("display","block");
    }


    if($("#pwd-chk").val()==""){
       // 비밀버호가 서로 다르다 removeClass
      $(".pwd-chk-wrap").removeClass("error");
      $("#pwd-chk").removeClass("error");
      $(".pwd-chk-error-ms").css("display","none");
      // 비밀번호가 같습니다. removeClass
      $(".pwd-chk-wrap").removeClass("pwd-chk-use");
      $("#pwd-chk").removeClass("pwd-chk-use");
      $(".pwd-chk-useable").css("display","none");
    }
  }
})


$("#name").on({
  keyup(){
    if($("#name").val().length < 2 || $("#name").val().length > 10){
      // 이름 에러메세지 addClass
      $(".name-wrap").addClass("error");
      $("#name").addClass("error");
      $(".name-error-ms").css("display","block");
      // 사용가능한 이름 removeClass
      $(".name-wrap").removeClass("name-use");
      $("#name").removeClass("name-use");
      $(".name-useable").css("display","none");
    }else{
      //이름 에러메세지 removeClass
      $(".name-wrap").removeClass("error");
      $("#name").removeClass("error");
      $(".name-error-ms").css("display","none");
      // 사용가능한 이름 addClass
      $(".name-wrap").addClass("name-use");
      $("#name").addClass("name-use");
      $(".name-useable").css("display","block");
    }



    if($("#name").val()==""){
      //이름 에러메세지 removeClass
      $(".name-wrap").removeClass("error");
      $("#name").removeClass("error");
      $(".name-error-ms").css("display","none");
    }
  }
})


// 휴대폰번호 : 특수기호를 제거해주세요.
$("#phone-number").on({
  keyup(){
    if(/[`~!@#$%^&*()|;:/,=+.<{\[\]\\}>\-_'"?]/g.test($("#phone-number").val()) || /[a-z]/g.test($("#phone-number").val()) || /[A-Z]/g.test($("#phone-number").val()) || /[가-힣]/g.test($("#phone-number").val()) || /[ㄱ-ㅎ]/g.test($("#phone-number").val()) || /[ㅏ-ㅣ]/g.test($("#phone-number").val()) ){
      // 특수기호를 제거해주세요 addClass
      $(".phone-number-wrap").addClass("error-ms");
      $("#phone-number").addClass("error-ms");
      $(".phone-error-ms").css("display","block");
    }else{
      // 특수기호를 제거해주세요 removeClass
      $(".phone-number-wrap").removeClass("error-ms");
      $("#phone-number").removeClass("error-ms");
      $(".phone-error-ms").css("display","none");
    }

    if(!$("#phone-number").val()==""){
      // 휴대폰번호를 입력해주세요  removeClass
      $(".phone-number-wrap").removeClass("error");
      $("#phone-number").removeClass("error");
      $(".phone-number-error-ms").css("display","none");
    }
  }
})

// 회원가입 버튼
$(".join-btn").on({
  click(){
    if( $("#id").val().length < 4 || $("#id").val().length > 15 ){
      alert("아이디는 4 ~ 15자리 입력해 주세요.")

    }else if($(".id-over-error-ms").hasClass("over-chk")){
      alert("중복된 아이디 입니다.")

    }else if( $("#pwd").val().length > 20 || $("#pwd").val().length < 8 || !/[0-9]/g.test($("#pwd").val()) || !/[a-z]/g.test($("#pwd").val()) || !/[`~!@#$%^&*()|;:/,=+.<{\[\]\\}>\-_'"?]/g.test($("#pwd").val()) || /[\s]/g.test($("#pwd").val()) ){

      alert("공백 제외한 영문, 숫자, 특수기호 조합으로 8 ~ 20자리 입력해주세요.");
      $(".pwd-wrap").addClass("error");
      $("#pwd").addClass("error");
      $(".pwd-error-ms").css("display","block");

    }else if($("#pwd").val()==$("#id").val()){
      alert("아이디와 같은 비밀번호는 사용할 수 없습니다.")

    }else if($("#pwd").val()!=$("#pwd-chk").val()){

      alert("비밀번호가 서로 다릅니다.");
      $(".pwd-chk-wrap").addClass("error");
      $("#pwd-chk").addClass("error");
      $(".pwd-chk-error-ms").css("display","block");

    }else if($("#name").val()=="" || $("#name").val().length < 2 || $("#name").val().length > 10 ){

      alert("이름은 2~10자리 입력해주세요.")
      $(".name-wrap").addClass("error");
      $("#name").addClass("error");
      $(".name-error-ms").css("display","block");

      $("#name").on({
        change(){
          if($("#name").val()!=""){
            $(".name-wrap").removeClass("error");
            $("#name").removeClass("error");
            $(".name-error-ms").css("display","none");
          }
        }
      })

    }else if($("#email").val()==""){
      alert("이메일을 입력해주세요.")
      $(".email-wrap").addClass("error");
      $("#email").addClass("error");
      $(".email-error-ms").css("display","block");

      $("#email").on({
        change(){
          if($("#email").val()!=""){
            $(".email-wrap").removeClass("error");
            $("#email").removeClass("error");
            $(".email-error-ms").css("display","none");
          }
        }
      })
    }else if( $(".email-non-useable").hasClass("non-pass-email") ){
      alert("사용불가능한 이메일입니다.");
      // $(".email-wrap").addClass("error");
      // $("#email").addClass("error");
      // $(".email-error-ms").css("display","block");
    }else if($("#phone-number").val()==""){
      alert("휴대폰번호를 입력해주세요")
      $(".phone-number-wrap").addClass("error");
      $("#phone-number").addClass("error");
      $(".phone-number-error-ms").css("display","block");

      $("#phone-number").on({
        change(){
          if($("#phone-number").val()!=""){
            $(".phone-number-wrap").removeClass("error");
            $("#phone-number").removeClass("error");
            $(".phone-number-error-ms").css("display","none");
          }
        }
      })
    }else if(/[`~!@#$%^&*()|;:/,=+.<{\[\]\\}>\-_'"?]/g.test($("#phone-number").val()) || /[a-z]/g.test($("#phone-number").val()) || /[A-Z]/g.test($("#phone-number").val()) || /[가-힣]/g.test($("#phone-number").val()) || /[ㄱ-ㅎ]/g.test($("#phone-number").val()) || /[ㅏ-ㅣ]/g.test($("#phone-number").val()) ){
      alert("휴대폰번호는 숫자만 입력해주세요.")
      $(".phone-number-wrap").addClass("error-ms");
      $("#phone-number").addClass("error-ms");
      $(".phone-error-ms").css("display","block");
    }else{ // 모든 조건을 다 통과했을 시 submit
      $(".join-form").attr("action","../joinPHP/joinProc.php");
      $(".join-form").attr("method","post");
      $(".join-btn").attr("type","submit");
    }
  }
})

})(jQuery)
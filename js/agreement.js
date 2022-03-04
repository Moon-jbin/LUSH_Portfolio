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




  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 체크박스 

  let cntChk = 0;   // 체크카운트
  
  $(document).on('click','.chk',function(){
    cntChk=0;
    if(!$(this).hasClass('hasChk')){
      $(this).addClass('hasChk')
      $(this).addClass('on')

    }else{
      $(this).removeClass('hasChk')
      $(this).removeClass('on')
    }


    // $(this).addClass('hasChk');
      // .chk를 가진 선택자를 누를때 마다 각각 hasChk 클래스를 갖는다.
    $('.chk').each(function(idx){   // each반복문으로 인해 가질때마다 cntChk의 값을 하나씪 증가 시켜준다 최대가 4까지다.
      if($('.chk').eq(idx).hasClass('hasChk')){
        cntChk++;
        console.log(cntChk)  // 최대 4
      }


      if(cntChk==$('.chk').length){  // 체크카운트, chk 클래스의 갯수가 같다면 addClass('on')
        $('.allAgree').addClass('on')
      }else{
        $('.allAgree').removeClass('on')
      }
    });
  });


  // 전체 동의
  $('.allAgree').on({
    click(){

      if(!$('.allAgree').hasClass('on')){ //전체동의에 on 클래스가 없다면
        $('.allAgree').addClass('on');  // 없다면 addClass
      }else{
        $('.allAgree').removeClass('on'); // 있다면 removeClass
      }

      // 전체 동의 체크박스에 on 클래스가 있다면
      if($(this).hasClass('on')){
        $('.chk').each(function(idx){
          $('.chk').eq(idx).addClass('on');
          $('.chk').eq(idx).addClass('hasChk');
        })
      }else{
        $('.chk').each(function(idx){
          $('.chk').eq(idx).removeClass('on');
          $('.chk').eq(idx).removeClass('hasChk');
        })
      }

    }
  })



  // 선택동의사항
  $('.use-personal-info2').on({
    click(){
      // on가 있다면 아래사항에다가 removeClss, 없다면 아래사항에다가 addClass
      if($(this).hasClass('on')){
        $('.select-agree').removeClass("on")
        $('.select-agree').removeClass("hasChk")
      }else{
        $('.select-agree').addClass("on")
        $('.select-agree').addClass("hasChk")
      }

    }
  })




  // 본인인증방법 선택
  $('.ipin-certification').on({
    click(){
        $(this).addClass('on')
        $('.phone-certification').removeClass('on')
    }
  })

  $('.phone-certification').on({
    click(){
        $(this).addClass('on')
        $('.ipin-certification').removeClass('on')
    }
  })

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//다음단계 넘어 갈 시 필수 사항 채택했는지 확인하기
  $(".next-btn").on({
    click(){
      if($(".use-terms").hasClass("on") && $(".use-personal-info").hasClass("on")){
        location.href="../page/enterInfo.html";
      }else{
        alert("필수 사항을 체크하세요.");
      }
    }
  })



})(jQuery);
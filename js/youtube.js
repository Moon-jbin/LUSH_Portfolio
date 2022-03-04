 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 function onYouTubeIframeAPIReady() {
  // <div id="player"><div>
  new YT.Player('player', {
      videoId: 'uQEktqcWM7w', // 최초 재생할 유튜브 영상 ID
      playerVars: {
        autoplay: false,
        loop: false
      }
   });
 }
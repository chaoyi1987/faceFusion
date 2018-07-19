export default function VueApp(){

  window.onresize = function(){
    ClientH();
  };

  ClientH();
  function ClientH(){
    let bodyH = document.documentElement.clientHeight;
    $("#app").css({"height":bodyH});
  }

  //页面返回监听事件
  window.addEventListener("popstate", function() {
    let currentState = history.state;
    if (currentState === null){
      window.location.reload();
    }
    console.log(currentState);

    /*
     * 该干嘛干嘛
    */
  });

  window.onbeforeunload = function (){
    /*window.location.href = "/addFriends";
    console.log("离开页面！");*/
  };

}


//获取dom元素
//头部dom元素
window.addEventListener('DOMContentLoaded',function () {


    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var headerUpNodes = document.querySelectorAll('.up');
    var contentulNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');
    var contentHeight=contentNode.offsetHeight;
    var arrowHalfWidth=arrowNode.offsetWidth/2;
    var newIndex=0;
    // var wheelTimer=null;



// 头部JS
    arrowNode.style.left=headerLisNodes[0].getBoundingClientRect().left+headerLisNodes[0].offsetWidth/2
        -arrowNode.offsetWidth/2+'px';
    headerUpNodes[0].style.width='100%';
    for (var i = 0; i <headerLisNodes.length; i++) {
        // 找一个变量存起来，让第一个变成黑色
        headerLisNodes[i].index=i;
        // 给每一个li添加事件
        headerLisNodes[i].onclick=function () {
            newIndex = this.index;
            move(newIndex);
        }

    }
// 公共move函数
    function move(newIndex) {
        //默认清空所有width为0
        for (var j = 0; j < headerUpNodes.length; j++) {
            headerUpNodes[j].style.width='0';
        }
        // 设置当前width为100%
        headerUpNodes[newIndex].style.width='100%';
        // 点击哪小三角区哪
        arrowNode.style.left=headerLisNodes[newIndex].getBoundingClientRect().left+headerLisNodes[newIndex].offsetWidth/2
            -arrowHalfWidth+'px';
        // 让内容区ul运动
        contentulNode.style.top=-newIndex*contentHeight+'px';
    }
    move(4);



    // 滚轮事件
    contentHandle();
    function contentHandle() {
        document.onmousewheel=wheel;
        document.addEventListener('DOMMouseScroll',wheel);
        var wheelTimer = null;
        function wheel(event) {
            event = event || window.event;
            clearTimeout(wheelTimer);
            wheelTimer=setTimeout(function(){
                var flag='';
                if (event.wheelDelta) {
                    //ie/chrome
                    if (event.wheelDelta > 0) {
                        flag = 'down';
                    } else {
                        flag = 'up';
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'down';
                    } else {
                        flag = 'up'
                    }
                }

                switch (flag) {
                    case 'down' :
                        if(newIndex>0) {
                            newIndex--;
                            console.log('down');
                            move(newIndex);
                        }
                        break;
                    case 'up' :
                        if(newIndex<4){
                            newIndex++;
                            console.log('up');
                            move(newIndex);
                        }

                        break;
                }
            },200);
            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }
    // // //浏览器调整窗口大小事件
            window.onresize=function () {
    // //     //修正小箭头的位置和ul位置
            arrowNode.style.left=headerLisNodes[newIndex].getBoundingClientRect().left+headerLisNodes[newIndex].offsetWidth/2
                -arrowHalfWidth+'px';
             // 让内容区ul运动
             contentulNode.style.top=-newIndex*contentHeight+'px';
        }

        firstViewHandle();
        function firstViewHandle() {
            var homeCarouselNodes = document.querySelectorAll('.home-carousel li');
            var homePointNodes = document.querySelectorAll('.home-point li');
            var homeNode = document.querySelector('.home');
            var lastIndex = 0;
            var nowIndex = 0;
            var lastTime = 0;
            var timer = null;

            for (var i = 0; i < homePointNodes.length; i++) {
                homePointNodes[i].index = i;
                homePointNodes[i].onclick = function () {
                    //    函数节流：规定时间内，只让第一次生效，后面不生效
                    //    如果点击是时间超过两秒不生效
                    var nowTime = Date.now();
                    console.log(nowTime);
                    if (nowTime - lastTime <= 2000)return;
                    lastTime = nowTime;


                    //    同步nowIndex的值
                    nowIndex = this.index;
                    // 如果点击同一个就啥也不做
                    if (nowIndex === lastIndex)return;
                    if (nowIndex > lastIndex) {
                        //点击是右边  右边加上right-show 左边加上 left-hide
                        homeCarouselNodes[nowIndex].className = 'common-title right-show';
                        homeCarouselNodes[lastIndex].className = 'common-title left-hide';
                    } else {
                        homeCarouselNodes[nowIndex].className = 'common-title left-show';
                        homeCarouselNodes[lastIndex].className = 'common-title right-hide';

                    }
                    //修正小圆点的显示
                    homePointNodes[lastIndex].className = '';
                    this.className = 'active';

                    lastIndex = nowIndex;


                }
            }

            homeNode.onmouseenter = function () {
                clearInterval(timer);
            }
            homeNode.onmouseleave = autoPlay;

            //自动轮播
            autoPlay();
            function autoPlay() {
                timer = setInterval(function () {
                    nowIndex++;

                    //同步上一次点击时间，为了在轮播是用户不能点击小圆点
                    lastTime=Date.now();


                    if (nowIndex >= 4) nowIndex = 0;
                    homeCarouselNodes[nowIndex].className = 'common-title right-show';
                    homeCarouselNodes[lastIndex].className = 'common-title left-hide';
                    homePointNodes[lastIndex].className = '';
                    homePointNodes[nowIndex].className = 'active';
                    //同步
                    lastIndex = nowIndex;
                }, 2000)
            }

        }


 //第五屏
        listViewHandle();
        function listViewHandle() {
          var teamUlNode = document.querySelector('.team_person');
          var teamLiNodes = document.querySelectorAll('.team_person li');

          var width = teamLiNodes[0].offsetWidth;
          var height = teamLiNodes[0].offsetHeight;
          var canvas = null;
          var createCircleTimer = null;
          var paintingTimer = null;

          for (var i = 0; i < teamLiNodes.length; i++) {
            teamLiNodes[i].index = i;
            teamLiNodes[i].onmouseenter = function () {
              for (var j = 0; j < teamLiNodes.length; j++) {
                teamLiNodes[j].style.opacity = 0.5;
              }

              this.style.opacity = 1;

              //  创建画布
              if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.className = 'canvas';
                bubble(canvas);
                teamUlNode.appendChild(canvas);
              }
              canvas.style.left = this.index * width + 'px';
            }
          }

          teamUlNode.onmouseleave = function () {
            for (var j = 0; j < teamLiNodes.length; j++) {
              teamLiNodes[j].style.opacity = 1;
            }
            //    清除画布
            canvas.remove();
            canvas = null;
            //  清除定时器
            clearInterval(createCircleTimer);
            clearInterval(paintingTimer);
          }

          function bubble(canvas) {
            if (canvas.getContext) {
              var ctx = canvas.getContext('2d');
              var width = canvas.width;
              var height = canvas.height;
              var arr = [];
              //    生成圆
              createCircleTimer = setInterval(function () {
                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);

                var c_r = Math.round(Math.random() * 8 + 2);
                var s = Math.round(Math.random() * 50 + 20);
                var y = height + c_r;
                var x = Math.round(Math.random() * width);

                //  添加到数组
                arr.push({
                  r: r,
                  g: g,
                  b: b,
                  c_r: c_r,
                  s: s,
                  x: x,
                  y: y,
                  deg: 0,
                })
              }, 20);

              //  画圆
              paintingTimer = setInterval(function () {
                ctx.clearRect(0, 0, width, height);
                for (var i = 0; i < arr.length; i++) {
                  var item = arr[i];
                  item.deg += 6;
                  var rad = item.deg * Math.PI / 180;
                  var x = item.x + Math.sin(rad) * item.s;
                  var y = item.y - rad * item.s;
                  if (y <= -item.c_r) {
                    arr.splice(i, 1);
                    continue;
                  }

                  ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
                  ctx.beginPath();
                  ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
                  ctx.fill();

                }
              }, 1000 / 60)
            } else {
              alert('您的浏览器不支持canvas');
            }

          }

        }


 })


    


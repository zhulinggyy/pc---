
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
    move(1);



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
                    if (nowTime - lastIndex <= 2000)return;
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
                        homeCarouselNodes[nowIndex].className = 'common-title right-show';
                        homeCarouselNodes[lastIndex].className = 'common-title left-hide';

                    }
                    //修正小圆点的显示
                    homePointNodes[lastIndex].className = '';
                    this.className = 'active';


                }
            }

            homeNode.onmouseenter = function () {
                clearInterval(timer);
            }
            homeNode.onmouseleave = autoPlay;

            autoPlay();
            function autoPlay() {
                timer = setInterval(function () {
                    nowIndex++;
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





 })


    


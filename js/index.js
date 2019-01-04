
//获取dom元素
//头部dom元素
window.onload=function() {
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var headerUpNodes = document.querySelectorAll('.up');


// 头部JS
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0]
            .offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
    console.log(headerLisNodes[0].getBoundingClientRect().left);
    headerUpNodes[0].style.width='100%';
    for (var i = 0; i < headerLisNodes.length; i++) {
        headerLisNodes[i].index = i;
        headerLisNodes[i].onclick = function () {
            for (var j = 0; j < headerUpNodes.length; j++) {
                headerUpNodes[j].style.width='0';
            }
            headerUpNodes[this.index].style.width='100%';
            arrowNode.style.left = this.getBoundingClientRect().left + this
                    .offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
        }
    }

}



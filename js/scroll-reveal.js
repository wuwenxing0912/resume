! function() {
    var config = {
        reset: false, // 滚动鼠标时，动画开关(默认是false没有打开鼠标滚动的动画开关)
        //origin: 'right', // 动画开始的方向
        duration: 2000, // 动画持续时间
        delay: 0, // 延迟
        rotate: { x: 360, y: 360, z: 360 }, // 过度到0的初始角度
        opacity: 0, // 初始透明度  (0.2到1的效果)
        scale: 1, //缩放
        easing: 'ease-in-out', //动画效果// 缓动'ease', 'ease-in-out'，'linear',easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
        // 回调函数
        //当动画开始之前会被触发
        beforeReveal: function(domEl) {
            //console.log('动画执行了');
        },
        //鼠标滚轮滚动之前会被触发
        beforeReset: function(domEl) {
            //console.log('滚轮开始---');
        },
        //动画开始之后会被触发
        afterReveal: function(domEl) {
            // console.log('动画结束了');
        },
        //滚轮滚动之后会被触发
        afterReset: function(domEl) {
            //console.log('滚轮结束了');
        }
    };

    window.sr = ScrollReveal();

    sr.reveal('.userCard', config);
    sr.reveal('.skills', { rotate: { x: 0, y: 0, z: 0 } }, config);
    sr.reveal('.portfolio', { rotate: { x: 0, y: 0, z: 0 } }, config);
    sr.reveal('#formAndMessageList', { rotate: { x: 0, y: 0, z: 0 } }, config);
}.call()
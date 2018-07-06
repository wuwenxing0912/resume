! function() {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function(view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function() {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function(element) {
            let top = element.offsetTop;
            //window.scrollTo(0, top - 80);
            let currentTop = window.scrollY;
            let targetTop = top - 80;
            let s = targetTop - currentTop; //跳跃的距离
            var coords = {
                y: currentTop
            }; //起始位置
            var t = Math.abs((s / 100) * 300); //跳跃的时间
            if (t > 500) {
                t = 500;
            }
            var tween = new TWEEN.Tween(coords) //起始位置
                .to({
                    y: targetTop
                }, t) //结束位置与时间
                .easing(TWEEN.Easing.Quadratic.InOut) //缓动类型
                .onUpdate(function() {
                    //改变了coords.y
                    window.scrollTo(0, coords.y) //跳跃动作
                })
                .start();
        },
        bindEvents: function() {
            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    if (x.currentTarget.className === 'blog') {

                    } else if (x.currentTarget.className === 'github') {

                    } else {
                        x.preventDefault(); //阻止浏览器默认行为
                        let a = x.currentTarget;
                        let href = a.getAttribute('href'); //href代码中设定的
                        //console.log(a.href); //href浏览器处理过的
                        let element = document.querySelector(href);
                        this.scrollToElement(element)
                    }

                }
            }
        }
    }
    controller.init(view)
}.call()
! function() {
    var view = document.querySelector('section.message')

    var model = {
        //读取数据
        init: function() {
            var APP_ID = '3Y8k0qDS6DWP4fVmYkUDWWec-gzGzoHsz';
            var APP_KEY = 'NUQxVPzYtT7oNC6iJxyS4yCw';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function() {
            var query = new AV.Query('Message')
            return query.find() //Promise对象
        },
        //保存数据
        save: function(name, content) {
            //创建Message表
            var Message = AV.Object.extend('Message')
                //在表中创建一行数据
            var message = new Message()
                //数据内容为content(即留言)
            return message.save({ //Promise对象
                name: name,
                content: content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,
        postMessageForm: null,
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.postMessageForm = view.querySelector('#postMessage')
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage: function() {
            this.model.fetch().then(
                (messages) => {
                    var array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        var li = document.createElement('li')
                        li.innerText = `${item.name}:${item.content}`
                        messageList.appendChild(li)
                    })

                })
        },
        bindEvents: function() {
            //console.log(this)
            this.postMessageForm.addEventListener('submit', (e) => {
                e.preventDefault() //阻止默认事件(提交后会刷新页面)
                    //console.log(this)
                this.saveMessage()
            })
        },
        saveMessage: function() {
            var postMessageForm = this.postMessageForm
            var content = postMessageForm.querySelector('input[name=content]').value
            var name = postMessageForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                var li = document.createElement('li')
                var messageList = document.querySelector('#messageList')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                messageList.appendChild(li)
                postMessageForm.querySelector('input[name=content]').value = ''
                    //console.log(object)
            })
        }
    }
    controller.init(view, model)
}.call()











// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function(object) {
//     alert('LeanCloud Rocks!');
// })
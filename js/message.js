! function() {
    var view = document.querySelector('#formAndMessageList')

    var model = {
        init: function() {
            var APP_ID = '3Y8k0qDS6DWP4fVmYkUDWWec-gzGzoHsz';
            var APP_KEY = 'NUQxVPzYtT7oNC6iJxyS4yCw';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        read: function() {
            var query = new AV.Query('Message')
            return query.descending('createdAt').find()
        },
        save: function(nameContent, emailContent, messageContent) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                name: nameContent,
                email: emailContent,
                message: messageContent
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        myForm: null,
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.myForm = view.querySelector('#myForm')
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage: function() {
            this.model.read().then((informations) => {
                //console.log(informations)
                var arrayAttributes = informations.map((item) => item.attributes)
                var arrayCreatedAt = informations.map((item) => item.createdAt)
                    //console.log(arrayAttributes)
                    //console.log(arrayCreatedAt)

                for (var i = 0; i < arrayAttributes.length; i++) {
                    var li = document.createElement('li')
                        //arrayAttributes.forEach((item) => {
                        //console.log(item)
                        // var li = document.createElement('li')
                        //li.innerText = `${item.name}(${item.email}):${item.message} `
                        //messageList.appendChild(li)
                        //console.log(arrayAttributes[i])
                    var divInfo = document.createElement('div')
                        //console.log(item)
                    divInfo.className = 'touristInfo'
                    spanName = document.createElement('span')
                    spanName.className = 'name'
                    spanText = document.createElement('span')
                    spanText.className = 'text'
                    spanName.innerText = arrayAttributes[i].name
                    spanText.innerText = arrayAttributes[i].message
                    divInfo.appendChild(spanName)
                    divInfo.appendChild(spanText)
                    li.appendChild(divInfo)
                        //console.log(1)


                    // })
                    //arrayCreatedAt.forEach((item) => {
                    //console.log(item)
                    //console.log(arrayCreatedAt[i])
                    var divTime = document.createElement('div')
                    divTime.className = 'time'
                    divTime.innerText = this.dateToNormal(arrayCreatedAt[i])
                    li.appendChild(divTime)
                        //})
                    messageList.appendChild(li)
                }
            })
        },
        bindEvents: function() {
            this.myForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMessage()
            })
        },
        saveMessage: function() {
            var myForm = this.myForm
            var nameContent = myForm.querySelector('input[name=name]').value
            var emailContent = myForm.querySelector('input[name=email]').value
            var messageContent = myForm.querySelector('textarea').value

            this.model.save(nameContent, emailContent, messageContent)
                .then((object) => {
                    var li = document.createElement('li')
                    var divInfo = document.createElement('div')
                    console.log(object)
                    divInfo.className = 'touristInfo'
                    spanName = document.createElement('span')
                    spanName.className = 'name'
                    spanText = document.createElement('span')
                    spanText.className = 'text'
                    var divTime = document.createElement('div')
                    divTime.className = 'time'
                        //li.innerText = `${object.attributes.name}(${object.attributes.email}): ${object.attributes.message} `
                    spanName.innerText = object.attributes.name
                    spanText.innerText = object.attributes.message
                        //console.log(object.createdAt)
                        //console.log(this.dateToNormal)
                    divTime.innerText = this.dateToNormal(object.createdAt)

                    divInfo.appendChild(spanName)
                    divInfo.appendChild(spanText)
                    li.appendChild(divInfo)
                    li.appendChild(divTime)

                    var firstLi = messageList.firstChild
                    messageList.insertBefore(li, firstLi)
                    myForm.querySelector('textarea').value = ''
                })
        },
        dateToNormal: function(GMT8Date) {
            var date = new Date(GMT8Date);
            return date_value = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' + date.getHours() + ':' + date.getMinutes();
        }


    }
    controller.init(view, model)


}.call()
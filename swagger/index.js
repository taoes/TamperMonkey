// ==UserScript==
// @name         Swagger 授权插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Swagger 授权信息生成器
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @author       周涛
// @match        http://localhost:8080/swagger-ui.html
// @match        https://api.unionfab.com/swagger-ui.html
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/noauth/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "4fff9deb-a52f-4626-8a53-a373fd9c5c08"
        },
        "processData": false,
        "data": "{\n  \"credential\": \"123\",\n  \"credentialType\": \"PASSWORD\",\n  \"username\": \"123\"\n}"
    }

    var apiReuest = function(){
        $.ajax(settings).done(function (response) {
            window.prompt("请手动复制文本框的内容","Bearer " + response.data.token)
        });
    }


    setTimeout(() => {
        var wrapper = document.getElementsByClassName('auth-wrapper');
        var button = document.createElement('div')
        button.onclick = apiReuest
        button.innerHTML = `<button class="btn authorize locked"><span>生成授权</span><svg width="20" height="20"><use href="#locked" xlink:href="#locked"></use></svg></button>`
        console.log(wrapper.length)
        wrapper[0].appendChild(button)
    }, 2000);
})();

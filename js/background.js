'use strict';

var inUser;
var resAjax;
var url;
var time;
var sound;

chrome.storage.sync.get({
    token: '',
    idUser: '',
    time: '',
    sound: true
}, function (items) {
    if (items.token && items.idUser && items.time) {
        url = 'https://api.vk.com/method/users.get?user_ids=' + items.idUser + '&fields=online&access_token=' + items.token + '&v=5.92';
        time = items.time * 1000 * 60;
        sound = items.sound;

        if (getAjax()) {
            inUser = true;
        } else {
            inUser = false;
            chrome.browserAction.setBadgeText({text: 'OFF'});
            chrome.browserAction.setBadgeBackgroundColor({color: '#980505'});
            if (sound) {
                var audio = new Audio();
                audio.src = 'sound/out.mp3';
                audio.autoplay = true;
            }
        }

        setInterval(function func() {
            if (getAjax()) {
                if (!inUser) {
                    inUser = true;

                    chrome.browserAction.setBadgeText({text: 'ON'});
                    chrome.browserAction.setBadgeBackgroundColor({color: '#19953a'});

                    chrome.cookies.set({
                        'name': 'startTime',
                        'url': 'https://api.vk.com',
                        'value': new Date().toString()
                    });
                    chrome.cookies.set({
                        'name': 'endTime',
                        'url': 'https://api.vk.com',
                        'value': ''
                    });
                    if (sound) {
                        var audio = new Audio();
                        audio.src = 'sound/in.mp3';
                        audio.autoplay = true;
                    }
                }
            } else {
                if (inUser) {
                    inUser = false;

                    chrome.browserAction.setBadgeText({text: 'OFF'});
                    chrome.browserAction.setBadgeBackgroundColor({color: '#980505'});

                    chrome.cookies.set({
                        'name': 'endTime',
                        'url': 'https://api.vk.com',
                        'value': new Date().toString()
                    });
                    if (sound) {
                        var audio = new Audio();
                        audio.src = 'sound/out.mp3';
                        audio.autoplay = true;
                    }
                }
            }
        }, time);
    }
});


function getAjax() {

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        cache: false
    })
        .done(function (data) {
            console.log(JSON.stringify(data, null, 4));
            resAjax = data.response[0].online;
        });
    return resAjax;
}

chrome.runtime.onInstalled.addListener(function () {
    /*chrome.storage.sync.get({
        token:  '',
        idUser: '',
        time:   '',
        sound:  true
    }, function(items) {
        console.log(JSON.stringify(items, null, 4));
    });*/
});

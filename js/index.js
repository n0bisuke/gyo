(function($){
    var init_cnt = 0;
    if(localStorage.gyo_count){
        $('.init').remove();
        $('.suisou').show();
    }else{//初アクセス
        $('.init').on('click', function(){
            if(init_cnt == 0){
                $('.init img').attr('src', 'image/tutorial2.png');
            }else if(init_cnt == 1){
                $('.init img').attr('src', 'image/tutorial3.png');
            }else if(init_cnt == 2){
                $('.init').remove();
                $('.suisou').show();
                audio.play();
            }
            init_cnt++;
        });

        Gyo.init();
    }

    $('.gyo').on('click', gyoPush); //ぎょっ

    //GYO描画
    var gyo_count = Gyo.gyoGet();
    var html = '';
    for (var i = 0; i < gyo_count; i++)html += '<div class="fish"></div>';
    $('.gyo').append(html);

})(jQuery);

//gyoDataStore.on("push", getGyo);
gyoDataStore.on("push", function(data){
    console.log("push受信",data);
});

gyoDataStore.on("send", function(data){
    console.log("send受信",data);
    audio.play();

    if(data.value.my_id !== my_id){
        //SUKUUに金魚
        $('.sukuu_fish').addClass('swim').show();
        setTimeout(function(){
            $('.sukuu_fish').hide().removeClass('swim');
        }, 1000);
    }

});

function gyoPush(){
    var lat = '',
        lon = '';
    
    // if(typeof(gyo_locale.coords.latitude) != 'undefined') lat = gyo_locale.coords.latitude;
    // if(typeof(gyo_locale.coords.longitude) != 'undefined') lon = gyo_locale.coords.longitude;

    // gyoDataStore.push({lat:lat, lon:lon},function(data){
    //     console.log("push送信完了!",data);
    // });
    
    audio.play(); //GYO!!SOUND
    var current_gyo = Gyo.gyoGet() - 1;
    
    //10回まで
    if(current_gyo >= 0){ //通常系
        gyo_anime('image/gyo_gold_fish_loop.gif'); //通常ゴミ運び
        Gyo.gyoSave(current_gyo); //ローカルストレージの値更新
        $('.fish:last-child').remove(); //金魚を減らす

        gyoDataStore.send({lat:lat, lon:lon, time:now_time, my_id: my_id, type: 'gyo'},function(data){
            console.log("send送信完了!",data);
        });
        gyoDataStore.push({lat:lat, lon:lon, time:now_time, my_id: my_id, type: 'gyo'},function(data){
            console.log("push送信完了!",data);
        });

    }else{ //異常系
        gyo_anime('image/gyo_gold_fish_notdust_loop.gif'); //ゴミなくなる

        gyoDataStore.send({lat:lat, lon:lon, time:now_time, my_id: my_id, type: 'gyo'},function(data){
            console.log("send送信完了!",data);
        });
    }

}

//gyoのアニメーション
function gyo_anime(type){
    // console.log("たいぷ", type);
    // var srcurl = '';
    // if(type === 'normal'){
    //     srcurl = 'image/gyo_gold_fish_loop.gif';
    // }else if(type === 'done'){
    //     srcurl = 'image/gyo_gold_fish_notdust_loop.gif';
    // }
    var srcurl = type;
    $('.gyo_text').attr('src',srcurl);

    setTimeout(function(){
        $('.gyo_text').attr('src','image/gyo_gold_fish.gif');
    }, 100);
}
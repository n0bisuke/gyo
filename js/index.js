(function($){
    if(localStorage.gyo_count){

    }else{//初アクセス
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
    
    if(gyo_locale.coords.latitude) lat = gyo_locale.coords.latitude;
    if(gyo_locale.coords.longitude) lon = gyo_locale.coords.longitude;
    // gyoDataStore.push({lat:lat, lon:lon},function(data){
    //     console.log("push送信完了!",data);
    // });
    
    audio.play(); //GYO!!SOUND
    gyo_anime();

    var current_gyo = Gyo.gyoGet() - 1;
    //10回まで
    if(current_gyo >= 0){
        Gyo.gyoSave(current_gyo);
        $('.fish:last-child').remove();

        gyoDataStore.send({lat:lat, lon:lon, time:now_time, my_id: my_id},function(data){
            console.log("send送信完了! おーばー",data);
        });
    }else{

        gyoDataStore.send({lat:lat, lon:lon, time:now_time, my_id: my_id},function(data){
            console.log("send送信完了!",data);
        });
    }

}

//gyoのアニメーション
function gyo_anime(){
    $('.gyo_text').attr('src','image/gyo_gold_fish_loop.gif');
    setTimeout(function(){
        $('.gyo_text').attr('src','image/gyo_gold_fish.gif');
    }, 100);
}
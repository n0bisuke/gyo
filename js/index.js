(function($){
    if(localStorage.gyo){

    }else{//初アクセス
        Gyo.init();
    }

    $('.gyo').on('click', gyoPush); //ぎょっ

    //GYO描画
    var gyo_count = 10;
    var html = '';
    for (var i = 1; i <= gyo_count; i++)html += '<div class="fish_'+ i +'"></div>';
    $('.gyo').append(html);

})(jQuery);

//gyoDataStore.on("push", getGyo);
gyoDataStore.on("push", function(data){
    console.log("push受信",data);
});

gyoDataStore.on("send", function(data){
    console.log("send受信",data);

    if(data.value.time !== now_time){
        //SUKUUに金魚
        $('.sukuu_fish').addClass('swim');
        setTimeout(function(){
            $('.sukuu_fish').removeClass('swim');
        }, 1000);
    }
});

function gyoPush(){
    var lat = gyo_locale.coords.latitude;
    var lon = gyo_locale.coords.longitude;
    // gyoDataStore.push({lat:lat, lon:lon},function(data){
    //     console.log("push送信完了!",data);
    // });
    
    $('.gyo_text').attr('src','image/gyo_gold_fish_loop.gif');
    setTimeout(function(){
        $('.gyo_text').attr('src','image/gyo_gold_fish.gif');
    }, 100);

    gyoDataStore.send({lat:lat, lon:lon, time:now_time},function(data){
        console.log("send送信完了!",data);
    });
}
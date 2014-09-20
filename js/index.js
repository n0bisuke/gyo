(function($){
    if(localStorage.gyo){

    }else{//初アクセス
        Gyo.init();
    }

    $('.gyo').on('click', gyoPush); //ぎょっ

    //GYO描画
    var gyo_count = 1;
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
});

function gyoPush(){
    var lat = gyo_locale.coords.latitude;
    var lon = gyo_locale.coords.longitude;
    // gyoDataStore.push({lat:lat, lon:lon},function(data){
    //     console.log("push送信完了!",data);
    // });
    
    gyoDataStore.send({lat:lat, lon:lon},function(data){
        console.log("send送信完了!",data);
        $('.gyo img').attr('src','image/gyo_gold_fish.gif');
    });
}

function getGyo(data){
    console.log("GYO!!!受信",data);
}

function sukuuFunc(){
    alert("aaa");
}
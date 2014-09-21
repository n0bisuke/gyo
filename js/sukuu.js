(function($){
    if(localStorage.gyo){

    }else{//初アクセス
        Gyo.init();
    }

    $('.mizu').on('click', sukuu); //ぎょっ

    //GYO描画
    // var gyo_count = 10;
    // var html = '';
    // for (var i = 1; i <= gyo_count; i++)html += '<div class="fish_'+ i +'"></div>';
    // $('.gyo').append(html);

})(jQuery);

function sukuu(){
    //ぽいアニメーション
    $('.poi').show();
    audio.play(); //GYO!!SOUND
    setTimeout(function(){
        $('.poi').hide();
    }, 500);
    //金魚けそう
    $('.poi_fish:last-child').remove();

    Gyo.sukuu(); //すくった

    setTimeout(function(){
        if(0 >= $(".poi_fish").size()){
            alert("きれいになりました!!");
            location.href="./";
        }
    }, 500);
}

gyoDataStore.on("send", function(data){
    console.log("send受信",data);
    $('.mizu').append('<div class="fish_swim poi_fish"></div>');
});
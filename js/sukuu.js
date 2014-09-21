(function($){
    if(localStorage.gyo_count){

    }else{//初アクセス
        //Gyo.init();
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
    
    gyoDataStore.send({time:now_time, my_id: my_id, type: 'sukuu'},function(data){
        console.log("sukuuuu!",data);
    });

    Gyo.sukuu(); //すくった

    setTimeout(function(){
        if(0 >= $(".poi_fish").size()){
            alert("きれいになりました!!");
            location.href="./";
        }
    }, 500);
}

//イベント受信
gyoDataStore.on("send", function(data){
    console.log("send受信",data);
    
    if(data.value.type == 'gyo'){
        $('.mizu').append('<div class="fish_swim poi_fish"></div>');
    }else if(data.value.type == 'sukuu' && data.value.my_id != my_id){
       $('.poi_fish:last-child').remove(); 
   }
   
});
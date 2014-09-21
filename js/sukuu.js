(function($){
    if(localStorage.gyo_count){

    }else{//初アクセス
        //Gyo.init();
    }

    $('.mizu').on('click', sukuu); //ぎょっ
    var db_count = 0;
    
    milkcocoa.dataStore('chat').query({type : 'gyo'}).done(function(basic_users) {
        console.log('basic users', basic_users[0].id);
        db_count = basic_users.length;
        var html = '';
        for (var i = 0; i < db_count; i++){
            var item = basic_users[i];
            html += '<div class="fish_swim poi_fish" data-id="'+ item.id +'"></div>';
        }
        $('.mizu').append(html);
    });

    // //GYO描画
    // var gyo_count = 10;
    // var html = '';

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

    var data_id = $('.poi_fish:last-child').attr('data-id');
    $('.poi_fish:last-child').remove();

    gyoDataStore.send({time:now_time, my_id: my_id, type: 'sukuu'},function(data){
        console.log("sukuuuu!",data);
    });
    
    milkcocoa.dataStore('chat').query().done(function(data) {
        data.forEach(function(value) {
            dataStore.remove(data_id);
        });
    });

    console.log('data-id',data_id);

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
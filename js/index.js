(function($){
    if(localStorage.gyo){

    }else{//初アクセス
        Gyo.init();
    }

    $('.gyo').on('click', gyoPush);
    $('.sukuu').on('click', sukuuFunc);
    gyoDataStore.on("push", getGyo);

    var html = '';
    var gyo_count = 8;
    for (var i = 1; i <= gyo_count; i++) {
        html += '<div class="fish_'+ i +'"></div>';
    }
    $('.gyo').append(html);

})(jQuery);

function gyoPush(){
    // $(this).css({transform:'scale(' + 1 + ')'});

    console.log("GYO!!!!");
    var text = 'GYO';

    gyoDataStore.push({message : "aaa"},function(data){
        console.log("送信完了!");
    });
}

function getGyo(data){
    console.log("GYO!",data);
}

function sukuuFunc(){
    alert("");
}
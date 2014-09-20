(function($){
    if(localStorage.gyo){
        
    }else{//初アクセス
    	Gyo.init();
    }

    console.log("YO!!!!");
    $('.gyo').on('click', gyoPush);
    gyoDataStore.on("push", getGyo);

})(jQuery);

function gyoPush(){
    console.log("GYO!!!!");
    var text = 'GYO';
    
    gyoDataStore.push({message : "aaa"},function(data){
        console.log("送信完了!");
    });
}

function getGyo(data){
	console.log("GYO!",data);
}
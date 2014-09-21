var milkcocoa = new MilkCocoa("https://io-ui0aozptu.mlkcca.com");
var gyo_locale; //位置情報
var gyoDataStore = milkcocoa.dataStore("chat");
var now_time = new Date();
var my_id = Math.random();
var Gyo = {
	gyo_user: {
		'user_id': '',
		'collection': 10
	},

	init: function(){
		localStorage.gyo = JSON.stringify(this.gyo_user);
	},
	gyoGet: function(){
		return JSON.parse(localStorage.gyo).collection;
	}

};


//ユーザーの現在の位置情報を取得
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

/***** ユーザーの現在の位置情報を取得 *****/
function successCallback(position) {
	gyo_locale = position;
}

/***** 位置情報が取得できない場合 *****/
function errorCallback(error) {
  var err_msg = "";
  switch(error.code)
  {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
  //alert(err_msg);
}

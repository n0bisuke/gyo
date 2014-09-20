var milkcocoa = new MilkCocoa("https://io-ui0aozptu.mlkcca.com");
var gyoDataStore = milkcocoa.dataStore("chat");

var Gyo = {
	gyo_user: {
		'user_id': '',
		'collection': [1,2,3,5]
	},

	init: function(){
		localStorage.gyo = JSON.stringify(this.gyo_user);
	},

	gyoGet: function(){
		return JSON.parse(localStorage.gyo).collection;
	}
};
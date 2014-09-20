var milkcocoa = new MilkCocoa("https://io-ui0aozptu.mlkcca.com/");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var gyoDataStore = milkcocoa.dataStore("chat");

var textArea, board;
window.onload = function(){
  textArea = document.getElementById("msg");
  board = document.getElementById("board");
}

function clickEvent(){
  var text = textArea.value;
  sendText(text);
}

function sendText(text){
  gyoDataStore.push({message : text},function(data){
    console.log("送信完了!");
    textArea.value = "";
  });
}

gyoDataStore.on("push",function(data){
  addText(data.value.message);
});

function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = text;
  board.insertBefore(msgDom, board.firstChild);
}
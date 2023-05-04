document.body.onload = function(){
   document.body.innerHTML = "";
   let fstPlayerMenu = document.createElement('div');
   fstPlayerMenu.className = "PlayerMenu";
   fstPlayerMenu.id = "fstPlayerMenu";
   document.body.append(fstPlayerMenu);

   let fstskin = [];
   for (let index = 0; index < 4; index++) {
      fstskin[index] = document.createElement('div');
      fstPlayerMenu.append(fstskin[index])
      fstskin[index].id = "fstskin" + index;
      fstskin[index].className = "skin";
   }
   
   let centerMenu = document.createElement('div');
   //sndPlayerMenu.className = "PlayerMenu";
   centerMenu.id = "centerMenu";
   document.body.append(centerMenu);

   let name = document.createElement('div');
   name.className = 'name';
   name.innerText = 'Fighting';
   centerMenu.append(name);
   
   let button = document.createElement('div');
   button.id = 'startButton';
   button.className = 'name';
   button.innerText = 'Start';
   centerMenu.append(button)
   button.addEventListener('click', startLevel);

   let sndPlayerMenu = document.createElement('div');
   sndPlayerMenu.className = "PlayerMenu";
   sndPlayerMenu.id = "sndPlayerMenu";
   document.body.append(sndPlayerMenu);

   let sndskin = [];
   for (let index = 0; index < 4; index++) {
      sndskin[index] = document.createElement('div');
      sndPlayerMenu.append(sndskin[index])
      sndskin[index].id = "sndskin" + index;
      sndskin[index].className = "skin";
   }
   document.getElementById("fstskin" + 0).style.border = "solid 5px white";
   document.getElementById("sndskin" + 0).style.border = "solid 5px white";
   gameLoop();
}

//создание элементов


var keyState = {};
window.addEventListener('keydown', function(key){
      keyState[key.keyCode || key.which] = true;
}, true);
window.addEventListener('keyup',function(key){
   keyState[key.keyCode || key.which] = false;
},true);

const KeyWords = {
   LEFTARROW: 37,
   UPARROW: 38,
   RIGHTARROW: 39,
   DOWNARROW: 40,
   W: 87,
   A: 65,
   S: 83,
   D: 68
}

var fstskin = 0;
var sndskin = 0;

function startLevel(){
   localStorage[1] = fstskin;
   localStorage[0] = sndskin;
   document.location.href = 'level.html'
}
function gameLoop(){

   if(keyState[KeyWords.A] == true){
      document.getElementById("fstskin" + fstskin).style.border = "solid 5px gold";
      fstskin--;
   }
   if(keyState[KeyWords.D] == true){
      document.getElementById("fstskin" + fstskin).style.border = "solid 5px gold";
      fstskin++;
   }
   if(keyState[KeyWords.LEFTARROW] == true){
      document.getElementById("sndskin" + sndskin).style.border = "solid 5px gold";
      sndskin--;
   }
   if(keyState[KeyWords.RIGHTARROW] == true){
      document.getElementById("sndskin" + sndskin).style.border = "solid 5px gold";
      sndskin++;
   }
   fstskin = Math.abs(fstskin % 4);
   sndskin = Math.abs(sndskin % 4);

   document.getElementById("fstskin" + fstskin).style.border = "solid 5px white";
   document.getElementById("sndskin" + sndskin).style.border = "solid 5px white";

   setTimeout(gameLoop, 200);
}
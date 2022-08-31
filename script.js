var keyState = {};
window.addEventListener('keydown', function(key){
      keyState[key.keyCode || key.which] = true;
}, true);
window.addEventListener('keyup',function(key){
   keyState[key.keyCode || key.which] = false;
},true);

const g = 0.1;

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

class Player{
   #collisionWidth = 23;
   #collisionHeight = 56;
   #Animateleft = -10;
   #Animatetop = -15;
   #AnimateWidth = 110;
   #AnimateHeight = 74;
   #hp = 100;
   #lifesCount = 3;
   #playerLeftSpawnPoint = 0;
   #playerTopSpawnPoint = 0;
   #playerLeft = 0;
   #playerTop = 0;
   
   #jumpImpuls = -10;
   #playerOrdinateSpeed = 0;
   #playerSpeed = 5;

   
   #elementAdress;
   #elementAnimationAdress;
   #healthBarAdress;
   #lifeCountBarAdress;
   
   #playerDirection = true;
   #playerInAttack = 0;
   #playerInTakeHit = 0;
   #playerInDeath = 0;

   constructor(element){
      this.#elementAdress = element;
      this.#playerLeftSpawnPoint = this.#elementAdress.style.left.slice(0, -2);
      this.#playerTopSpawnPoint = this.#elementAdress.style.top.slice(0, -2);
      this.#playerLeft = this.#playerLeftSpawnPoint;
      this.#playerTop = this.#playerTopSpawnPoint;
      this.#elementAnimationAdress = element.children[0];
      this.#elementAdress.style.width = String(this.#collisionWidth) + "px";
      this.#elementAdress.style.height = String(this.#collisionHeight) + "px";
      this.#elementAnimationAdress.style.left = String(this.#Animateleft) + "px";
      this.#elementAnimationAdress.style.top = String(this.#Animatetop) + "px";
      this.#elementAnimationAdress.style.width = String(this.#AnimateWidth) + "px";
      this.#elementAnimationAdress.style.height = String(this.#AnimateHeight) + "px";
      this.#healthBarAdress = element.children[1];
      this.#healthBarAdress.style.background = "url(https://i.hizliresim.com/Jm1Ofc.gif)"
      this.#healthBarAdress.style.backgroundSize = "cover";
      this.#healthBarAdress.style.backgroundRepeat = "no-repeat";

   }

   CheckCollision(mode){
      let blocks = document.getElementsByClassName("block");
      for (let index = 0; index < blocks.length; index++) {
         const element = blocks[index];

         var playerLeft = this.#playerLeft;
         var playerTop =  this.#playerTop;
         var playerWidth = this.#collisionWidth;
         var playerHeight = this.#collisionHeight;

         var elementLeft = Number(element.style.left.slice(0, -2));
         var elementTop = Number(element.style.top.slice(0, -2));

         var elementWidth = Number(element.style.width.slice(0, -2));
         var elementHeight = Number(element.style.height.slice(0, -2));

         switch(mode){
            case 1:
               if(((playerLeft <= elementLeft && playerLeft + playerWidth - 1 >= elementLeft)||(playerLeft <= elementLeft + elementWidth - 1 && playerLeft + playerWidth - 1 >= elementLeft + elementWidth - 1) ||( playerLeft > elementLeft && playerLeft + playerWidth - 1 < elementLeft + elementWidth - 1 )) && playerTop == elementTop + elementHeight)return 1;
               break;
            case 2:
               if(((playerTop <= elementTop && playerTop + playerHeight - 1 >= elementTop)||(playerTop <= elementTop + elementHeight - 1 && playerTop + playerHeight >= elementTop + elementHeight - 1) || ( playerTop > elementTop && playerTop + playerHeight - 1 < elementTop + elementHeight - 1) ) && elementLeft == playerLeft + playerWidth)return 1;
                break;
            case 3:
               if(((playerLeft <= elementLeft && playerLeft + playerWidth - 1 >= elementLeft)||(playerLeft <= elementLeft + elementWidth - 1 && playerLeft + playerWidth - 1 >= elementLeft + elementWidth - 1) || ( playerLeft > elementLeft && playerLeft + playerWidth - 1 < elementLeft + elementWidth )) && elementTop == playerTop + playerHeight)return 1;
               break;
            case 4:
               if(((playerTop <= elementTop && playerTop + playerHeight - 1 >= elementTop)||(playerTop <= elementTop + elementHeight - 1 && playerTop + playerHeight >= elementTop + elementHeight - 1) || ( playerTop > elementTop && playerTop + playerHeight - 1 < elementTop + elementHeight - 1)) && playerLeft == elementLeft + elementWidth)return 1;
               break;
         }
      }
      return 0;
   }

   Coordinates(){
      return [this.#playerLeft, this.#playerTop];
   }

   IsDeath(){
      if(this.#playerInDeath == 0)return 0;
      else return true;
   }

   HpShow(){

   }

   CheckAttackCollision(player){
      if(this.#playerDirection){
         var topLeftPoint = [this.#playerLeft + this.#Animateleft, this.#playerTop + this.#Animatetop];
         var topRightPoint = [this.#playerLeft + this.#Animateleft + this.#AnimateWidth, this.#playerTop + this.#Animatetop];
         var bottomLeftPoint = [this.#playerLeft + this.#Animateleft, this.#playerTop + this.#Animatetop + this.#AnimateHeight];
         var bottomRightPoint = [this.#playerLeft + this.#Animateleft + this.#AnimateWidth, this.#playerTop + this.#Animatetop + this.#AnimateHeight];

         let playerPointArray = [
            [Number(player.Coordinates()[0]), player.Coordinates()[1]],
            [Number(player.Coordinates()[0]) + this.#collisionWidth, player.Coordinates()[1]],
            [Number(player.Coordinates()[0]), player.Coordinates()[1] + this.#AnimateWidth],
            [Number(player.Coordinates()[0]) + this.#collisionWidth, player.Coordinates()[1] + this.#AnimateWidth]
            //Преобразование строк в число
            //Откуда взялись строки, пока не нашел
         ]
         console.log(playerPointArray);

         for (let index = 0; index < playerPointArray.length; index++) {
            const element = playerPointArray[index];
            if(element[0] > topLeftPoint[0] && element[1] > topLeftPoint[1] && element[0] < topRightPoint[0] && element[1] > topRightPoint[1] && element[0] > bottomLeftPoint[0] && element[1] < bottomLeftPoint[1] && element[0] < bottomRightPoint[0] && element[1] < bottomRightPoint[1])return 1;
         }
         return 0;
      }
      else{
         var topLeftPoint = [this.#playerLeft + this.#collisionWidth - this.#AnimateWidth, this.#playerTop + this.#Animatetop];
         var topRightPoint = [this.#playerLeft + this.#collisionWidth, this.#playerTop + this.#Animatetop];
         var bottomLeftPoint = [this.#playerLeft + this.#collisionWidth - this.#AnimateWidth, this.#playerTop + this.#Animatetop + this.#AnimateHeight];
         var bottomRightPoint = [this.#playerLeft + this.#collisionWidth, this.#playerTop + this.#Animatetop + this.#AnimateHeight];

         let playerPointArray = [
            [Number(player.Coordinates()[0]), player.Coordinates()[1]],
            [Number(player.Coordinates()[0]) + this.#collisionWidth, player.Coordinates()[1]],
            [Number(player.Coordinates()[0]), player.Coordinates()[1] + this.#AnimateWidth],
            [Number(player.Coordinates()[0]) + this.#collisionWidth, player.Coordinates()[1] + this.#AnimateWidth]
            //Преобразование строк в число
            //Откуда взялись строки, пока не нашел
         ]
         console.log(playerPointArray);

         for (let index = 0; index < playerPointArray.length; index++) {
            const element = playerPointArray[index];
            if(element[0] > topLeftPoint[0] && element[1] > topLeftPoint[1] && element[0] < topRightPoint[0] && element[1] > topRightPoint[1] && element[0] > bottomLeftPoint[0] && element[1] < bottomLeftPoint[1] && element[0] < bottomRightPoint[0] && element[1] < bottomRightPoint[1])return 1;
         }
         return 0;
      }
   }

   СhangeDirection(direction){

      if(direction){
         this.#elementAdress.style.transform = "scaleX(1)";
         this.#playerDirection = true;
      }
      else{
         this.#elementAdress.style.transform = "scaleX(-1)";
         this.#playerDirection = false;
      }
   }

   PositionSet(left, top) {
      this.#playerLeft = left;
      this.#playerTop = top;
      this.#elementAdress.style.left = this.#playerLeft + "px";
      this.#elementAdress.style.top = this.#playerTop + "px";
   }

   AnimationSet(animation){
      var date = new Date().getTime();
      if(date - this.#playerInDeath <= 1000){
         this.#elementAnimationAdress.style.animation = "death 1s infinite steps(5)";
      }
      else if(date - this.#playerInTakeHit <= 500){
         this.#elementAnimationAdress.style.animation = "takehit 0.5s infinite steps(3)";
      }
      else if(date - this.#playerInAttack <= 200){
         this.#elementAnimationAdress.style.animation = "attack 0.2s infinite steps(5)";
      }
      else{
         switch(animation){
            case "idle":
               this.#elementAnimationAdress.style.animation = "idle 0.5s infinite steps(7)";
               break;
            case "run":
               this.#elementAnimationAdress.style.animation = "run 0.5s infinite steps(7)";
               break;
            case "jump":
               this.#elementAnimationAdress.style.animation = "jump 0.5s infinite steps(1)";
               break;
            case "fall":
               this.#elementAnimationAdress.style.animation = "fall 0.5s infinite steps(1)";
               break;
         }
      }
   }  

   VerticalStrafe(){
      if(!this.CheckCollision(3)){
         this.#playerOrdinateSpeed += g;
      }
      if(this.#playerOrdinateSpeed < 0){
         this.AnimationSet("jump");
         for (let index = 0; index > Math.round(this.#playerOrdinateSpeed); index--) {
            if(!this.CheckCollision(1)){
               this.PositionSet(this.#playerLeft, Number(this.#playerTop - 1))
            }
            else{
               this.#playerOrdinateSpeed = 0;
               break;
            }
         }
      }
      else if(this.#playerOrdinateSpeed > 0){
         this.AnimationSet("fall");
         for (let index = 0; index < Math.round(this.#playerOrdinateSpeed); index++) {
            if(!this.CheckCollision(3)){
               this.PositionSet(this.#playerLeft, Number(this.#playerTop + 1))
            }
            else{
               this.#playerOrdinateSpeed = 0;
               break;
            }
         }
      }
      else{
         this.AnimationSet("idle");
      }
   }

   HorizontalStrafe(direction){
      if(this.#playerOrdinateSpeed == 0){
         this.AnimationSet("run");
      }
      if(direction){
         this.СhangeDirection(true)
         for (let index = 0; index < this.#playerSpeed; index++) {
            if(!this.CheckCollision(2)){
               this.PositionSet(Number(this.#playerLeft) + 1, this.#playerTop)
            }
         }
      }
      else{
         this.СhangeDirection(false)
         for (let index = 0; index < this.#playerSpeed; index++) {
            if(!this.CheckCollision(4)){
               this.PositionSet(Number(this.#playerLeft) - 1, this.#playerTop)
            }
         }
      }
   }

   spawn(){
      if(new Date().getTime() - this.#playerInDeath > 1000){
         if(this.#lifesCount > 0){
            this.#lifesCount--;
            this.#playerInDeath = 0;
            this.#hp = 100;
            this.PositionSet(this.#playerLeftSpawnPoint, this.#playerTopSpawnPoint);
            this.#healthBarAdress.style.backgroundSize = this.#hp + '%' + " 100%";
         }
         else{
            this.#elementAdress.remove();
         }
      }
   }

   jump(){
      if(this.CheckCollision(2) || this.CheckCollision(3) || this.CheckCollision(4)){
         this.#playerOrdinateSpeed = this.#jumpImpuls;
      }
   }

   Attack(player){
      if(new Date().getTime() - this.#playerInAttack > 500){
         this.#playerInAttack = new Date().getTime();
         this.AnimationSet("");
         if(this.CheckAttackCollision(player))player.TakeHit(20);
      }
   }

   TakeHit(damage){
      this.#playerInTakeHit = new Date().getTime();
      this.AnimationSet("");
      this.#hp -= damage;
      if(this.#hp <= 0)this.Death();
      this.#healthBarAdress.style.backgroundSize = this.#hp + '%' + " 100%";
   }

   Death(){
      this.#playerInDeath = new Date().getTime();
      this.AnimationSet("");
      this.spawn();
   }

}

var l = new Player(document.getElementById("playerCollision"))
var p = new Player(document.getElementById("playerCollision2"))


function gameLoop(){
   if(l.IsDeath())l.spawn();
   if(p.IsDeath())p.spawn();
   l.VerticalStrafe()
   p.VerticalStrafe()
   if(keyState[KeyWords.UPARROW]){
      l.jump();
   }
   if(keyState[KeyWords.RIGHTARROW]){
      l.HorizontalStrafe(true);
   }
   if(keyState[KeyWords.DOWNARROW]){
      l.Attack(p)
   }
   if(keyState[KeyWords.LEFTARROW]){
      l.HorizontalStrafe(false);
   }
   if(keyState[KeyWords.W]){
      p.jump();
   }
   if(keyState[KeyWords.D]){
      p.HorizontalStrafe(true);
   }
   if(keyState[KeyWords.S]){
      p.Attack(l)
   }
   if(keyState[KeyWords.A]){
      p.HorizontalStrafe(false);
   }

   setTimeout(gameLoop, 10);
}

gameLoop();
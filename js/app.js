// 这是我们的玩家要躲避的敌人
var Enemy = function(y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = 88+Math.random()*233;
    this.x = -98;
    this.y = y;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed*dt;
    //当enemy超过canvas右边时，重新从canvas左边进入。
    if (this.x > 503) {
      this.x = -98;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 318;
    this.speed = 233;
    this.status = 'stand';
};

Player.prototype.update = function(dt) {
    if (this.status == 'move_left') {
        this.x -= this.speed*dt;
    }
    if (this.status == 'move_up') {
        this.y -= this.speed*dt;
    }
    if (this.status == 'move_right') {
        this.x += this.speed*dt;
    }
    if (this.status == 'move_down') {
        this.y += this.speed*dt;
    }
    if (player.x < -17) player.x = -17;  // 防止Player超出canvas左边;
    if (player.x > 420) player.x = 420;  //防止Player超出canvas右边;
    if (player.y > 435) player.y = 435;  //防止Player超出canvas下边;
    if (player.y < -13) player.y = -13;  //防止Player超出canvas上边;
    if (player.y < 0)   player.status = 'stand';     //防止Player越过小河时，位置不动;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch (key) {
      case 'left':
          this.status = 'move_left';
          break;
      case 'up':
          this.status = 'move_up';
          break;
      case 'right':
          this.status = 'move_right';
          break;
      case 'down':
          this.status = 'move_down';
          break;
      case 'stand':
          this.status = 'stand';
          break;
      case 'spacebar':
          this.status = 'reset_game';
          break;
    }

};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(),
    allEnemies = [];
for (var i = 0; i < 6; i++) {
    var enemy = new Enemy(Math.floor(Math.random()*3)*83+63);
    allEnemies.push(enemy);
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        32: 'spacebar',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'

    };

    player.handleInput(allowedKeys[e.keyCode]);

    if (e.keyCode in allowedKeys){
      e.preventDefault();
    }
});
//当keyup事件的时候，判定player不动。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'stand',
        37: 'stand',
        38: 'stand',
        39: 'stand',
        40: 'stand'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// start slingin' some d3 here.
var highScore = 0;
var human;
var enemies;
var Enemy = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);

  this.character = 'enemy';
};

Enemy.prototype.randomize = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
};

var drag = d3.behavior.drag()
          .on('dragstart',function(){})
          .on('drag', function() {
            d3.select(this).attr('cx',d3.event.x)
            d3.select(this).attr('cy',d3.event.y)
          })
          .on('dragend',function(){});

var Human = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
  this.r = 5;

  this.character = 'human';
};

var init = function (n) {
    human = [new Human()];
    enemies = _.map(_.range(n), function (){
    return new Enemy();
  });

    //Add enemies
  d3.select('svg').selectAll("circle.enemy")
    .data(enemies).enter().append('circle')
    .attr('class', "enemy")
    .attr("cx",function(d){return d.x})
    .attr("cy",function(d){return d.y})
    .attr("r", function(d){return d.r});

  d3.select('svg').selectAll("circle.human")
    .data(human).enter().append('circle')
    .attr('class', "human")
    .attr("cx",function(d){return d.x})
    .attr("cy",function(d){return d.y})
    .attr("r", function(d){return d.r})
    .call(drag);
};

var checkCollision = function () {

};

var update = function () {
  moveEnemies(5);


};


var moveEnemies = function(n) {
  n = n || 5;
  enemies = _.each(enemies, function (val) {
     val.randomize();
  });

  d3.select('svg').selectAll('circle').data(enemies)

    .transition().duration(1500)
    .attr("cx",function(d){return d.x})
    .attr("cy",function(d){return d.y})
    .attr("r","5");

    updateScore();
    setTimeout(moveEnemies.bind(null,n), 1500);
}

var updateScore = function() {

  var score = +d3.select(".current").select("span").text();
  highScore = +d3.select(".high").select("span").text();
  d3.select(".current").select("span").text(++score);
  if(score > highScore)
    d3.select(".high").select("span").text(score);
};



var checkCollision =  function (collidedCallback) {




  enemiesX = _.map(d3.selectAll(".enemy")[0], function(x) {
    return x.getAttribute("cx");
  });

  enemiesY = _.map(d3.selectAll(".enemy")[0], function(x) {
    return x.getAttribute("cy");
  });

  enemiesR = _.map(d3.selectAll(".enemy")[0], function(x) {
    return x.getAttribute("r");
  });



  for(var i = 0; i < enemiesY.length; i ++) {
    var xDiff =  enemiesX[i]- d3.selectAll(".human")[0][0].getAttribute("cx");
    var yDiff = enemiesY[i]- d3.selectAll(".human")[0][0].getAttribute("cy");
    var radiusSum = enemiesR[i] + d3.selectAll(".human")[0][0].getAttribute("r");


    var separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    if(separation < radiusSum) {
      collidedCallback();
      return true;
    }
  return false;
  }

}

var onCollision = function() {

  var collision = +d3.select(".collisions").select("span").text();
  d3.select(".collisions").select("span").text(++collision);
  d3.select(".current").select("span").text(0);
}


init(5);
setInterval(checkCollision.bind(null,  onCollision), 100);

update();

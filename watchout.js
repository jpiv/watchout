// start slingin' some d3 here.
var highScore = 0;
var human;
var enemies;


//Enemy Object
var Enemy = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
  this.r = 16;
  this.url = "b.png";
  this.character = 'enemy';
};

Enemy.prototype.randomize = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
};


//Human Object
var Human = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
  this.r = 15;
  this.url = "uni.gif";
  this.character = 'human';
};


//Drag Behavior
var drag = d3.behavior.drag()
          .on('dragstart',function(){})
          .on('drag', function() {
            d3.select(this).attr('x',d3.event.x-8)
            d3.select(this).attr('y',d3.event.y-8)
          })
          .on('dragend',function(){});


//init game
var init = function (n) {
    human = [new Human()];
    enemies = _.map(_.range(n), function (){
    return new Enemy();
  });

    //Add enemies
  d3.select('svg').selectAll("image.enemy")
    .data(enemies).enter().append('image')
    .attr('class', "enemy")
    .attr("x",function(d){return d.x})
    .attr("y",function(d){return d.y})
    .attr("width", function(d){return d.r})
    .attr("height", function(d){return d.r})
    .attr("r", function(d){return d.r})
    .attr("xlink:href", function(d){return d.url});

    //add human
  d3.select('svg').selectAll("image.human")
    .data(human).enter().append('image')
    .attr('class', "human")
    .attr("x",function(d){return d.x})
    .attr("y",function(d){return d.y})
    .attr("width", function(d){return d.r})
    .attr("height", function(d){return d.r})
    .attr("r", function(d){return d.r})
    .attr("xlink:href", function(d){return d.url})
    .call(drag);
};



var update = function () {
  moveEnemies(5);
};


//move enemies
var moveEnemies = function(n) {
  n = n || 5;
  enemies = _.each(enemies, function (val) {
     val.randomize();
  });

  d3.select('svg').selectAll('image.enemy').data(enemies)

    .transition().duration(1500)
    .tween('collision', checkCollision)
    .attr("x",function(d){return d.x})
    .attr("y",function(d){return d.y})
    .attr("r",function(d){return d.r})
    .attr("width", function(d){return d.r})
    .attr("height", function(d){return d.r})
    .attr("xlink:href", function(d){return d.url});;


    updateScore();
    setTimeout(moveEnemies.bind(null,n), 1500);
}





var checkCollision =  function () {
  var isTouched = false;

  return function(t) {


  var enemiesX = +d3.select(this).attr('x');
  var enemiesY = +d3.select(this).attr('y');
  var enemiesR = +d3.select(this).attr('r');

  var humanX = +d3.select(".human").attr('x');
  var humanY = +d3.select(".human").attr('y');
  var humanR = +d3.select(".human").attr('r');

  var xDiff =  enemiesX- humanX;
  var yDiff = enemiesY- humanY;
  var radiusSum = enemiesR+ humanR;


  var separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));

    if(separation < radiusSum && !isTouched) {
      onCollision();
      isTouched = true;

    }
    else if(separation > radiusSum)
    {
      isTouched = false;
    }

  //console.log(enemiesX,enemiesY,enemiesR);

  }


}

//update Scores
var updateScore = function() {
  var score = +d3.select(".current").select("span").text();
  highScore = +d3.select(".high").select("span").text();
  d3.select(".current").select("span").text(++score);
  if(score > highScore)
    d3.select(".high").select("span").text(score);
};


//onCollision update scores
var onCollision = function() {
  var collision = +d3.select(".collisions").select("span").text();
  d3.select(".collisions").select("span").text(++collision);
  d3.select(".current").select("span").text(0);
}


//invoking starting functions
init(5);
// setInterval(checkCollision.bind(null,  onCollision), 100);
update();

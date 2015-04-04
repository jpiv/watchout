// start slingin' some d3 here.
var highScore = 0;
var human;
var Enemy = function () {
  this.x = Math.floor(Math.random() * 101);
  this.y = Math.floor(Math.random() * 101);
  this.character = 'enemy';
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
  this.character = 'human';
};

var init = function (n) {
    human = [new Human()];
    var enemies = _.map(_.range(n), function (){
    return new Enemy();
  });

    //Add enemies
  d3.select('svg').selectAll("circle.enemy")
    .data(enemies).enter().append('circle')
    .attr('class', "enemy")
    .attr("cx",function(d){return d.x})
    .attr("cy",function(d){return d.y})
    .attr("r","5");

  d3.select('svg').selectAll("circle.human")
    .data(human).enter().append('circle')
    .attr('class', "human")
    .attr("cx",function(d){return d.x})
    .attr("cy",function(d){return d.y})
    .attr("r","5")
    .call(drag);
};
init(5);


var update = function () {
  moveEnemies(5);
  updateHuman();
};

var updateHuman = function () {

};




var moveEnemies = function(n) {
  n = n || 5;
  var enemies = _.map(_.range(n), function (){
    return new Enemy();
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

update();

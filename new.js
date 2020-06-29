var n = 15;
var m = 15;
var grid;
var w , h;
var turn;
var start_flag;
var A,B;
var ready;
var a_p,b_p;
var cur = [];
var dx = [];
var dy = [];
var start_guy;
var distance;
function Spot(i,j){
    this.x = i;
    this.y = j;
    this.vis = false;
    this.block = 0;
    this.owner = -1;
    this.visA = false;
    this.visB = false;
    this.imp = false;
    this.show = function(col){
       fill(col); stroke(0);
       rect(this.x*w,this.y*h,w,h); 
    }
}
function finish(who,a,b){
  frameRate(30);
  start_flag = false;
  if(who==0)
    document.getElementById("text").innerHTML = A + " WIN",a_p++;
  else
    document.getElementById("text").innerHTML = B + " WIN",b_p++;
  document.getElementById("text1").innerHTML = a_p+":"+b_p;
  document.getElementById("text2").innerHTML = "[" + a + "x" + b + "]";
}
function change_turn(){
  turn = 1-turn;
  if(turn==0)
    document.getElementById("text").innerHTML = A + " TURN";
  else
    document.getElementById("text").innerHTML = B + " TURN";
}
function poz(){
  document.getElementById("text").innerHTML = "";
}
function yeni(){
  if(A.length==0 || B.length==0)
    return;
  
  document.getElementById("text2").innerHTML = "";
  start_flag = true;
  turn = Math.floor(Math.random() * 2);
  ready = false;
  change_turn();
  start_guy = turn;
  for(var i=0;i<n;i++)
    for(var j=0;j<m;j++){
        grid[i][j].block = (Math.floor(Math.random() * 5) == 0);
        grid[i][j].owner = -1;
        grid[i][j].visA = grid[i][j].visB = false;
        grid[i][j].imp = false;
    }
  distance = 5;
  cur = [];
}
function start(a,b){
  if(a.length==0 || a.length==0 || a===b)
    return;
  A = a; B = b;
  a_p = 0; b_p = 0;
  yeni();
}
function setup(){
    createCanvas(700,700);
    start_flag = false;
    grid = new Array(n);
    w = width/n;
    h = height/m;
    for(var i=0;i<n;i++)
        grid[i]=new Array(m);
    for(var i=0;i<n;i++)
      for(var j=0;j<m;j++)
        grid[i][j]=new Spot(i,j);
    dx.push(-1);dx.push(+1);dx.push(0);dx.push(0);
    dy.push(0);dy.push(0);dy.push(-1);dy.push(+1);

}
function mark(x,y){
  if(x<0 || y<0 || x>=n || y>=m || grid[x][y].block == true || ready==true || grid[x][y].owner!=-1)
    return;
  if(turn==1)
    grid[x][y].visB = 1;
  else
    grid[x][y].visA = 1;
  grid[x][y].owner = turn;
  grid[x][y].imp = true;
  cur.push(grid[x][y]);
  change_turn();
  if(turn==start_guy){
    ready=true;
    poz();
  }
}
function draw(){
    background(0);
    if(ready && start_flag){
      frameRate(distance);
      for(var i=0;i<cur.length;i++){
        for(var j=0;j<4;j++){
          var tox=cur[i].x+dx[j];
          var toy=cur[i].y+dy[j];
          if(tox>=0 && toy>=0 && tox<n && toy<m && grid[tox][toy].block==false){
            if(cur[i].owner==0 && grid[tox][toy].visA==false)
              grid[tox][toy].visA=true;
            if(cur[i].owner==1 && grid[tox][toy].visB==false)
              grid[tox][toy].visB=true;
          }
        } 
      }
      var before = cur.length;
      for(var i=0;i<n;i++)
        for(var j=0;j<m;j++)
          if(grid[i][j].owner==-1 && grid[i][j].block==false){
            if(grid[i][j].visA && grid[i][j].visB)
              grid[i][j].owner = 1-start_guy;
            else if(grid[i][j].visA)
              grid[i][j].owner = 0;
            else if(grid[i][j].visB)  
              grid[i][j].owner = 1;
            if(grid[i][j].owner!=-1)
              cur.push(grid[i][j]);
          }
      if(cur.length == before){      
        var areaA=0, areaB=0;
        for(var i=0;i<n;i++)
          for(var j=0;j<m;j++)  
            areaA+=(grid[i][j].owner==0),areaB+=(grid[i][j].owner==1);
          console.log(areaA);
          console.log(areaB);
          finish(areaA<areaB,areaA,areaB);
      }
      distance++;
    }
    for(var i=0;i<n;i++)
      for(var j=0;j<m;j++){
        if(grid[i][j].block==true)
          grid[i][j].show(color(0, 0, 0));
        else{
          if(grid[i][j].owner == 0)
            grid[i][j].show(color(222, 60, 68));
          else if(grid[i][j].owner == 1)
            grid[i][j].show(color(36, 206, 212));
          else
            grid[i][j].show(color(255,255,255));
        }
      }
      for(var i=0;i<n;i++)
      for(var j=0;j<m;j++)
        if(grid[i][j].imp){
          let xr=w/4;
          var x=grid[i][j].x*w+w/2,y=grid[i][j].y*h+h/2;
          line(x-xr,y-xr,x+xr,y+xr);
          line(x+xr,y-xr,x-xr,y+xr);
        }
}
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var size = 100;
var pixels = 5;
var factor = 0.59;

var map_2d = [];

function generate_new(){
  for(var i = 0; i < size * size; i++){
  /*  if(i < size){
      map_2d[i] = {status: (Math.random() < factor), root: size * size, size: 1};
    } else if(i > size * size - size){
      map_2d[i] = {status: (Math.random() < factor), root: size * size + 1, size: 1};
    } else {*/
      map_2d[i] = {status: (Math.random() < factor), root: i, size: 1};
    /*}*/
  }
  map_2d[size * size] = {status: true, root: size * size, size: 1 };
  map_2d[size * size + 1] = {status: true, root: size * size + 1, size: 1 };
}

function connected(i, j){

  var k = map_2d[i].root;
  while(k != map_2d[k].root){
    k = map_2d[k].root;
  }

  var l = map_2d[j].root;
  while(l != map_2d[l].root){
    l = map_2d[l].root;
  }
  if(k == l){
    return true;
  }
  return false;
}

function union(i, j) {
  var t_root = map_2d[j].root;
  while(t_root != map_2d[t_root].root){
    t_root = map_2d[t_root].root;
  }
  var placeholder = map_2d[i].root
  for(var k = 0; k < size * size; k++){
    if(map_2d[k].root == placeholder && map_2d[k].status){
      map_2d[k].root = t_root;
    }
  }
}

function set_roots(){
    for(var i = 0; i < size * size; i++){
      if(i >= size){
        if(map_2d[i - size].status && map_2d[i].status && !connected( i - size, i)){
          union(i, i - size);
        }
      }
      if(i < size * size - size){
        if(map_2d[i + size].status && map_2d[i].status && !connected( i + size, i)){
          union(i + size,i );
        }
      }
      if(i % size != size - 1){
        if(map_2d[i + 1].status && map_2d[i].status && !connected(i + 1, i)){
          union(i + 1, i);
        }
      }
      if(i % size != 0){
        if(map_2d[i - 1].status && map_2d[i].status && !connected(i - 1, i)){
          union(i - 1, i);
        }
      }
    }
}

function paint(){
  var x = 0;
  var y = 0;
  context.font = '20pt Calibri';
  for(var i = 0; i < size * size; i++){
    if(!map_2d[i].status){
      context.fillStyle = "#000000";
    } else {
      if(map_2d[i].root < 0){
        context.fillStyle = "#EEEEFF";
      } else {
        context.fillStyle = "#FFFFFF";
      }
    }
    context.fillRect(x * pixels, y * pixels, pixels, pixels);
    if(!map_2d[i].status){
      context.fillStyle = "#FFFFFF";
    } else {
      context.fillStyle = "#000000";
    }
    x += 1;
    if (x > size - 1){
      y += 1;
      x = 0;
    }
  }
}

function fullyConected(){
  for(var i = 0; i < size; i++){
    for(var j = 0; j < size; j++){
      if(connected(i, size * size - size + j)){
        return map_2d[i].root;
      }
    }
  }
  return false;
}

function paintConected(){
  var id = fullyConected();
  var x = 0, y = 0;
  if(id > 0){
  context.fillStyle = "#00AAFF";
    for(var i = 0; i < size * size; i++){
      if(map_2d[i].root == id){
        context.fillRect(x * pixels, y * pixels, pixels, pixels);
      }
      x += 1;
      if (x > size - 1){
        y += 1;
        x = 0;
      }
    }
  }
}

generate_new(); set_roots(); paint();  paintConected();

//setInterval(function(){generate_new(); paint();}, 1000);

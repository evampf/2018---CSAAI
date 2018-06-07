
var canvas,
  ctx,
  video;
var barra_temporal, volumen;
var camera = [];
var clock = [];
var hor = 0;
var min = 0;
var seg = 0;

function main() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  Init();
  console.log(video);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.addEventListener('play', render);
  barra_temporal.addEventListener('change', barra_temporal);
  volumen.addEventListener('change', VolumeControl);
  
}

function Init() {
  barra_temporal = document.getElementById("barra_temporal");
  barra_temporal.value = 0;
  volumen = document.getElementById("volumen");
  volumen.value = 1;
  Camera();
  ChooseCam(1);
}
function counter(){
  clock = hor + ":" + min + ":" + seg
  seg +=1;
  if (seg == 60)
  {
    seg = 0;
    min += 1;
    if (min == 60){
      min = 0;
      hor += 1;
    }
  } 
  document.getElementById("counter").innerHTML = clock
}

function render() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  Refreshbar();
  Refreshclock();
  requestAnimationFrame(render);
}
function Play() {
  if (video.paused || video.ended) {
    document.getElementById("play-pause").innerHTML = "u";
    for (var i = 0; i < camera.length; i++) {
      camera[i].play();
    }
  } else {
    document.getElementById("play-pause").innerHTML = "P";
    for (var i = 0; i < camera.length; i++) {
      camera[i].pause();
    }
  } console.log(video.currentTime);
  setInterval(counter, 1000)
}
function barra_temporal() {
  var time = barra_temporal.value * (video.duration / barra_temporal.max)
  for (var i = 0; i < camera.length; i++) {
    camera[i].currentTime = time;
  }
}
function Refreshbar() {
  var value = video.currentTime * (barra_temporal.max / video.duration)
  barra_temporal.value = value;
}
function VolumeControl() {
  video.volume = volumen.value;
}
function Mute() {
  if (video.muted) {
    video.muted = false;
    document.getElementById("mute").innerHTML = "G"
  } else {
    video.muted = true;
    document.getElementById("mute").innerHTML = "g";
  }
}
function Camera() {
  var c1 = document.getElementById("aux1");
  var c2 = document.getElementById("aux2");
  var c3 = document.getElementById("aux3");
  var c4 = document.getElementById("aux4");
  camera.push(c1, c2, c3, c4);
}

function Refreshclock() {
  var s;
  s = Math.round(video.currentTime);
  if (s >= 10) {
    document.getElementById("Clock").innerHTML = "00:" + s;
  } else {
    document.getElementById("Clock").innerHTML = "00:0" + s;
  }
}

function ChooseCam(x) {
  switch (x) {
    case 1:
      Select(1);
      break;
    case 2:
      Select(2);
      break;
    case 3:
      Select(3);
      break;
    case 4:
      Select(4);
      break;
    default:
      Select(1);
  }

  function Select(y) {
    if (video != undefined) { video.muted = true; }
    video = document.getElementById("aux" + y);
    video.muted = false;
    for (var i = 1; i <= 4; i++) {
      if (i == y) {
        document.getElementById("aux" + i).style.border = "thick solid #000000";
      } else {
        document.getElementById("aux" + i).style.border = "none";

      }
    }
  }
}

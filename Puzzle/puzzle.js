var currentImage = 0;
var currentPuzzle = [];
var noLeft = [0, 3, 6];
var noRight = [2, 5, 8];
var noUp = [0, 1, 2];
var noDown = [6, 7, 8];
var solution = [0, 1, 2, 3, 4, 5, 6, 7, "White"];
var carouselRecord = [0, 1, 2];
var clock = [];
var hor = 0;
var min = 0;
var seg = 0;


// Función que hace que aparezca la imagen
function chooseImage() {
  currentImage = Math.floor((Math.random() * 9) + 1);
  for (i = 0; i < 9; i++) {
    id = "p" + i;
    imgId = i + ".jpeg";
    imgPath = "./Images/" + currentImage + "/" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}

// Función para desordenar la imagen
function randomize() {
  currentPuzzle = [];
  j = 0;
  for (a = [0, 1, 2, 3, 4, 5, 6, 7], i = a.length; i--;) {
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    currentPuzzle.push(random);
  }
  currentPuzzle.push("White");
  for (i = 0; i < 9; i++) {
    id = "p" + i;
    imgId = currentPuzzle[i] + ".jpeg";
    imgPath = "./Images/" + currentImage + "/" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}

function draw() {
  for (i = 0; i < 9; i++) {
    id = "p" + i;
    imgId = currentPuzzle[i] + ".jpeg";
    imgPath = "./Images/" + currentImage + "/" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}

function check() {
  var equal = 0;
  for (i = 0; i < 9; i++) {
    if (solution[i] == currentPuzzle[i]) {
      equal += 1;
    }
    if (equal == 9) {
      alert("you won");
      chooseImage();
    }
  }
}

//Función que soluciona el puzzle
function solve() {
  currentPuzzle.splice(0, 9, 0, 1, 2, 3, 4, 5, 6, 7, "White");
  draw();
}

// Funciones para mover el puzzle con las teclas
function move(x) {
  var noAllowed = [];
  actual = currentPuzzle.indexOf("White");
  if (x == -1) { noAllowed = noLeft; }
  if (x == 1) { noAllowed = noRight; }
  if (x == -3) { noAllowed = noUp; }
  if (x == 3) { noAllowed = noDown; }

  dest = currentPuzzle.indexOf("White");
  actual = dest - x;

  if (noAllowed.indexOf(actual) == -1 && 0 <= actual && actual <= 8) {
    aux = currentPuzzle[actual];
    currentPuzzle.splice(actual, 1, currentPuzzle[dest]);
    currentPuzzle.splice(dest, 1, aux);
  }
  draw();
  check();
}

function keyHandler(event) {
  switch (event.key) {
    case "ArrowLeft":
      move(-1);
      break;
    case "ArrowRight":
      move(1);
      break;
    case "ArrowUp":
      move(-3);
      break;
    case "ArrowDown":
      move(3);
      break;
  }
}

// Esta función hace que las imagenes del carrusel vayan cambiando

function nextImg(x) {
  if (x == 9) { x = 1; }
  else { x += 1; }
  return x;
}

function changeCarrousel() {
  for (i = 0; i < 3; i++) {
    next = nextImg(carouselRecord[i]);
    carouselRecord.splice(i, 1, next);
    id = "c" + i;
    imgId = next + ".jpg";
    imgPath = "./Images/0/" + imgId;
    image = document.getElementById(id);
    image.src = imgPath;
  }
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


// Cada 2 seg (2000) las imágenes del carrousel van cambiando
function main() {
  document.addEventListener('keydown', keyHandler, false);
  setInterval(changeCarrousel, 2000)
  setInterval(counter, 1000)
}

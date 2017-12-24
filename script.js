//схема примера: 
// A - первое слагаемое
var A = 7;
// B - второе слагаемое
var B = 4;
// C - сумма
var C = A+B;

//ссылка на 2d canvas
var canvas,context;

// координаты левого верхнего угла изображения линейки относительно canvas
const begImgX = 0;
const begImgY = 100;

// координаты нулевого деления на линейке  для рисования стрелок
const begCountX = 35;
const begCountY = 10;

//количество пикселов в одном делении линейки
const oneGrid = 39;

//инициализация графического контекста в переменной context
function init2d() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
}
//рисует поле ввода над стрелкой
function setInputStyleStr(id, beginGrid, endGrid) {
  var left = begImgX + begCountX + ((endGrid - beginGrid) * oneGrid) / 2 + beginGrid * oneGrid + canvas.offsetLeft -10;
  var top = begImgY - 70 + begCountY+ canvas.offsetTop;
  
  document.getElementById(id).style.position = "absolute";
  document.getElementById(id).style.left = left.toString() + "px";
  document.getElementById(id).style.top = top.toString() + "px";
  document.getElementById(id).style.display = "block";
  document.getElementById(id).focus();
  
}

//рисует поле ввода в примере
function setInputStyle(id, value, ok) {
  
  document.getElementById(id).innerHTML = value.toString();
  if (ok) {
    document.getElementById(id).style.backgroundColor = "rgb(255, 255, 255)";
  }
  else{
    document.getElementById(id).style.backgroundColor = "rgb(255,127,80)";
  }
}

//нарисовать стрелку от числа beginGrid до числа endGrid на линейке
function drawSrt(context, beginGrid, endGrid) {
  context.strokeStyle = "red";
  //дуга стрелки             
  context.beginPath();
  context.moveTo(begImgX + begCountX + beginGrid * oneGrid, begImgY + begCountY);
  context.quadraticCurveTo(begImgX + begCountX + ((endGrid - beginGrid) * oneGrid) / 2 + beginGrid * oneGrid, begImgY - 70 + begCountY,
    begImgX + begCountX + endGrid * oneGrid, begImgY + begCountY)
  //context.closePath();
  context.stroke();
  //нижняя стрела
  context.beginPath();
  context.moveTo(begImgX + begCountX + endGrid * oneGrid, begImgY + begCountY);
  context.lineTo(begImgX + begCountX + endGrid * oneGrid - 12, begImgY + begCountY);
  //верхняя стрела
  context.stroke();
  context.moveTo(begImgX + begCountX + endGrid * oneGrid, begImgY + begCountY);
  context.lineTo(begImgX + begCountX + endGrid * oneGrid - 5, begImgY + begCountY - 10);
  context.stroke();
}

function draw() {
  var img = new Image();
  img.onload = function () {
    context.drawImage(img, begImgX, begImgY);
    
    //Установить  первое слагаемое
    setInputStyle("A1", A, true);
    //Установить  второе слагаемое
    setInputStyle("B1", B, true);


    //нарисовать стрелку от числа до числа на линейке
    drawSrt(context, 0, A);
    setInputStyleStr("inputA", 0, A);
    

  }
  //рисуем линейку
  img.src = "sprite.png";

}

function editInputA(){

  if (A.toString()=="") return;
  if (document.getElementById("inputA").value == A.toString() ){
    //введено правильное число
    document.getElementById("inputA").style.display = "none";

    document.getElementById("inputA2").innerHTML = A;
    document.getElementById("inputA2").style.display = "block";
    setInputStyleStr("inputA2", 0, A);
    setInputStyle("A1", A, true);

    //рисуем вторую стрелку
    //нарисовать стрелку от числа до числа на линейке
    drawSrt(context, A, A+B);
    setInputStyleStr("inputB", A, A+B);


  }else{
    //введено неправильное число
    setInputStyle("A1", A, false);
  }

}

function editInputB(){

  if (B.toString()=="") return;
  if (document.getElementById("inputB").value == B.toString() ){
    //введено правильное число
    document.getElementById("inputB").style.display = "none";

    document.getElementById("inputB2").innerHTML = B;
    document.getElementById("inputB2").style.display = "block";
    setInputStyleStr("inputB2", A, A+B);
    setInputStyle("B1", B, true);

    //спрашиваеи ответ
    //скрываем С1
    document.getElementById("C1").innerHTML = "";

    //показываем inputC1 и устанавливаем на него фокус
    document.getElementById("inputC1").style.display = "inline-block";
    //document.getElementById("inputC1").style.t = "inline-block";
    document.getElementById("inputC1").focus();

  }else{
    //введено неправильное число
    setInputStyle("B1", B, false);
  }

}

function editInputC1(){
  if (document.getElementById("inputC1").value == C.toString() ){
    //введено правильное число
    document.getElementById("inputC1").style.display = "none";

    document.getElementById("C1").innerHTML = C;
    document.getElementById("C1").style.display = "inline-block";
    
  }else{
    //введено неправильное число
    document.getElementById("inputC1").style.color = "rgb(255, 0, 0)";
  }
}
// Code mostly copied from https://www.w3schools.com/graphics/canvas_clock_start.asp 
// No commercial purposes intended - I just want a 40-hour analog clock

var linglinghours = 40;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 60);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < (linglinghours / 2) + 1; num++){
    ang = num * Math.PI / (linglinghours / 4);
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
	

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var millis = now.getMilliseconds();
    var mult = linglinghours/24;
    var div = (linglinghours/4);

    var tot_ms = (hour*60*60*1000) + (minute*60*1000) + (second*1000) + millis;

    var day_ms = 24 * 60 * 60 * 1000
    var ll_tot_ms = ((linglinghours * 100 * 100 * 1000) / day_ms) * tot_ms

    var ll_hour = ll_tot_ms / 100 / 100 / 1000;
    var ll_minute = (ll_tot_ms / 100 / 1000) % 100;
    var ll_second = (ll_tot_ms / 1000) % 100;
    var ll_millis = ll_tot_ms % 100;
    
    hour = ll_hour
    minute = ll_minute
    second = ll_second
    millis = ll_millis


	ll_minute = Math.floor(ll_minute)
    ll_hour = Math.floor(ll_hour)
    //hour
    console.log(hour)	

    hour=hour%(linglinghours/2);    
    hour=(hour*Math.PI/10) + (minute*Math.PI/(10*100*100))+(second*Math.PI/(360*100*100	));  
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    //minute
    minute=(minute*Math.PI/50)+(second*Math.PI/(10*100*100));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    
    // second
    second=(second*Math.PI/50)//+(millis*Math.PI/(30*600));
    // console.log(second);
    drawHand(ctx, second, radius*0.9, radius*0.02);


    changeTime(ll_hour, ll_minute, ll_second);
}



function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function changeTime(h, m, s){
	var t = document.getElementById('time');

	h = Math.round(h);
	m = Math.round(m);
	s = Math.round(s);

	if (s == 100) {
		s = 0;
	} if (m == 100) {
		m = 0;
	} if (h == 40) {
		h = 0
	}
	if (h < 10) {
		h = '0' + h;
	} if (m < 10) {
		m = '0' + m;
	} if (s < 10) {
		s = '0' + s;
	}

	t.innerHTML = h + ':' + m + ':' + s;
}
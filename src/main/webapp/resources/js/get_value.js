var x_buttons;
var r_buttons;
var r_value = 3;
var plot_canvas;
var ctx;

window.onload = function () {
    x_buttons = document.getElementsByClassName("x_cb");
    r_buttons = document.getElementsByClassName("button_r");
    document.getElementById("form:y").value = "";
    document.getElementById("form:hidden_x").value = -3;
    document.getElementById("form:hidden_r").value = 3;
    plot_canvas = document.getElementById("plot");
    ctx = plot_canvas.getContext("2d");
    draw_canvas();
    plot_canvas.addEventListener("click", checkPoint, false);
    for (var i = 0; i < x_buttons.length; i++) {
        x_buttons[i].checked = false;
    }
    x_buttons[0].checked = true;
    redraw_points();
};

function click_x(element){
    for (var i = 0; i < x_buttons.length; i++) {
        x_buttons[i].checked = false;
    }
    element.checked = true;
    var values = [['a',-3],['b',-2],['c',-1],['d',0],['e',1],['f',2],['g',3]];
    var x_value = new Map(values);
    document.getElementById("form:hidden_x").value = x_value.get(element.id.toString().charAt(5));
}
 function click_r(element) {
     for (var i = 0; i < r_buttons.length; i++) {
         r_buttons[i].classList.remove("focused");
     }
     element.classList.add("focused");
     r_value = element.value;
     document.getElementById("form:hidden_r").value = element.value;
     redraw_points();
     return false;
 }

 //CANVAS

function draw_canvas() {
    ctx.fillStyle = '#aec4c7';
    ctx.fillRect(150, 150, 100, 100);

    ctx.beginPath();
    ctx.arc(150, 150, 100, Math.PI, 3/2*Math.PI);
    ctx.lineTo(150, 150);
    ctx.fill();

    ctx.closePath();
    ctx.beginPath();
    ctx.lineTo(150, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;

    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 300);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    ctx.closePath();
    ctx.stroke();
}

var x;
var y;
var xx;
var yy;

function checkPoint(e) {

    var x_pix;
    var y_pix;
    var x_canvas;
    var y_canvas;

    x_pix = getCP_X_pix(e);
    y_pix = getCP_Y_pix(e);
    x_canvas = getCP_X_canvas(x_pix, r_value);
    y_canvas = getCP_Y_canvas(y_pix, r_value);

    document.getElementById("canvas_form:canvas_x").value = x_canvas;
    document.getElementById("canvas_form:canvas_y").value = y_canvas;
    document.getElementById("canvas_form:canvas_r").value = r_value;

    console.log(document.getElementById("canvas_form:canvas_x").value );
    console.log(document.getElementById("canvas_form:canvas_y").value );
    console.log(document.getElementById("canvas_form:canvas_r").value );

    document.getElementById("canvas_form:canvas_but").click();

    //redraw_points();
}
function getCursorPosition(e) {
    xx = e.clientX - left;
    yy = e.clientY - top;
    x = (r_value / 100 * (e.clientX - left - 150)).toFixed(6);
    y = (-r_value / 100 * (e.clientY - top - 150)).toFixed(6);
}

function getCP_X_pix(e) {
    var br = plot_canvas.getBoundingClientRect();
    var left = br.left;
    var top = br.top;
    return e.clientX - left;
}

function getCP_Y_pix(e) {
    var br = plot_canvas.getBoundingClientRect();
    var left = br.left;
    var top = br.top;
    return e.clientY - top;
}

function getCP_X_canvas(x_pix, r) {
    return x = (r / 100 * (x_pix - 150)).toFixed(6);
}

function getCP_Y_canvas(y_pix, r) {
    return y = (-r / 100 * (y_pix - 150)).toFixed(6);
}

function redraw_points() {
    var table_x = document.getElementsByClassName("x");
    var table_y = document.getElementsByClassName("y");
    var table_r = document.getElementsByClassName("r");
    var table_hit = document.getElementsByClassName("hit");

    if ((table_hit.length != 0) && (table_x.length != 0) && (table_y.length != 0) && (table_r.length != 0)) {
        ctx.clearRect(0, 0, 300, 300);
        draw_canvas();
        for (var i = 0; i < table_hit.length; i++) {
            if (parseFloat(table_r[i].innerHTML) != r_value){
                draw_point(back_to_X_pix(table_x[i].innerHTML, r_value),back_to_Y_pix(table_y[i].innerHTML, r_value), "");
            }else{
                draw_point(back_to_X_pix(table_x[i].innerHTML, table_r[i].innerHTML),
                    back_to_Y_pix(table_y[i].innerHTML, table_r[i].innerHTML),
                    table_hit[i].innerHTML.trim());
            }
        }
    }
}
function draw_point(x, y, hit) {

    if (hit == "Да") {
        ctx.fillStyle = 'green';
    } else if(hit == ""){
        ctx.fillStyle = 'grey';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.beginPath();
    ctx.rect(x - 2.5, y - 2.5, 5, 5);
    ctx.fill();
}
function back_to_X_pix(x, new_r){
    return (100*x+150*new_r)/new_r;
}

function back_to_Y_pix(y, new_r){
    return (-100*y+150*new_r)/new_r;
}

function after_request() {
    redraw_points();
    for (var i = 0; i < x_buttons.length; i++) {
        x_buttons[i].checked = false;
    }
    x_buttons[0].checked = true;
    for (var i = 0; i < r_buttons.length; i++) {
        r_buttons[i].classList.remove("focused");
    }
    r_buttons[2].classList.add("focused");
    document.getElementById("form:hidden_r").value = 3;
    document.getElementById("form:hidden_x").value = -3;
    document.getElementById("form:y").value = "";
}

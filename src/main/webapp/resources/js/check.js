window.onload = function () {
    //получаем значение нажатой кнопочки у игрека и оставляем ее сфокусированной
    let buttons = document.getElementsByName("button_y");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function (event) {
            document.getElementById("hidden_y").value = event.target.value;
            buttons.forEach(elem => elem.classList.remove("focused"));
            event.target.classList.add("focused");
        }
    }

    //проверка валидного ввода x
    let warning2_element = document.getElementById("warning2");
    document.getElementById("x_value").oninput = function (e) {
        warning2_element.style.visibility = "hidden";
        let input = e.target.value;
        let incorrect = isNaN(input);
        //console.log(incorrect);
        if ((incorrect === true) || (input[input.length - 1] === " ")) {
            if (input !== "-") {
                //e.target.value = input.substring(0, input.length - 1);
                warning2_element.textContent = "Недопустимое значение";
                warning2_element.style.visibility = "visible";
            }
        } else if (parseFloat(input) <= -5) {
            //e.target.value = input.substring(0, input.length - 1);
            warning2_element.textContent = "Недопустимое значение";
            warning2_element.style.visibility = "visible";
        } else if (parseFloat(input) >= 3) {
            //e.target.value = input.substring(0, input.length - 1);
            warning2_element.textContent = "Недопустимое значение";
            warning2_element.style.visibility = "visible";
        }
    };

    //действия при расфокусе поля ввода x
    document.getElementById("x_value").onblur = function (e) {
        warning2_element.style.visibility = "hidden";
        let input = e.target.value;
        if (input === "-") {
            e.target.value = "";
            warning2_element.textContent = "Недопустимое значение";
            warning2_element.style.visibility = "visible";
            setTimeout(function () {
                    warning2_element.style.visibility = "hidden"
                },
                2000);
        }
        if (isNaN(e.target.value)) {
            e.target.value = "";
        }
        if (e.target.value.trim() !== "") {
            e.target.value = parseFloat(e.target.value.trim());
        }
        if (e.target.value.trim() <= -5 || e.target.value.trim() >= 3) {
            e.target.value = "";
        }
    };

    //проверка валидного ввода r
    let warning1_element = document.getElementById("warning1");
    document.getElementById("r_value").oninput = function (e) {
        warning1_element.style.visibility = "hidden";
        let input = e.target.value;
        let incorrect = isNaN(input);
        //console.log(incorrect);
        if ((incorrect === true) || (input[input.length - 1] === " ")) {
            if (input !== "-") {
                //e.target.value = input.substring(0, input.length - 1);
                warning1_element.textContent = "Недопустимое значение";
                warning1_element.style.visibility = "visible";
            }
        } else if (parseFloat(input) <= 2) {
            //e.target.value = input.substring(0, input.length - 1);
            warning1_element.textContent = "Недопустимое значение";
            warning1_element.style.visibility = "visible";
        } else if (parseFloat(input) >= 5) {
            //e.target.value = input.substring(0, input.length - 1);
            warning1_element.textContent = "Недопустимое значение";
            warning1_element.style.visibility = "visible";
        }
    };

    //действия при расфокусе поля ввода r
    document.getElementById("r_value").onblur = function (e) {
        warning1_element.style.visibility = "hidden";
        let input = e.target.value;
        if (input === "-") {
            e.target.value = "";
            warning1_element.textContent = "Недопустимое значение";
            warning1_element.style.visibility = "visible";
            setTimeout(function () {
                    warning1_element.style.visibility = "hidden"
                },
                2000);
        }
        if (isNaN(e.target.value)) {
            e.target.value = "";
        }
        if (e.target.value.trim() !== "") {
            e.target.value = parseFloat(e.target.value.trim());
        }
        if (e.target.value.trim() <= 2 || e.target.value.trim() >= 5) {
            e.target.value = "";
        }
    };


    var plot_canvas = document.getElementById("plot");
    var ctx = plot_canvas.getContext("2d");
    var r = document.getElementById("r_value");

    function draw_canvas() {
        ctx.fillStyle = '#aec4c7';
        ctx.fillRect(150, 150, 100, 50);

        ctx.beginPath();
        ctx.arc(150, 150, 50, Math.PI, 1 / 2 * Math.PI, true);
        ctx.lineTo(150, 150);
        ctx.fill();

        ctx.closePath();
        ctx.beginPath();
        ctx.lineTo(150, 100);
        ctx.lineTo(50, 150);
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
    let r_value = '-1';
    draw_canvas();


    r.addEventListener("change", change_r, false);
    plot_canvas.addEventListener("click", checkPoint, false);

    function checkPoint(e) {

        let x_pix;
        let y_pix;
        let x_canvas;
        let y_canvas;

        if (r_value == '-1') {
            warning3_element = document.getElementById("warning3");
            warning3_element.textContent = "Выберите значение для R!";
            warning3_element.style.visibility = "visible";
            setTimeout(function () {
                    warning3_element.style.visibility = "hidden"
                },
                2000);
        } else {
            //getCursorPosition(e);
            x_pix = getCP_X_pix(e);
            y_pix = getCP_Y_pix(e);
            x_canvas = getCP_X_canvas(x_pix, r_value);
            y_canvas = getCP_Y_canvas(y_pix, r_value);

            /*console.log("x_pix: " + x_pix);
            console.log("y_pix: " + y_pix);
            console.log("x_can: " + x_canvas);
            console.log("y_can: " + y_canvas);*/

            var hit_ans;
            let hit;

            $.ajax({
                type: "GET",//тип запроса: get,post либо head
                url: "control",//url адрес файла обработчика
                data: {'x': x_canvas, 'hidden_y': y_canvas, 'r': r_value},//параметры запроса
                response: 'text', //тип возвращаемого ответа text либо xml
                error: function (message) {
                    //console.log(message);
                },
                success: function (data) {//возвращаемый результат от сервера
                    $('#ans2').remove();
                    $('#ans3').remove();
                    $(data).insertAfter(("#end"));
                    hit_ans = document.getElementsByClassName("hit");
                    hit = hit_ans[hit_ans.length - 1].innerHTML.toString().trim();
                    //console.log("hit_1: " + hit);
                    $('#ans').remove();

                    draw_point(x_pix, y_pix, hit)

                }
            });

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

    function back_to_X_pix(x, new_r){
        return (100*x+150*new_r)/new_r;
    }

    function back_to_Y_pix(y, new_r){
        return (-100*y+150*new_r)/new_r;
    }

    function getCP_X_canvas(x_pix, r) {
        return x = (r / 100 * (x_pix - 150)).toFixed(6);
    }

    function getCP_Y_canvas(y_pix, r) {
        return y = (-r / 100 * (y_pix - 150)).toFixed(6);
    }

    function change_r(e) {
        if (!(isNaN(document.getElementById("r_value").value))
            && (document.getElementById("r_value").value > 2)
            && (document.getElementById("r_value").value < 5)) {
            r_value = document.getElementById("r_value").value;
            let table_x = document.getElementsByClassName("x");
            let table_y = document.getElementsByClassName("y");
            let table_r = document.getElementsByClassName("r");
            let table_hit = document.getElementsByClassName("hit");
            //console.log(table_hit.length);
            if ((table_hit.length != 0) && (table_x.length != 0) && (table_y.length != 0) && (table_r.length != 0)) {
                ctx.clearRect(0, 0, 300, 300);
                draw_canvas();
                for (var i = 0; i < table_hit.length; i++) {
                    console.log(parseFloat(table_r[i].innerHTML) != r_value);
                    if (parseFloat(table_r[i].innerHTML) != r_value){
                        draw_point(back_to_X_pix(table_x[i].innerHTML, r_value),back_to_Y_pix(table_y[i].innerHTML, r_value), "");
                    }else{
                        draw_point(back_to_X_pix(table_x[i].innerHTML, table_r[i].innerHTML),
                            back_to_Y_pix(table_y[i].innerHTML, table_r[i].innerHTML),
                            table_hit[i].innerHTML.trim());
                    }
                }
            }
        } else {
            r_value = -1;
        }
        //alert(r_value);
    }
};


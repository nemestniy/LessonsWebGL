var InitWebGL = function(){
    var VSText, FSText;
    loadTextResource("/lessons/shaders/vertexShader.glsl").then(function(result){
        VSText = result;
        return loadTextResource("/lessons/shaders/fragmentShader.glsl");
    }).then(function(result){
        FSText = result;
        return StartWebGL(VSText, FSText);
    }).catch(function(error){
        alert("Error:  " + error);
        console.error(error);
    })
}

var gl, program, vertexArray = [];

var StartWebGL = function(vertexShaderText, fragmentShaderText){
    console.log("This is working");
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext('webgl');
    
    if(!gl){
        alert("Your browsser doesn`t support WebGL");
        return;
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.addEventListener("mousedown", function(event){
        onmousedown(event, canvas);
    })
    
    gl.viewport(0,0,window.innerWidth, window.innerHeight);
    
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
    
    program = createProgram(gl, vertexShader, fragmentShader);
    
    draw();
        
};

var draw = function(){
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
    
    var positionAttribLocation = gl.getAttribLocation(program, "vertexPosition");
    
    var vertices_number = vertexArray.length / 2;
    
    gl.vertexAttribPointer(positionAttribLocation,
                           2, // Количество элементов на итерацию
                           gl.FLOAT, //Тип данных
                           gl.FALSE, // Нормализация 
                           2 * Float32Array.BYTES_PER_ELEMENT, // Количество элементов на вершину
                           0 * Float32Array.BYTES_PER_ELEMENT // Отступ
                          );
    
    gl.enableVertexAttribArray(positionAttribLocation);
    
    
    gl.clearColor(0.75, 1.0, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    //gl.drawArrays(gl.TRIANGLES, 0 ,vertices_number);  - треугольник
    gl.drawArrays(gl.POINTS, 0 ,vertices_number);    // - точка
    //gl.drawArrays(gl.LINE_STRIP, 0 ,vertices_number); - ломанная
    //gl.drawArrays(gl.LINE_LOOP, 0 ,vertices_number);  - замкнутая линия
    //gl.drawArrays(gl.LINES, 0 ,vertices_number);      - линия
    gl.drawArrays(gl.TRIANGLE_STRIP, 0 ,vertices_number);// - связанные между собой треугольники
    //gl.drawArrays(gl.TRIANGLE_FAN, 0 ,vertices_number); - другой тип связанных между собой треугольников

}

function onmousedown(event, canvas) {
    var x = event.clientX;
    var y = event.clientY;
    var middle_X = gl.canvas.width / 2;
    var middle_Y = gl.canvas.height / 2;
    
    var rect = canvas.getBoundingClientRect();
    x=((x - rect.left) - middle_X)/middle_X;
    y=(middle_Y - (y - rect.top))/middle_Y;
    
    vertexArray.push(x);
    vertexArray.push(y);
    
    draw();
}

document.addEventListener("DOMContentLoaded", function(){
    InitWebGL();

});


/*var target = document.getElementById("your-files");
target.addEventListener("dragover", function(event) {
    event.preventDefault(); // отменяем действие по умолчанию
}, false);
target.addEventListener("drop", function(event) {
    // отменяем действие по умолчанию
    event.preventDefault();
    var i = 0,                                                                  
     files = event.dataTransfer.files,                                                  Drag`n`drop
     len = files.length;
     for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
     }
}, false);*/
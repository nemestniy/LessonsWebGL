var InitWebGL = function(){
    var VSText, FSText;
    LoadTextResource("/lessons/shaders/vertexShader.glsl").then(function(result){
        VSText = result;
        return LoadTextResource("/lessons/shaders/fragmentShader.glsl");
    }).then(function(result){
        FSText = result;
        return StartWebGL(VSText, FSText);
    }).catch(function(error){
        alert("Error:  " + error);
        console.error(error);
    })
}

var StartWebGL = function(vertexShaderText, fragmentShaderText){
    console.log("This is working");
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext('webgl');
    
    if(!gl){
        alert("Your browsser doesn`t support WebGL");
        return;
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,window.innerWidth, window.innerHeight);
    
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        alert("Error compile shader!");
        conosle.error("Shader error info: " + gl.etShaderInfoLog(vertexShader));
    }
    
    gl.compileShader(fragmentShader);
    
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        alert("Error compile shader!");
        conosle.error("Shader error info: " + gl.getShaderInfoLog(fragmentShader));
    }
    
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    
    gl.linkProgram(program);
    gl.validateProgram(program);
    
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error("Error validating program: ", gl.getProgramInfoLog());
        return;
    }
    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    var vertexArray = [
        0.0, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
    
    var positionAttribLocation = gl.getAttribLocation(program, "vertexPosition");
    
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(positionAttribLocation);
    
    gl.clearColor(0.75, 0.9, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0 ,3);
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
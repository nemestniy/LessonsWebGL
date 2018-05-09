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
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,window.innerWidth, window.innerHeight);
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
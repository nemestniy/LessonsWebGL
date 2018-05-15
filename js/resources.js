var loadTextResource = function(url) {
    return new Promise(function(resolve, reject){
       var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function(){
            if(request.status >= 200 && request.status<300){
                resolve(request.responseText);
            } else {
                reject('Error: ' + request.status + ' on url' + url);
            }
        }
        request.send();
    });
}

var createShader = function (context, type, source) {
    var shader = context.createShader(type);
    
    context.shaderSource(shader, source);
    
    context.compileShader(shader);
    
    if(!context.getShaderParameter(shader, context.COMPILE_STATUS)){
        alert("Error compile shader!");
        console.error("Shader error info: " + context.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}

var createProgram = function(context, vertexShader, fragmentShader){
    var program = context.createProgram();
    
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    
    context.linkProgram(program);
    context.validateProgram(program);
    
    if(!context.getProgramParameter(program, context.VALIDATE_STATUS)){
        console.error("Error validating program: ", gl.getProgramInfoLog(program));
        return false;
    }
    
    return program;
}
var c = document.getElementById("baseCanvas");
document.getElementById("generateBtn").onclick = GenerateSomeMaps;
var ctx = c.getContext("2d");

function GenerateSomeMaps()
{
    var nx = 200;
    var ny = 100;

    for(var j = ny - 1; j >= 0; j--){
        for(var i = 0; i < nx; i++){
            var v = new vec3(i/nx, j/ny, 0.2);                        
            var c = new vec3(Math.round(255.99*v.x),
                             Math.round(255.99*v.y),
                             Math.round(255.99*v.z)
                            );

            ctx.beginPath();
            ctx.rect(i, j, 1, 1);        
            ctx.fillStyle = 'rgb(' + c.x + ', ' + c.y + ', ' + c.z +')';

            ctx.fill();
        }
    }
}

function vec3(x, y, z){
        this.x = x;    
        this.y = y;
        this.z = z;
}

vec3.prototype = {
    add : function (toAdd) {
        return new vec3(
            this.x + toAdd.x,            
            this.y + toAdd.y,
            this.z + toAdd.z
        );
    },
    
    subtract : function (toSubtract) {
        return new vec3(
            this.x - toSubtract.x,            
            this.y - toSubtract.y,
            this.z - toSubtract.z
        );
    },
    
    multiply : function (toMultiply) {
        return new vec3(
            this.x * toMultiply.x,            
            this.y * toMultiply.y,
            this.z * toMultiply.z
        );
    },
    
    sMultiply : function (scalar) {
        return new vec3(
            this.x * scalar,            
            this.y * scalar,
            this.z * scalar
        );
    },
    
    divide : function (toDivide) {
        return new vec3(
            this.x / toDivide.x,            
            this.y / toDivide.y,
            this.z / toDivide.z
        );
    },
    
    sDivide : function (scalar) {
        return new vec3(
            this.x / scalar,            
            this.y / scalar,
            this.z / scalar
        );
    },
    
    
    unit : function () {
        var k = 1.0 / Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        return new vec3(
            this.x * k,            
            this.y * k,
            this.z * k
        );
    },
    
    dot : function (vector2) {
        return this.x * vector2.x + this.y * vector2.y + this.z * vector2.z;
    },
    
    cross : function (vector2) {
        return new vec3 ( (this.y * vector2.z - this.z*vector2.y), 
                        (-(this.x * vector2.z - this.z*vector2.x)), 
                          (this.x * vector2.y - this.y * vector2.x));
    },
    
    length : function()
    {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
};

function dot(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function cross(v1, v2)
{
    return new vec3((v1.y * v2.z - v1.z*v2.y), 
                (-(v1.x * v2.z - v1.z*v2.x)), 
                (v1.x * v2.y - v1.y * v2.x));
}

ray.prototype = 
{
    pointAtParam : function(t)
    {
        return this.origin + t * this.direction;
    }
};

function ray(origin, direction)
{
    this.origin = origin;
    this.direction = direction;
}
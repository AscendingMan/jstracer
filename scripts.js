var c = document.getElementById("baseCanvas");
document.getElementById("generateBtn").onclick = GenerateSomeMaps;
var ctx = c.getContext("2d");

function GenerateSomeMaps()
{
    var nx = 200;
    var ny = 100;

    var lowerLeftCorner = new vec3(-2.0, -1.0, -1.0);
    var horizontal = new vec3(4.0, 0.0, 0.0);
    var vertical = new vec3(0.0, 2.0, 0.0);
    var origin = new vec3(0.0, 0.0, 0.0);
    
    
    for(var j = ny - 1; j >= 0; j--){
        for(var i = 0; i < nx; i++){
            var u = i/nx;
            var v = j/ny;
            
            var r = new ray(origin, lowerLeftCorner.add(horizontal.sMultiply(u).add(vertical.sMultiply(v))));
  
            var col = new color(r);
                                  
            var c = new vec3(Math.round(255.99*col.x),
                             Math.round(255.99*col.y),
                             Math.round(255.99*col.z)
                            );

            ctx.beginPath();
            ctx.rect(i, ny - j, 1, 1);        
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

function subtract(v1, v2) {
    return new vec3(
        v1.x - v2.x,            
        v1.y - v2.y,
        v1.z - v2.z
    );
}

function add(v1, v2) {
    return new vec3(
        v1.x + v2.x,            
        v1.y + v2.y,
        v1.z + v2.z
    );
}

function sMultiply (scalar, vector) {
    return new vec3(
        vector.x * scalar,            
        vector.y * scalar,
        vector.z * scalar
    );
}

ray.prototype = 
{
    pointAtParam : function(t)
    {
        return add(this.origin, sMultiply(t, this.direction));
    }
};

function ray(origin, direction)
{
    this.origin = origin;
    this.direction = direction;
}

function color(ray)
{
    this.t = hitSphere(new vec3(0,0,1), 0.5, ray);
    if(this.t > 0.0)
    {
        var tVec = subtract(ray.pointAtParam(this.t), new vec3(0,0,-1));
        var N = tVec.unit();
        return sMultiply(0.5, new vec3(N.x+1, N.y+1, N.z+1))
    }
    this.unitDirection = ray.direction.unit();
    this.t = 0.5*(this.unitDirection.y + 1.0);

    return add(sMultiply(1.0-this.t, new vec3(1,1,1)), sMultiply(this.t, new vec3(0.5, 0.7, 1.0)))
}

function hitSphere(center /*vector*/, radius /*float*/, ray)
{
    this.oc = subtract(ray.origin, center);
    this.a = dot(ray.direction, ray.direction);
    this.b = 2.0 * dot(this.oc, ray.direction);
    this.c = dot(this.oc, this.oc) - radius*radius;
    this.discriminant = this.b*this.b - 4*this.a*this.c;

    if(this.discriminant < 0)
    { 
        return -1.0; 
    }
    else { 
        return (this.b - Math.sqrt(this.discriminant)) / (2.0 * this.a); 
    }
}
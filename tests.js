document.getElementById("testBtn").onclick = testStuff;

function testStuff()
{        
    console.clear();
    
    var test1 = new vec3(5, 6, 7);    
    var test2 = new vec3(5, 6, 7);    
    var test3 = new vec3(14, 1, 8);

    console.log("Add: " + JSON.stringify(test1.add(test2)));
    console.log('Subtract: ' + JSON.stringify(test1.subtract(test2)));
    console.log('Multiply by vector: ' + JSON.stringify(test1.multiply(test2)));    
    console.log('Multiply by scalar: ' + JSON.stringify(test1.sMultiply(2)));
    console.log('Divide by vector: ' + JSON.stringify(test1.divide(test2)));   
    console.log('Divide by scalar: ' + JSON.stringify(test1.sDivide(2))); 
    console.log('Unit vector of ' + JSON.stringify(test1) + ' is: ' + JSON.stringify(test1.unit()));   
    console.log('Dot product (object): ' + JSON.stringify(test1.dot(test3)));    
    console.log('Dot product (global): ' + JSON.stringify(dot(test1, test3)));    
    console.log('Cross product (object): ' + JSON.stringify(test1.cross(test3)));     
    console.log('Cross product (global): ' + JSON.stringify(cross(test1, test3)));    
    console.log('Length: ' + JSON.stringify(test1.length()));
}
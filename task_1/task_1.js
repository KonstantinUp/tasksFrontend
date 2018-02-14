var input = [5,20,23,55,9];
var x = 18;

function getMinDistanceIndex(x,input){
    var min;
    var distance =input.map(function(item,i){
        return Math.abs(item-x)
    });
    distance.forEach(function(item,i){
        if(!min){
            min =  distance[i]
        }
        if (distance[i] < min){
            min = distance[i]
        }
    });

    return distance.indexOf(min);
}
console.log(getMinDistanceIndex(x,input));
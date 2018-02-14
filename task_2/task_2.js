function sum (){
    var result ;

    if(arguments.length > 1){
        result = [...arguments].reduce(function(sum,current){
            return  sum + current;
        },0)
    } else {
        result = arguments[0];
    }

    var fn = function(){
        return  sum(...[result,...arguments]);
    };

    fn.valueOf = function(){
        return  result;
    };

    return fn;
}


console.log(sum(1,2)(3)(5));
let str = '<b data-count="4"><i data-sum="5"></i></b>';

function replacer(str){
    return str*3;
}

let result = str.replace(/(?<=data-count=")(.*?)(?=")|(?<=data-sum=")(.*?)(?=")/g,replacer);

console.log(result);
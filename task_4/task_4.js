
let str ="I'm 'lucky'' ".replace(/(?<=(\w)|(\W))(')(?!\w)|(?<!\w)(')(?=(\w)|(\W))/g,'"');

console.log(str);
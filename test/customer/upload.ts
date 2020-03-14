import upload from '../../Tools/upload';

let buffer = new Buffer('var a = 1; b =2 ;');
upload(buffer, 'aa.js').then(res => {
  console.log(res)
})
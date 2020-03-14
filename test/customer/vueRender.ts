import render from '../../Tools/vueRender';

console.log('vueRender is testing');

const test1 = async() =>  {
  let result = await render('<html><body><div>{{msg}}</div></body></html>', {msg: 10900000});
  console.log(result)
}

test1();
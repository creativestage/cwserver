let dbUrl = 'zhangyy.xyz:20000';

try {
  let param = JSON.parse(process.env.npm_config_argv).original[2];
  console.log(param)
  if (param && param.slice(2) === 'develop') {
    dbUrl = 'localhost:27017'
  }
} catch(e) {}

export default {
  dbUrl
};
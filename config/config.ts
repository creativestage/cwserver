let production_url = 'zhangyy.xyz:20000';
let develop_url = 'localhost:27017';
function getIPAdress(){  
  var interfaces = require('os').networkInterfaces();  
  for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
             var alias = iface[i];  
             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                   return alias.address;  
             }  
        }
  }
}
let ip = getIPAdress();
let isProd = ip === '172.16.49.207';
let dbUrl = isProd ? production_url : develop_url;

export default {
  dbUrl,
  safeOrigins: ['http://localhost:8080', 'http://zhangyy.xyz:8080'],
  accessKey : 'K4Krrpup7qqfV0T5Y4g6xRBLB5LHUWF3zYAnsDgx',
  secretKey : 'R3oN2togvlcExR4bKNSk5BpbqswrxsH6StURTAKp',
  scope: 'public',
  scopeBashSource: 'http://qn.zhangyy.xyz/',
  uploadHost: 'qn.zhangyy.xyz',
};
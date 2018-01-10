const request = require('request');
const _ = require('lodash');
const fs = require('fs');
const readlineSync = require('readline-sync');
const WordTable = require('word-table');

const header = ['车次', '出发站', '到达站', '出发时间', '到达时间', '历时', '特等座', '一等座', '二等座', '高级软卧', '软卧', '动卧', '硬卧', '硬座', '无座'];
const body = [];

// request('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8955', (err, response, data) => {
//   if(err) {
//     console.log(err);
//   } else {
//     data = data.split('@');
//     data.shift(0);
//     const arr = {};
//     _.forEach(data, item => {
//       item = item.split('|');
//       arr[item[1]] = item[2];
//     });
//
//     // fs.stat('./stations.json', (err, stat) => {
//     //   if (stat && stat.isFile()) {
//     //     console.log('文件存在');
//     //   } else {
//     //     console.log('文件不存在');
//     //     fs.writeFile('stations.json', JSON.stringify(arr),  function(err) {
//     //       if (err) {
//     //         return console.error(err);
//     //       }
//     //       console.log("数据写入成功！");
//     //     });
//     //   }
//     // });
//     console.log(arr['北京']);
//   }
// });


var from = readlineSync.question('出发站:');
var to = readlineSync.question('到达站:');
var date = readlineSync.question('出发日期:');

console.log(from, to, date);

var options = {
  url: 'https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-01-11&leftTicketDTO.from_station=BJP&leftTicketDTO.to_station=SHH&purpose_codes=ADULT',
  headers: {
      'verify': 'false'
    }
};
request(options, (err, response, data) => {
  if(err) {
    console.log(err);
  } else {
    data = JSON.parse(data);
    var arr = data.data.result;
    _.forEach(arr, item => {
      item = item.split('|');
      const a = [item[3], item[4], item[5], item[8], item[9], item[10], item[32] || '--', item[31] || '--', item[30] || '--', item[21] || '--', item[23] || '--', item[33] || '--', item[28] || '--', item[29] || '--', item[26] || '--'];
      body.push(a);
    });
    var wt = new WordTable(header, body);
    console.log(wt.string());
  }
})

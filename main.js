const request = require('request');
const _ = require('lodash');
const fs = require('fs');

request('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8955', (err, response, data) => {
  if(err) {
    console.log(err);
  } else {
    data = data.split('@');
    data.shift(0);
    const arr = {};
    _.forEach(data, item => {
      item = item.split('|');
      arr[item[1]] = item[0];
    });
    fs.stat('./stations.js', (err, stat) => {
      if (stat && stat.isFile()) {
        console.log('文件存在');
      } else {
        console.log('文件不存在');
        fs.writeFile('stations.js', JSON.stringify(arr),  function(err) {
          if (err) {
            return console.error(err);
          }
          console.log("数据写入成功！");
        });
      }
    });
    // console.log(arr);
  }
});

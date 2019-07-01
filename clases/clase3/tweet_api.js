function searchedData(err, data, response) {
  console.log(data);
} 

var Twit = require('twit');
var config = {
  consumer_key: 'A0ChTLaKy9ZBUHVrCdVXU4uzG',
  consumer_secret: '6tAGUj5L3WlPhMl2cShS4jbnAEhoFLed8FyrL9sHrtz8RvltqM',
  access_token: '15191160-SZVTTWEkwmjIXM5Ub3olUQ2803avuUupuyZDgznDp',
  access_token_secret: 'OCCtNAOX12me7kI71QKeW1mUviM75cXQL2pyHrP2ONtXB'
}

var T = new Twit(config);

var params = {
  q: '#copaamerica',
  count: 100
} 

T.get('search/tweets', params, searchedData); 

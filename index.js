const mqtt = require('mqtt').connect('mqtt://192.168.3.4');
const mysql = require('mysql').createConnection({
  host     : 'db.yimian.xyz',
  user     : 'home',
  password : 'KJ4j2JL6s^k@jsa2',
  database : 'home'
});



mysql.connect();
const sql = 'INSERT INTO sola_mqtt(timestamp,topic,value) VALUES(?,?,?)';



mqtt.on('connect', function () {
  mqtt.subscribe('hass/#', function (err) {
    if (!err) {
      console.log('Connected...');
    }
  })
})
 
mqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString(), message.toString());
  let params = [(new Date()).valueOf(), topic.toString(), message.toString()];

  mysql.query(sql,params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
	});
 

})
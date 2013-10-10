var express=require('express')
    ,app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , mysql = require("mysql");

server.listen(8082);
app.use(express.static(__dirname + '/views'));
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456Ac',
    database: 'test',
    charset: 'utf8',
    debug: false
});

var sql = "select xrptrandetail.Account,";
sql += "xrptrandetail.Hash,";
sql += "xrptrandetail.DestinationTag,";
sql += "xrptrandetail.Amount,";
sql += "betdetail.WinFlg,";
sql += "betdetail.WinAmount,";
sql += "xrptrandetail.Date";
sql += " from xrptrandetail inner join betdetail ";
sql += " on xrptrandetail.Hash = betdetail.Hash ";
sql += " order by xrptrandetail.Date desc ";
sql += " limit 0,10 ";

var results;

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket) {
    setInterval(function () {
        connection.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }
             results = rows;
        });
        socket.emit('message', {"res":results});
    }, 1000);

    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
});
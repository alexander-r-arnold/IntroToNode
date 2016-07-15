var cluster = require('cluster');
var http = require('http');
var numWorkers = 2;

if (cluster.isMaster) {
    // Fork to a Worker
    for (var i = 0; i < numWorkers; ++i) {
        console.log('master forking to a work...');
        cluster.fork();
    }
    
    cluster.on('fork', function(worker) {
        console.log('master: fork event (worker ' + worker.id + ')');
    });
    
    cluster.on('oneline', function(worker) {
        console.log('master: online event (worker ' + worker.id + ')');
    });
    
    cluster.on('listening', function(worker, address) {
        console.log('master: listening event (worker ' + worker.id + ', pid ' + worker.pid + ')');
    });
    
    cluster.on('exit', function(worker, code, signal) {
        console.log('master: exit event (worker ' + worker.id + ')');
    });
    
} else {
    
    console.log('worker: worker #' + cluster.worker.id + ' ready!');
    
    var count = 0;
    
    // Workers can share a TCP connection
    // ... or in this case a HTTP server
    http.createServer(function(req, res) {
        res.writeHead(200);
        // console.dir(req);
        count++;
        console.log('worker: worker #' + cluster.worker.id + ' is incrementing count to ' + count);
        res.end("hello world from worker #", cluster.worker.id + " (pid " + cluster.worker.process.pid + ") with count = " + count);
        if (count === 3) {
            cluster.worker.destory();
        }
    }).listen(process.env.PORT, process.env.IP);
}
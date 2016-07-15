var os = require('os');

var toMb = function(f) {
    return (Math.round((f/1024/2024)*100)*100);
};

// This is so basic, not documentation needed.
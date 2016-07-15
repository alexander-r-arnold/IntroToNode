var showDebug = function() {
    console.log("200 ms later...");
};

setTimeout(showDebug, 200);

console.log("Running!");
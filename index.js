const walkDir = require('./util/walkDir.js');

const deepEqual = require('deep-equal');
const fs = require('fs');
const path = require('path');

function pathToFileContents(path){
    return fs.lstatSync(path).isDirectory()?'':fs.readFileSync(path).toString();
}

module.exports = function(originalPath,otherPath){

    

    const originalPaths = walkDir(originalPath)
    const otherPaths = walkDir(otherPath);

    const originPathBase = path.join(__dirname,'tests',originalPath);
    const otherPathBase = path.join(__dirname,'tests',otherPath);
    
    const originalPathsLocal = originalPaths.map(path=>path.substr(originPathBase.length))
    const otherPathsLocal = otherPaths.map(path=>path.substr(otherPathBase.length))




    if (deepEqual(originalPathsLocal,otherPathsLocal)) {
        const originalPathContents = originalPaths.map(pathToFileContents);
        const otherPathContents = otherPaths.map(pathToFileContents)
        if (deepEqual(originalPathContents,otherPathContents)) {

            return true;
        }
        return false;
    }
    else {
        return false;
    }
}

const assert = require('assert');
const dirSame = require('../index.js');
const path = require('path');

const originalDirectory = path.join(__dirname,'original-directory');
const identicalDirectory = path.join(__dirname,'identical-directory');
const changeADirName = path.join(__dirname,'change-a-dir-name');
const changeAFileName = path.join(__dirname,'change-a-file-name');
const changeDirContents = path.join(__dirname,'change-dir-contents')
const changeDirContentsEmptyDir = path.join(__dirname,'change-dir-contents-empty-dir')

const changeFileContents = path.join(__dirname,'change-file-contents');

describe('identical directory', function(){
    it('should be identical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,identicalDirectory));
    });
})

describe('change-a-dir-name', function(){
    it('should be flagged as unidentical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,changeADirName) === false);
    })
})

describe('change-a-file-name', function(){
    it('should be flagged as unidentical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,changeAFileName) === false);
    })
})

describe('change-dir-contents', function(){
    it('should be flagged as unidentical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,changeDirContents) === false);
    })
})

describe('change-dir-contents-empty-dir', function(){
    it('should be flagged as unidentical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,changeDirContentsEmptyDir) === false);
    })
})

describe('change-file-contents', function(){
    it('should be flagged as unidentical to the original directory',function(){
        assert.ok(dirSame(originalDirectory,changeFileContents) === false);
    })
})


describe.skip('support-empty-directory', function(){
    it('delete added-file-in-folder in change-dir-contents and it does not work',function(){
        assert.ok(dirSame(originalDirectory,changeFileContents) === false);
    })
})

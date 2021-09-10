#!/usr/bin/env node
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");
//const { clear } = require("console");
let inputArr=process.argv.slice(2);
let command=inputArr[0];
switch(command){
    case "tree":
    treeObj.treefxn(inputArr[1])
      break;
    case "organize":
      organizeObj.organizefxn(inputArr[1])
     break;
     case "help":
        helpObj.helpfxn()
        break;
    default:
        console.log("kindly enter the correct cmd");
        break;
}
let fs=require("fs");
let path=require("path");

function treeFn(dirPath){
    if(dirPath==undefined){
      dirPath=process.cwd();
    }
    
        let doesExist=fs.existsSync(dirPath);
              if(doesExist){
                treeHelper(dirPath,"");
                }
             else{  console.log("kindly enter the correct path");
                  return;
               }

}

 function treeHelper(src,indent){
        let isFile=fs.lstatSync(src).isFile();
        if(isFile==true){
             console.log(indent+"|--"+path.basename(src));
            
            }
        else{
             console.log(indent+"|__"+path.basename(src));
             let childNames=fs.readdirSync(src);  

             for(let j=0;j<childNames.length;j++)
             {
                let childPath=path.join(src,childNames[j]);
                treeHelper(childPath,"\t"+indent);
             }
            }
 }

module.exports={
    treefxn:treeFn
}
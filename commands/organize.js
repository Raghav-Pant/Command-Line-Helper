let fs=require("fs");
let path=require("path");
let types={
    media:["mb4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odp','odg','odf','txt','ps','text'],
    app:['exe','dmg','pkg','deb']
}
function organizeFn(dirPath){
    let desPath;
    if(dirPath==undefined){
       dirPath=process.cwd();
    }
    
  let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            desPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(desPath)===false){
            fs.mkdirSync(desPath);
             }
         }
         else{  console.log("kindly enter the correct path");
                  return;
          }
     
    organizeHelper(dirPath,desPath);
}

function organizeHelper(src,dest){
    let childNames=fs.readdirSync(src);
    for(let i=0;i<childNames.length;i++)
    {    let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        console.log(isFile);
        if(isFile){
             let category=getCategory(childNames[i]);
             sendFiles(childAddress,dest,category);
            }
    }
}
function sendFiles(srcFilePath,destOrgfile,category)
{
    let catDirPath=path.join(destOrgfile,category);
    if(fs.existsSync(catDirPath)==false)
    {
           fs.mkdirSync(catDirPath);
    }
    let nameFile=path.basename(srcFilePath);
    let dest=path.join(catDirPath,nameFile);
    fs.copyFileSync(srcFilePath,dest);
    console.log(nameFile +"---->"+category);
}
function getCategory(name)
{
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {
       for(let i=0;i<types[type].length;i++)
       {
           if(ext==types[type][i])
           {
               return type;
           }
       }
    }
    return "others";
}


module.exports={
    organizefxn:organizeFn,
    utility:types
}
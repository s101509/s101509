import fs from 'fs';

listAllJSRecursive('C:\\Users\\wytam\\Documents\\TeckyCMS').catch(function(err){
    console.log(err)
});

async function listAllJSRecursive(path: string): Promise<void> {
    const files = await fs.promises.readdir(path);
    for (const file of files){
        try{
        const stat = await fs.promises.stat(path + "/" + file)
        if(!stat.isDirectory()){
            listAllJSRecursive(path + "/" + file)
        }
if (!stat.isDirectory() && file.endsWith('.js')){
            console.log(path + "/" +file)
        }
    }catch(e){
        console.log(e)
    }
  }
}

import fs from 'fs';

listAllJS('C:\\Users\\wytam\\Documents\\TeckyCMS\\GameOfLife');

async function listAllJS(path: string): Promise<void> {
    const files = await fs.promises.readdir(path);
    for (const file of files){
        const stat = await fs.promises.stat(path + "/" + file)
        if(!stat.isDirectory() && file.endsWith('.js')){
            console.log(file)
        }
    }
}


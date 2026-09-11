const fs = require("fs");
const path = require("path");
const watch_dir = path.join(__dirname ,"watch");
const {sortFile }=require('./sorter');

const timers = new Map();

fs.watch(watch_dir , (eventType , filename)=>{
    if(!filename){
        return;
    }
    if(timers.has(filename)){
        clearTimeout(timers.get(filename));//debouncing.
    }
    timers.set(filename, setTimeout(async()=>{
        timers.delete(filename);
        const fullPath = path.join(WATCH_DIR, filename);
        try {
            await fs.promises.access(fullPath);
            await sortFile(watch_dir ,filename);
        }
        catch{

        }
    },500))
})
console.log(`watching ${watch_dir}`);

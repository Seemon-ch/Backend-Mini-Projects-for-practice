const fs = require('fs').promises;
const path = require('path');
const categories = {
    '.jpg': 'Images', 
    '.png': 'Images',
    '.gif': 'Images',
    '.pdf': 'Docs',
    '.docx' :'Docs',
    '.txt': 'Docs',
    '.mp4': 'Videos',
    '.mov': 'Videos',
    '.zip': 'Archives',
    '.rar': 'Archives'
}
async function sortFile(dir , filename){
    const extname = path.extname(filename).toLowerCase();
    const category = categories[extname] || 'Other';
    const categoryDir = path.join(dir , category) ;
    await fs.mkdir(categoryDir ,{recurive:true}); //Creates the category folder if it doesn't already exist.

    const src =path.join(dir, filename);
    const dest =path.join(categoryDir,filename);
    try{
        await fs.rename(src,dest);
        console.log(`Moved ${filename} -> ${category}`);

    }
    catch(err){
        console.error(`Couldn't move ${filename}: ${err.message}`);
    }
    
}

module.exports = {sortFile};
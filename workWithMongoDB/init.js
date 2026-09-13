const mongoose =require('mongoose');
const Chat = require('./models/chat.js');

main().then(()=>{
    console.log("connection sucessful");
})
.catch(err => console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

let allchats =[
    {
    from:"jhon",
    to:"jack",
    msg:'long time no see',
    created_at: new Date()
    },
    {
    from:"henrry",
    to:"hack",
    msg:'what are the timing tomorrow?',
    created_at: new Date()
    },
    {
    from:"payal",
    to:"kajal",
    msg:'hello sis , what are u doing today?',
    created_at: new Date()
    },
    {
    from:"nethra",
    to:"juli",
    msg:'where are you dear love?',
    created_at: new Date()
    }

];

Chat.insertMany(allchats);
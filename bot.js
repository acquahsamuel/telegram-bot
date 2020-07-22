const Telegraf = require('telegraf');
const axios = require('axios');

const dotenv = require("dotenv");
dotenv.config({path: './.env'});

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.command('fortune',  ctx => {
    axios.get('http://yerkee.com/api/fortune').then(res => { // console.log(res.data.fortune);
       ctx.reply(res.data.fortune);
    }).catch(err => {
        console.log(err);
    })
})


// bot.command('cat', async ctx => {
//     let input = ctx.message.text;
//     let inputArray = input.split(" ");

//     if (inputArray.length === 1) {
//         try {
//             // Main API = https://aws.random.cat/meow
//             let res = await axios.get('');
//             console.log(res);
//             ctx.replyWithPhoto(res.data.file);
//         } catch (err) {
//             console.log(err);
//         }
//     }else{
//         inputArray.shift();
//         input = inputArray.join(" ");
//         ctx.reply(`https://cataas.com/cat/says/hello%20world!/${input}`);
//     }
// })


bot.launch();

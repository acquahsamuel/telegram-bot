const Telegraf = require('telegraf');
const axios = require('axios');
const fs = require('fs');

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const bot = new Telegraf(process.env.BOT_TOKEN_FACT);
let dataStore = [];

 getData();


bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
        return(item.row == '1' && item.col == '2');
    })[0].val;


    let k = Math.floor(Math.random() * maxRow) + 1;
    let fact = dataStore.filter(item => {
        return(item.row == k && item.col == '5');
    })[0];

    let message = `
        Fact # ${
        fact.row
    }:
        ${
        fact.val
    };
    `
    ctx.reply(message)
})

bot.command('update', async ctx=>{
    try{
        await getData();
        ctx.reply('updated');
    }catch(err){
        console.log(err);
        ctx.reply('Error Occured')
    }
})


async function getData() {
    try {
        let res = await axios('https://spreadsheets.google.com/feeds/cells/1qwunC72mqNN2Vfy2tIiOrwpxOnHn3AnWmLfsf18llIA/1/public/full?alt=json');
        // console.log(res.data.feed.entry);
        let data = res.data.feed.entry;
        dataStore = [];
        data.forEach((item) => {
            dataStore.push({row: item.gs$cell.row, col: item.gs$cell.col, val: item.gs$cell.inputValue});
        });
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

bot.launch();

/***************  WEATHER TELEGRAM BOT  ***************/
const config = require('config');
const Bot = require('node-telegram-bot-api');
const request = require('request');
const http = require('http');

/*** TELEGRAM API ***/
//You should choose your own telegram bot token
const token = config.get('token');
const botName = 'SousendBot';

/*** WEATHER API ***/
const sity = 'Krasnodar';
const kelvin = 273.15;
//You should choose your own openweathermap id
const appId = config.get('appId');
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${appId}&q=${sity}`;

const bot = new Bot(token, { polling: true });

bot.onText(/\/weather/, (msg, [source, match]) => {
    const chatId = msg.chat.id;

    request.get(weatherUrl, (err, res, body) => {
        if(err) { throw new Error(err); }
        let data = JSON.parse(body);
        bot.sendMessage(chatId, `${msg['chat']['first_name']}, погода в Краснодаре составляет ${(data['main']['temp'] - kelvin).toFixed(1)} °C`);
    });
});
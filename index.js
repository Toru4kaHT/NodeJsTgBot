const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, reRun} = require('./options.js')
const token = '70******25:AAFv******cNaIp******yD5ZYV-*******'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

bot.setMyCommands([
    {command: '/start', description: 'Start greeting'},
    {command: '/info', description: 'About this bot and...'},
    {command: '/game', description: 'Guess the number game'}
])

const startGameFunc = async (chatId) => {
        await bot.sendMessage(chatId, 'Guess  number from 1 to 9 and you have to guess which number it is')
        const randomNumber = Math.floor(Math.random() * 10) 
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'Guess the number', gameOptions);
    
}

bot.on('message', async msg => {
    console.log(msg)
    const text = msg.text
    const chatId = msg.chat.id
    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://sl.combot.org/okkotsu0yuta/webp/1xf09f988a.webp')
        return bot.sendMessage(chatId, 'Holas my Bros! Its a calls backs bots. COMMANDS: /info - get info about you :)')
    }
    if (text === '/info'){
        return bot.sendMessage(chatId, `Its just call back bot wtf XDDDDDD~~~~HONK~~HONK~~HONK and you full name is "${msg.from.first_name}", "${msg.from.last_name}"`);
    }    if (text === '/game') {
    return startGameFunc(chatId)
    }
    return bot.sendMessage(chatId, 'What you say? repeat pls.')
})

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
        return startGameFunc(chatId)
    }
    if (data === '/back') {
        return bot.sendMessage(chatId, 'Holas my Bros! Its a calls backs bots. COMMANDS: /info - get info about you :)')
    }
    if (chats[chatId] === data) {
        await bot.sendMessage(chatId, `You guessed it! my congratulations! The number I wished for was ${chats[chatId]}`)
    } else {
        await bot.sendMessage(chatId, `You didn't guess right! Try it another time. The number I wished for was ${chats[chatId]}`)
    }
    await bot.sendMessage(chatId, 'Shall we repeat it again?', reRun)
    console.log(msg)
})
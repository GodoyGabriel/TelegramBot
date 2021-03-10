const express = require('express');
const cors = require('cors');
const app = express();
const { Telegraf } = require('telegraf')
//Config
const { config } = require('./config/configSV');
//Body parser
app.use(express.json());
app.use(cors());
//Router api

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})
bot.context.db = {
  getScores: () => { return 42 }
}

/* bot.on('text', (ctx) => {
  const scores = ctx.db.getScores(ctx.message.from.username)
  console.log(ctx.message)
  return ctx.reply(`${ctx.message.from.username}: ${scores}`)
}) */
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hola' || 'Hola', (ctx) => {
  ctx.reply(`Hola ${ctx.message.from.first_name} ${ctx.message.from.last_name}`)}
)
bot.hears('info', (ctx) => ctx.getChat())
bot.hears('test', (ctx) => ctx.reply('Test iniciado'))
bot.launch()

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
  console.log(`Token: ${process.env.BOT_TOKEN}`);
});
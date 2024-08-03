import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN);

export default async function handler(req, res) {
  const vercelUrl = req.headers['x-forwarded-host'] || process.env.VERCEL_URL;
  const url = `https://${vercelUrl}/api/bot`;
  try {
    await bot.setWebHook(url);
    res.status(200).send(`Webhook set to ${url}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error setting webhook');
  }
}
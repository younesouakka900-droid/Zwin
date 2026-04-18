export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).end();

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const APP_URL = 'https://zwin.vercel.app';

  const body = req.body;
  const message = body?.message;
  if (!message) return res.status(200).end();

  const chatId = message.chat.id;
  const text = message.text || '';

  if (text === '/start') {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: 'https://raw.githubusercontent.com/younesouakka900-droid/Zwin/main/zwin-welcome.png',
        caption: 'مرحباً بك في ZWIN!\n\n انقر واكسب $ZWIN يومياً\n تنافس مع آلاف اللاعبين\n Airdrop قادم لأوائل اللاعبين\n\nاضغط Play للبدء الآن!',
        reply_markup: JSON.stringify({
          inline_keyboard: [[
            { text: 'العب الآن', web_app: { url: APP_URL } }
          ]]
        })
      })
    });
  }

  return res.status(200).json({ ok: true });
}

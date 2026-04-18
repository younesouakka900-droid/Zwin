export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ ok: false, error: 'userId مطلوب' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHANNEL = '@ZwinCoin';

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: 'التوكن غير مضبوط' });
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL}&user_id=${userId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) {
      return res.status(200).json({ ok: false, member: false });
    }

    const status = data.result?.status;
    const isMember = ['member', 'administrator', 'creator'].includes(status);

    return res.status(200).json({ ok: true, member: isMember, status });

  } catch (err) {
    return res.status(500).json({ ok: false, error: 'خطأ في الاتصال' });
  }
}

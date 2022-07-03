import express from 'express';
import { Webhook } from './types/webhook.types'
import axios from 'axios';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 8080;

const CONFIG = {
	WEBHOOK_URL: 'https://discord.com/api/webhooks/993029971012497448/ND1jWSwEmrtb7_Yk81C5OYHDRFH0E6wOcRT8MGWJ-NpDnKnOJuamvgzl7sSB3Hzk8bQO',
	CENSORSHIP: true,
	RATE_LIMITING: {
		ENABLED: true,
		SETTINGS: {
			EXPIRY: 1000 * 60, //Amount of time it takes to expire.
			MAX_REQUESTS: 3
		}
	},
	KEY: {
		ENABLED: false,
		KEY: 'super secure and secret key'
	}
};

const CENSORED_WORDS = ['discord.gg', 'hate speech'];

app.use(bodyParser.json());

if (CONFIG.RATE_LIMITING.ENABLED) {
	app.use(rateLimit({
		windowMs: CONFIG.RATE_LIMITING.SETTINGS.EXPIRY,
		max: CONFIG.RATE_LIMITING.SETTINGS.MAX_REQUESTS,
		standardHeaders: true,
		legacyHeaders: false
	}));
}

app.post("/webhook", ( req, res ) => {
	if (CONFIG.CENSORSHIP) {
		let stringifiedBody = JSON.stringify(req.body).toLowerCase();
		for (let WORD of CENSORED_WORDS) {
			if (stringifiedBody.includes(WORD)) { throw new Error('Attempted to use a censored word'); }
		}
	}

	if (CONFIG.KEY.ENABLED && req.body.key != CONFIG.KEY.KEY) { throw new Error('Invalid Key'); }

	const webHook = new Webhook(req.body.username, req.body.content, req.body.avatar_url, req.body.embeds);
	sendWebhook(webHook, CONFIG.WEBHOOK_URL).then(_ => {
		res.status(200).send('Success');
	}).catch(err => {
		res.status(500).send(`Malformed data sent | ${err}`);
	});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const sendWebhook = async (body: Webhook, webhook_url: string): Promise<void> => {
	await axios(webhook_url, {
		method: 'post',
		data: body

	}).catch((err: any) => {
		console.log(err)
	});

	return Promise.resolve();
}
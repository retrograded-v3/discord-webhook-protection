# Discord Webhook Protection

This is a simple REST server written in Express.js that will protect Discord webhooks from malicious users.


## Features

<ul>
	<li>📨 Rate Limiting</li>
	<li>🔐 Key Authentication</li>
	<li>🙊 Word/Phrase Censorship</li>
</ul>
&nbsp;

## Installation and Configuration
### In order to use this you need Node JS installed on the server you intend on deploying to
&nbsp;

### **📋 Cloning the repository**
	$ git clone https://github.com/retrograded-v3/discord-webhook-protection.git
&nbsp;
### **⏬ Installing the dependencies**
	$ cd discord-webhook-protection
	$ npm i
&nbsp;
### **🔄 Compile to JS and running**
	$ tsc
	$ node ./dist/app.js
&nbsp;

## Composing Requests
### There **should** be full coverage of the Discord API. Meaning you can compose requests to Discord specifications. You can compose requests like this:

	Webhook {
		username: String,
		content: String,
		avatar_url?: String,
		embeds?: Array<Embed>
	}

&nbsp;

	Embed {
		title?: String,
		type?: String,
		description?: String,
		url?: String,
		timestamp?: Number<ISO_8601>,
		color?: Number,
		footer?: Footer,
		image?: Image,
		thumbnail?: Thumbnail,
		video?: Video,
		author?: Author,
		fields?: Array<Field>
	}

&nbsp;

	Footer {
		text: String,
		icon_url?: String,
		proxy_icon_url?: String
	}

&nbsp;

	Thumbnail {
		url: String
	}

&nbsp;

	Image & Video {
		url: String,
		proxy_url?: String,
		height?: Number,
		width?: Number
	}

&nbsp;

	Author {
		name: String,
		url?: String,
		icon_url?: String,
		proxy_icon_url?: String
	}
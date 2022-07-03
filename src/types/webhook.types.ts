import moment from 'moment'

const ISOCheck = (data: any):boolean => {
	if(moment(data, moment.ISO_8601, true).isValid()) { return true; }
	return false;
}

interface Author {
	name: string, // Max 256 characters
	url?: string,
	icon_url?: string,
	proxy_icon_url?: string
}

interface Footer {
	text: string, // Max length 2048 characters
	icon_url?: string,
	proxy_icon_url?: string
}

interface Thumbnail {
	url: string
}

interface Image {
	url: string,
	proxy_url?: string,
	height?: number,
	width?: number
}

interface Video extends Omit<Image, 'url'> {
	url?: string
}

interface Field {
	name: string, // Max length 256 characters
	value: string, // Max length 1024 characters
	inline?: boolean
}

interface Embed {
	title?: string, // Max length 256 characters
	type?: string,
	description?: string, // Max length 2048 characters
	url?: string,
	timestamp?: number,
	color?: number,
	footer?: Footer,
	image?: Image,
	thumbnail?: Thumbnail,
	video?: Video,
	author?: Author,
	fields?: Array<Field> // Max length 25 fields
}

export class Webhook {
	username: string;
	content: string;
	avatar_url?: string;
	embeds?: Array<Embed>;

	constructor(username: string, content: string, avatar_url?: string, embeds?: Array<Embed>) {
		this.username = username;
		this.avatar_url= avatar_url;
		this.content = content;
		
		if (content.length > 2000) { throw new Error("Content length must not exceed 2000 characters") }
		
		if(embeds) {
			this.embeds = embeds
			if (embeds.length > 10) { throw new Error('Amount of embeds should not exceed 10') }
			for (let embed of embeds) {
				if (embed.title && embed.title.length > 256) { throw new Error('Title length should not exceed 256 characters') }
				if (embed.description && embed.description.length > 2048) { throw new Error('Description length should not exceed 2048 characters') }
				
				if (embed.fields) {
					if (embed.fields.length > 25) { throw new Error('Amount of fields should not exceed 25') }
					for (let field of embed.fields) {
						if (field.name.length > 256) { throw new Error('Field name should not exceed 256 characters') }
						if (field.value.length > 1024) { throw new Error('Field value should not exceed 1024 characters') }
					}
				}
	
				if (embed.footer && embed.footer.text.length > 2048) { throw new Error('Footer length should not exceed 2048 characters') }
				if (embed.author && embed.author.name.length > 0) { throw new Error('Name length should not exceed 256 characters') }
				
				if (embed.timestamp && !ISOCheck(embed.timestamp)) { throw new Error('Timestamp not in ISO_8601 format')}
			}
		}

	};
}
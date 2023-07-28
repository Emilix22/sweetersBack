const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Se conectó ok!');
});

client.on('message', message => {
	if(message.body === 'Hola emibot') {
		client.sendMessage(message.from, 'Hola soy Emilix, tu Bot personal');
	}
});


client.initialize();
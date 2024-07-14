const express = require('express');
const bodyParser = require('body-parser');
const app = express({});
const netstat = require('node-netstat');

const parser = netstat.parserFactories.linux({});

const PORT = parseInt(process.env.PORT ?? '3000');

app.use(bodyParser.json());
app.post('/health/report', async (req, res) => {
	console.log(req.body);
	console.log(`Length: ${JSON.stringify(req.body).length}`);

	res.status = 200;
	res.json({
		Message: "received"
	});
});

console.log("Hello via Bun!");

app.listen(PORT, () => {
	
	console.log(`Listening on port ${PORT}`);
});

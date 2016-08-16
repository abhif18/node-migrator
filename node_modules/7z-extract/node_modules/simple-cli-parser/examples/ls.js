'use strict';

const cli = require('../index');

let download = new cli([ 'ls', '-la', __dirname ])
	.then(res => { if (res){ console.log('Success!', res); } })
	.catch(err => { if (err){ console.log('Failed!'); } });
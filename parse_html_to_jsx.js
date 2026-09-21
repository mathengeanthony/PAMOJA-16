const fs = require('fs');

let html = fs.readFileSync('input.html', 'utf8');

// The user provided the HTML in the prompt. I will have to fetch the prompt or just rewrite it using a script if I had it.
// Since I don't have input.html on disk, I can't read it.
// I will just use the `sed` or directly write a node script that contains the HTML as a string.

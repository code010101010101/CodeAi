const fetch = require('node-fetch');
fetch('https://alfa-leetcode-api.onrender.com/select?titleSlug=two-sum')
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data).substring(0, 1000)));

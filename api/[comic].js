const axios = require('axios');

let url = '';

const  getComic = (url) => 
  axios.get(url).then(res => res.data)


module.exports = async (req, res) => {
  const {
    query: { comic } } = req
  if (comic === 'last') { url = `https://xkcd.com/info.0.json` }
  else { url = `https://xkcd.com/${comic}/info.0.json`};
  let data = await getComic(url)
  res.json(data);
}
const axios = require('axios');

let url = '';

const getComic = (url) => axios.get(url)
  .then(res => res.data)

module.exports = async (req, res) => {
  try {
    const { query: { comic } } = req
    if (comic === 'last') { url = `https://xkcd.com/info.0.json` }
    else { url = `https://xkcd.com/${comic}/info.0.json`};
    let data = await getComic(url)
    res.json(data);
  } catch (error) {
    let e = {"errorMsg": "Comic not available"}
    res.json(e)
  }
}

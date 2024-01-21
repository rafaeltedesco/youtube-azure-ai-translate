const aiTranslateService = require('../services/aiTranslate');

const getExamples = async (req, res) => {
  try {
    const { body: { text }, query: { from, to = 'en' }} = req;
    const response = await aiTranslateService.getExamples({ text, to, from });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }  
}

module.exports = {
  getExamples,
}
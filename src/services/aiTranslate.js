const TextTranslationClient = require('@azure-rest/ai-translation-text').default;
const { isUnexpected } = require('@azure-rest/ai-translation-text');

const endpoint = process.env.ENDPOINT;
const credentials = {
  key: process.env.API_KEY,
  region: process.env.REGION,
}

const client = TextTranslationClient(endpoint, credentials);

const checkError = (response) => {
  if (isUnexpected(response)) {
    throw response.body.error;
  }
}

const translate = async ({ text, to, from }) => {
  const res = await client.path('/translate').post({
    body: [ { text } ],
    queryParameters: {
      to,
      from
    }
  })
  checkError(res);
  console.log(res.body)
  const [{ translations }] = res.body;
  return translations[0].text;
}

const getExamples = async ({ text, to, from }) => {
  const translation = await translate({ text, to, from });
  const res = await client.path('/dictionary/examples').post({
    body: [ { text, translation } ],
    queryParameters: {
      to,
      from
    }
})
checkError(res);
return res.body;
}

module.exports = {
  getExamples,
}
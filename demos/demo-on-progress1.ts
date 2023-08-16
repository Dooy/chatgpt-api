import dotenv from 'dotenv-safe'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing the `onProgress` streaming support.
 *
 * ```
 * npx tsx demos/demo-on-progress.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    debug: true,
    apiBaseUrl: process.env.OPENAI_API_BASE_URL + '/v1',
    //maxModelTokens:1000
    maxResponseTokens: 1200
  })

  const prompt = '你是chatGPT多少？'
  //'请将下面的php转化为JavaScript 理解请回答OK1个字'

  //'Write a python version of bubble sort. Do not include example usage.'

  console.log(prompt)
  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log(
        partialResponse.detail.usage.total_tokens,
        partialResponse.text
      )
    },

    systemMessage:
      'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
  })
  //console.log(res.text)
  console.log('last>> ', res)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

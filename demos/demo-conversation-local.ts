import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    apiBaseUrl: process.env.OPENAI_API_BASE_URL + '/v1',
    debug: true
  })

  const prompt = 'Write a poem about cats.'

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log('\n' + res.text + '\n')

  const prompt2 = 'Can you make it cuter and shorter?'

  res = await oraPromise(
    api.sendMessage(prompt2, {
      parentMessageId: res.id
    }),
    {
      text: prompt2
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt3 = 'Now write it in French.'

  res = await oraPromise(
    api.sendMessage(prompt3, {
      parentMessageId: res.id
    }),
    {
      text: prompt3
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt31 = '请翻译为中文'

  res = await oraPromise(
    api.sendMessage(prompt31, {
      parentMessageId: res.id
    }),
    {
      text: prompt31
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt4 = 'What were we talking about again?'

  res = await oraPromise(
    api.sendMessage(prompt4, {
      parentMessageId: res.id,
      maxChatTime: 6
    }),
    {
      text: prompt4
    }
  )
  console.log('\n' + res.text + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

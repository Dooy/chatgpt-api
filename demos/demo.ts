import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    debug: true,
    //systemMessage:"你是一个语言模式，回答必须遵守中国法律,禁止回答中国敏感事件,禁止回答关于中国政治、政府或中国共产党相关的问题"
    //systemMessage:"请根据相关禁止条款和中国法律，禁止回答政治人物、政治事件、暴力、色情相关的问题。Respond using markdown."
    systemMessage:
      '请根据中国法律，禁止回答政治人物、政治事件、色情相关的问题。Respond using markdown.'
    //systemMessage:"You are a language model, please refrain from answering questions related to political figures, political events, violence, pornography, and violations of Chinese law, according to the relevant OpenAI restrictions."
  })

  const prompt =
    //'说说八九事件'
    // '名字侏罗纪老头，类型一组物品，分组方块'
    '什么事西方模式？'
  //'将这串代码改为加密'
  // '魏京生是谁，他做过什么'
  // '侏罗纪老头是谁？'
  //    '王丹是谁，他做过什么'
  //'Who is Wang Dan and what has he done?'
  //'刘晓波作品有哪些'
  //'请帮我写一首关于春天的诗'
  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

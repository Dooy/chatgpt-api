import * as tokenizer from '../src/tokenizer'

function getTokenCount(text: string) {
  text = text.replace(/<\|endoftext\|>/g, '')
  return tokenizer.encode(text).length
}

function getTokenCount2(text: string) {
  return [getTokenCount(text), Buffer.byteLength(text)]
}
console.log(
  getTokenCount2(
    '我是一个基于OpenAI的ChatGPT模型。我的目的是帮助你解答问题、提供建议和对话。如果你有其他问题，随时告诉我！'
  )
)
console.log(getTokenCount2('I am a good student'))
console.log(getTokenCount2('我是 GPT-4，一款先进的自然语言生成 AI。'))
console.log(
  getTokenCount2(
    'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.你是chatGPT多少？'
  )
)

import * as tokenizer from '../src/tokenizer'

function getTokenCount(text: string) {
  text = text.replace(/<\|endoftext\|>/g, '')
  return tokenizer.encode(text).length
}

console.log(
  getTokenCount(
    '我是一个基于OpenAI的ChatGPT模型。我的目的是帮助你解答问题、提供建议和对话。如果你有其他问题，随时告诉我！'
  )
)
console.log(getTokenCount('I am a good student'))
console.log(getTokenCount('我是 GPT-4，一款先进的自然语言生成 AI。'))

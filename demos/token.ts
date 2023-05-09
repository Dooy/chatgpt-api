import * as tokenizer from '../src/tokenizer'

function getTokenCount(text: string) {
  text = text.replace(/<\|endoftext\|>/g, '')
  return tokenizer.encode(text).length
}

console.log(getTokenCount('When should you use Python vs TypeScript?'))

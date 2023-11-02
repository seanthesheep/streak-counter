import { NextApiRequest } from 'next';

export function handler(req: NextApiRequest) {
  if (req.method === 'POST') {
    POST(req);
  } else {
    return new Response('Not Allowed', { status: 405 })
  }
}

export async function POST(req: NextApiRequest) {
  let passedValue = await new Response(req.body).json();
  const isEven = (letter: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const letterIndex = alphabet.indexOf(letter);
    return (letterIndex + 1) % 2 === 0;
  }
  const isNonAlpha = (char: string) => {
    const charCode = char.charCodeAt(0)
    return ((charCode < 65 || charCode > 90)
      && (charCode < 97 || charCode > 122))
  }
  const findStreak = (message: string) => {
    let evenScore = 0;
    let oddScore = 0;
    let streaks = [];
    for (let i = 0; i < message.length; i++) {
      if (isNonAlpha(message[i])) {
        streaks.push(evenScore, oddScore)
        evenScore = 0;
        oddScore = 0;
      }
      if (isEven(message[i])) {
        evenScore++;
        streaks.push(oddScore);
        oddScore = 0;
      } else if (!isEven(message[i])) {
        oddScore++;
        streaks.push(evenScore);
        evenScore = 0;
      }
    }
    return Math.max(...streaks).toString();
  }

  const formattedMessage = passedValue.message
    .split(' ')
    .join('')
    .toLowerCase()


  return new Response(findStreak(formattedMessage))
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 4400

app.use(express.json());
app.use(cors());

app.post('/streak', (req, res) => {
  // doing this all in here for simplicity's sake, but ideally it would be a separate handler function
  function isEven(letter) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const letterIndex = alphabet.indexOf(letter);
    return (letterIndex + 1) % 2 === 0;
  }
  function isNonAlpha(char) {
    const charCode = char.charCodeAt(0)
    return ((charCode < 65 || charCode > 90)
      && (charCode < 97 || charCode > 122))
  }
  function findStreak(message) {
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

  const formattedMessage = req.body.message
    .split(' ')
    .join('')
    .toLowerCase()

  res.send(findStreak(formattedMessage))
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

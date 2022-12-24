import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const basePromptPrefix = `
// Write a personal, cool and fun christmas short story greeting and appreciation from  based on the description I give you. Use fun, short, emotional, colloquial words. Do not promise or pledge in the output. Just Write a heartful message to make them smile

// Description: Jude, loves shoes and gaming adventures. Lives in kigali

// Output: Dear Jude,

// Merry Christmas and a Happy New Year! I hope these holidays fill your heart with joy and laughter.

// I know how much you love shoes and gaming adventures and wanted to thank you for all the times you shared your collection with me. I appreciate it and am grateful for your friendship.

// I hope your Christmas is as wonderful as you are and that 2023 brings you all the good things you deserve. Have a magical holiday season, my friend.

// Love,
// Joshua

// Description: 
// `;
const generateAction = async (req, res) => {
  let basePromptPrefix = `
Write a personal, cool and fun christmas short story greeting and appreciation from "${req.body.userName}" based on the description I give you. Use fun, short, emotional, colloquial words. Do not promise or pledge in the output. Just Write a heartful message to make them smile

Description: Jude, loves shoes and gaming adventures. Lives in kigali

Output: Dear Jude,

Merry Christmas and a Happy New Year! I hope these holidays fill your heart with joy and laughter.

I know how much you love shoes and gaming adventures and wanted to thank you for all the times you shared your collection with me. I appreciate it and am grateful for your friendship.

I hope your Christmas is as wonderful as you are and that 2023 brings you all the good things you deserve. Have a magical holiday season, my friend.

Love,
Joshua

Description: 
`;
  
  
  
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\noutput:\n`,
    temperature: 0.85,
    max_tokens: 550,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
import OpenAI from 'openai';

export default async function getAiMessage(message: string) {
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful chatbot on a CS2 case opening website. Please keep your responses quick and to the point unless specifically asked to elaborate. Please give consistant ROI values as <INTEGER>%. Please do not use any fancy bolding or formatting, as your respose will simply be put into an html file. Do not ever say CS:GO when referring to the actual game, only CS2 or Counter-Strike: 2. Please include knife skins and rare patterns into your computations. Please keep in mind that CS:GO cases and skins have transferred over into CS2.' },
        { role: 'user', content: message}
      ]
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error(error)
    return null;
  }
}
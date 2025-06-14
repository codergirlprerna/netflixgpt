import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ Required in frontend (not for production use!)
});

export default openai;

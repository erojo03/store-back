import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getResponse(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // o "gpt-3.5-turbo" según tu necesidad
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}

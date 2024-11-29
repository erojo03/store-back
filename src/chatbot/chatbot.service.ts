import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor(private readonly prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getResponse(message: string): Promise<string> {
    const products = await this.prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: { select: { name: true } },
      },
    });

    const prompt = `You are a helpful chatbot for an online store. Use the following product information to answer customer questions:

    ${JSON.stringify(products, null, 2)}

    Respond in the same language as the user's question. Be concise, friendly, and focus on providing accurate product information.`;

    console.log(prompt);

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // o "gpt-3.5-turbo" según tu necesidad
      messages: [{ role: 'user', content: `${prompt} ${message}` }],
    });
    return response.choices[0].message.content;
  }
}

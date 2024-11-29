import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async sendMessage(@Body('message') message: string): Promise<string> {
    return this.chatbotService.getResponse(message);
  }
}

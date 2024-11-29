import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
  imports: [PrismaModule],
})
export class ChatbotModule {}

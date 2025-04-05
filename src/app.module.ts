import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShikimoriModule } from './providers/shikimori/module/shikimori.module';

@Module({
  imports: [ShikimoriModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

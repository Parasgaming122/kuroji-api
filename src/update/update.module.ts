import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateService } from './update.service';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [UpdateService],
})
export class UpdateModule {}

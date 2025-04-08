import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateService } from './update.service';

@Module({
  imports: [SharedModule],
})
export class UpdateModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './blog/aritcle.controller';

@Module({
  imports: [],
  controllers: [AppController, ArticleController],
  providers: [AppService],
})
export class AppModule {}

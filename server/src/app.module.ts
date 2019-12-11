import {Module, HttpModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
        imports: [
                MongooseModule.forRoot('mongodb://mongo:27017/strengdurance'),
                HttpModule,
                ExercisesModule,
        ],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}

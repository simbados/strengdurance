import {Module, HttpModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ExercisesModule} from './exercises/exercises.module';
import {ValidationPipe} from './validation/validation.pipes';
import {APP_PIPE} from '@nestjs/core';
import {WorkoutModule} from './workout/workout.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strengdurance'),
    HttpModule,
    ExercisesModule,
    WorkoutModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

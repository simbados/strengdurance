import {Module, HttpModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ExercisesModule} from './exercises/exercises.module';
import {ValidationPipe} from './validation/validation.pipes';
import {APP_PIPE} from '@nestjs/core';
import { WorkoutService } from './workout/workout.service';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutModule } from './workout/workout.module';

@Module({
        imports: [
                MongooseModule.forRoot('mongodb://localhost/strengdurance'),
                HttpModule,
                ExercisesModule,
                WorkoutModule,
        ],
        controllers: [AppController, WorkoutController],
        providers: [
                AppService,
                {
                        provide: APP_PIPE,
                        useClass: ValidationPipe,
                },
                WorkoutService,
        ],
})
export class AppModule {}

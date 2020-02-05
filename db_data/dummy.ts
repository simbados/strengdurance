import {ExerciseSchema} from './src/exercises/schemas/exercise.schema'
import {exerciseArray} from './exercise_data'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/strengdurance', {useNewUrlParser: true});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
Exercise.deleteMany({}).then(() => console.log('Deleted all Exercises, ready for filling'));

exerciseArray.forEach(exercise => {
  const exerciseModel = new Exercise({name: exercise.name, category: exercise.category});
  const model = Exercise.find(exerciseModel).then(() => console.log('Found model'));
  console.log('model is', model);

  /* exerciseModel.save().then(() => console.log('It worked')).catch(() => console.log('Did not work')); */
})

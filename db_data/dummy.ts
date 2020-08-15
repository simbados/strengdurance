import { ExerciseSchema } from "../server/src/exercises/schemas/exercise.schema";
import exerciseDefaultData from "./exercise_data";
import * as mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/mongodb", {
  useNewUrlParser: true
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
Exercise.deleteMany({}).then(() =>
  console.log("Deleted all Exercises, ready for filling")
);

exerciseDefaultData.forEach(exercise => {
  const exerciseModel = new Exercise({
    name: exercise.name,
    category: exercise.category
  });
  /* const model = Exercise.find(exerciseModel).then(() => console.log('Found model')); */
  /* console.log('model is', model); */

  exerciseModel
    .save()
    .then(() => console.log("It worked"))
    .catch(() => console.log("Did not work"));
});

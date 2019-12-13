import {ExerciseSchema} from '../../exercises/schemas/exercise.schema';
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  await ExerciseSchema.create({name: 'Bench Press', category: 'Arms'});
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  await ExerciseSchema.deleteMany({}, (err) => { throw Error(err)});
}

module.exports = {up, down};

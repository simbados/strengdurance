const defaultExerciseState = () => {
  return {
    exercises: undefined,
    exercisesNames: undefined,
    exercisesCategories: undefined,
  };
};

const state = defaultExerciseState();

export default state;

export { defaultExerciseState };

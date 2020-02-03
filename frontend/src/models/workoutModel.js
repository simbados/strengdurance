/*eslint-disable*/
export class WorkoutModelBuilder {
  constructor() {}
  setDate(date) {
    this.date = new Date(date);
    return this;
  }
  setExercises(exercises) {
    this.exercises = exercises;
    console.log('set Exercise with ', this.exercises);
    return this;
  }
  build() {
    console.log('build Exercise with ', this.exercises);
    return new WorkoutModel(this.date, this.exercises);
  }
}

export class WorkoutModel {
  constructor(date, exercises) {
    this.date = date;
    this.exercises = exercises;
  }
  getDate() {
    return this.date;
  }
  getExercises() {
    return this.exercises;
  }
  deepClone() {
    const cloneDate = this.getDate().valueOf();
    // eslint-disable-next-line
    console.log('Date on Model ', this.date.toString());
    console.log('Date on clone ', cloneDate);
    let cloneExercises = [];
    this.exercises.forEach(element => cloneExercises.push(element.deepClone()));
    return new WorkoutModelBuilder().setDate(cloneDate).setExercises(cloneExercises).build();
  }
  // Returns the overall volume of this workout
  getTotalVolume() {
    const totalVolume = this.getExercises().reduce((acc, exercise) => acc + exercise.getVolume(), 0);
    console.log('Total volume, ', totalVolume);
    return totalVolume
  }
}

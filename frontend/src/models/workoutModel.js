export class WorkoutModelBuilder {
  constructor(){};
  setDate(date) {
    this.date = date;
    return this;
  }
  setExercises(exercises) {
    this.exercises = exercises;
    /*eslint-disable*/
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
    const cloneDate = this.date;  
    let cloneExercises = [];
    this.exercises.forEach(element => cloneExercises.push(element.deepClone()));
    return new WorkoutModelBuilder().setDate(cloneDate).setExercises(cloneExercises).build();
  }
}

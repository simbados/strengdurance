export class ExerciseModelBuilder {
  constructor() {}
  setExerciseDefinition(exerciseDefinition) {
    this.exerciseDefinition = exerciseDefinition;
    return this;
  }
  setWeight(weight) {
    this.weight = weight;
    return this;
  }
  setRepetition(repetition) {
    this.repetition = repetition;
    return this;
  }
  setComment(comment) {
    this.comment = comment;
    return this;
  }
  buildEmptyExerciseModel() {
    return new ExerciseModel({ name: '', category: '' }, [], [], '');
  }
  build() {
    return new ExerciseModel(
      this.exerciseDefinition,
      this.weight,
      this.repetition,
      this.comment,
    );
  }
}

export class ExerciseModel {
  constructor(exerciseDefinition, weight, repetition, comment) {
    this.exerciseDefinition = exerciseDefinition;
    this.weight = weight;
    this.repetition = repetition;
    this.comment = comment;
  }
  getExerciseDefinition() {
    return this.exerciseDefinition;
  }
  getWeight() {
    return this.weight;
  }
  getRepetition() {
    return this.repetition;
  }
  getComment() {
    return this.comment;
  }
  deepClone() {
    return new ExerciseModelBuilder()
      .setExerciseDefinition({
        name: this.exerciseDefinition.name,
        category: this.exerciseDefinition.category,
      })
      .setRepetition(JSON.parse(JSON.stringify(this.repetition)))
      .setWeight(JSON.parse(JSON.stringify(this.weight)))
      .setComment(this.comment)
      .build();
  }
  toObject() {
    return {
      exerciseDefinition: this.exerciseDefinition,
      weight: this.weight,
      repetition: this.repetition,
      comment: this.comment,
    };
  }
}

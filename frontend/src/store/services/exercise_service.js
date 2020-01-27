import axios from 'axios';
/* eslint-disable */

export class ExerciseService {
  static getAllExercises() {
    return new Promise(resolve => {
      axios.get('http://127.0.1:3000/exercises').then(response => {
        console.log(response.data);
        resolve(response.data.map(({ __v, _id, ...rest }) => rest));
      });
    });
  }
}

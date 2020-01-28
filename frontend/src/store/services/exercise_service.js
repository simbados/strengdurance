import axios from 'axios';
/* eslint-disable */

export class ExerciseService {
  static getAllExercises() {
    return new Promise(resolve => {
      console.log('process env is, ', process.env);
      const URL=`${process.env.SERVER_URL}/exercises`;
      axios.get(URL).then(response => {
        console.log(response.data);
        resolve(response.data.map(({ __v, _id, ...rest }) => rest));
      });
    });
  }
}

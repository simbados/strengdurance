import axios from 'axios';
/* eslint-disable */

// Add error handling
export class WorkoutService {
  static getAllStrengthWorkouts() {
    return new Promise(resolve => {
      console.log('process env is, ', process.env);
      const URL=`${process.env.SERVER_URL}/workouts/strength`;
      axios.get(URL).then(response => {
        console.log(response.data);
        resolve(response.data);
      });
    });
  }
}

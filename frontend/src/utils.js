export class Utils {
  constructor() {}

  // Transform number array to string array with delimiter of '/'
  // Use for displaying of arrays
  static numberArrayToString(array) {
    let stringArray = '';
    array.forEach(element => (stringArray += `${element}/`));
    // Need to cut the last slash
    stringArray = stringArray.substring(0, stringArray.length - 1);
    return stringArray;
  }

  // Transform String to number array with a delimiter of '/'
  // Use for calculation and internal representation
  static stringToNumberArray(inputString) {
    return inputString
      .split('/')
      .filter(value => {
        if (value === '' || value.match('[^0-9]')) {
          return false;
        }
        return true;
      })
      .map(value => {
        const parse = parseInt(value, 10);
        if (isNaN(parse)) {
          return 0;
        }
        return parse;
      });
  }

  // returns volume calculated from repetition and weight array
  // 0 if either are null or arrays do not have same length
  static calculateVolume(repetition, weight) {
    let calculatedVolume = 0;
    if (
      repetition.length === weight.length &&
      repetition !== null &&
      weight !== null
    ) {
      for (let i = 0; i < repetition.length; i++) {
        calculatedVolume += repetition[i] * weight[i];
      }
    }
    return calculatedVolume;
  }

  // Adds and subtracts daysToAdd from date
  static calculateNewDate(date, daysToAdd) {
    let dateWithAddedDays = new Date(date);
    dateWithAddedDays.setDate(date.getDate() + daysToAdd);
    return dateWithAddedDays;
  }

  // Set hours, minutes, seconds, milliseconds to 0
  static setToMidnight(date) {
    date.setMinutes(0);
    date.setHours(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
}

export function checkWin(correct, wrong, word) {
  let status = 'win';

  word  && word.split('').forEach(letter => {
    if(!correct.includes(letter)){
      status = '';
    }
  });

  if(wrong.length === 6) status = 'lose';

  return status
}

export const updateObject = (actualState, updatedValues) => ({
  ...actualState,
  ...updatedValues
});

export const COUNTER_VALUE = 100;
export const WORDS = ['react', 'programming', 'closures', 'application', 'redux', 'optimization'];

export const getDate = (dateToConvert) =>  {
  const date = new Date(dateToConvert);
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
}
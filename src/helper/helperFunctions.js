export const getInputAsNumberArray = (data = '') => {
  return data.split('\n').map((line) => Number(line))
}

export const getInputAsStringArray = (data = '') => {
  return data.split('\n').map((line) => String(line))
}

export const getInputInCorrectFormat = (data = '', type = 'num') => {
  return type === 'num'
    ? getInputAsNumberArray(data)
    : getInputAsStringArray(data)
}

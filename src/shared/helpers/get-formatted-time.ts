function pad(number: number): string {
  return number < 10 ? '0' + number : '' + number;
}

function getFormattedTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secondsRemaining)}`;
  } else {
    return `${pad(minutes)}:${pad(secondsRemaining)}`;
  }
}

export { getFormattedTime };

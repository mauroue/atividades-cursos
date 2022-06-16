export default function timeToSeconds(time: string) {
  const [hours = '0', minutes = '0', seconds = '0'] = time.split(':');
  const hoursInSeconds = Number(hours) * 60 * 60;
  const minutesInSeconds = Number(minutes) * 60;
  return hoursInSeconds + minutesInSeconds + Number(seconds);
}

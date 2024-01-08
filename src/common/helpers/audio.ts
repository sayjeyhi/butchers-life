export const collectAudio = new Audio('/audios/interface-124464.mp3');
export const hitObstacleAudio = new Audio('/audios/grunt2-85989.mp3');

type Options = {
  currentTime: number;
};
export const playAudio = (instance: HTMLAudioElement, { currentTime = 0 }: Options) => {
  instance.currentTime = currentTime;
  instance.play();
};

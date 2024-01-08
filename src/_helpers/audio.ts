export const collectAudio = new Audio('/audios/interface-124464.mp3');
export const hitObstacleAudio = new Audio('/audios/grunt2-85989.mp3');

export const playAudio = (instance: HTMLAudioElement) => {
  instance.play();
};

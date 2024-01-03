import {Button} from "../Button.jsx";
import {useGame} from "../../hooks/useGame.jsx";


export const SettingModal = () => {
  const { dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: "start" });
  }
  const handleResume = () => {
    dispatch({ type: "resume" });
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[300px] h-[340px] p-5 flex gap-3 flex-col">
        <Button
          className="w-full p-2"
          onClick={handleResume}
        >
          <img src="/images/play-button.png" alt="Timer icon" className="w-24 absolute -left-2 -top-2" />
          Resume
        </Button>
        <Button
          className="w-full p-2"
          onClick={handleRestart}
        >
          <img src="/images/skip-button.png" alt="Timer icon" className="w-24 absolute -left-2 -top-2" />
          Restart
        </Button>
        <Button
          className="w-full p-2"
          onClick={() => dispatch({ type: "restart" })}
        >
          <img src="/images/door.png" alt="Timer icon" className="w-24 absolute -left-2 -top-2" />

          Exit
        </Button>
      </div>
    </div>
  );
};

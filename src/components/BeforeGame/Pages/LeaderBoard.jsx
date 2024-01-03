import { useGame } from "../../../hooks/useGame";

export const LeaderBoard = () => {
  const { dispatch } = useGame();

  return (
    <>
      <h1 className="text-2xl font-bold">LeaderBoard</h1>
    </>
  );
};

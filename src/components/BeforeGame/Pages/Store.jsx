import { useGame } from "../../../hooks/useGame";

export const Store = () => {
  const { dispatch } = useGame();

  return (
    <>
      <h1 className="text-2xl font-bold">Store</h1>
    </>
  );
};

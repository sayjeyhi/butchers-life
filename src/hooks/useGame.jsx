import { createContext, useContext, useEffect, useReducer } from "react";

const GAME_TIME = 60;
const NB_ENEMIES = 3;

const GameContext = createContext();

function gameReducer(state, action) {
  if (action.type === "start") {
    return {
      ...state,
      timer: GAME_TIME,
      status: "playing",
      playerPosition: 'center',
      playerAnimation: 'Running',
    };
  }
  if (action.type === "restart") {
    return {
      ...state,
      status: "start",
      timer: 0,
      leaderboard: [],
      playerPosition: 'center',
      playerAnimation: 'Running',
    };
  }
  if (action.type === "pause") {
    return {
      ...state,
      status: 'paused',
    };
  }
  if (action.type === "resume") {
    return {
      ...state,
      status: "playing",
    };
  }
  if (action.type === "jump") {
    return {
      ...state,
      playerAnimation: "Jump",
    };
  }
  if (action.type === "sit") {
    return {
      ...state,
      playerAnimation: "Sit",
    };
  }
  if (action.type === "move-left") {
    if (state.playerPosition === 'right') {
      return {
        ...state,
        playerPosition: 'center',
      };
    }
    return {
      ...state,
      playerPosition: "left",
    };
  }
  if (action.type === "move-right") {
    if (state.playerPosition === 'left') {
      return {
        ...state,
        playerPosition: 'center',
      };
    }
    return {
      ...state,
      playerPosition: "right",
    };
  }

  if (action.type === "hideBomb") {
    return {
      ...state,
      showBomb: false,
    };
  }

  if (state.status !== "playing") {
    return state;
  }

  if (action.type === "updateLoop") {
    if (state.status === 'paused') return state;

    const timer = state.timer - 1;
    if (timer <= 0) {
      return {
        ...state,
        status: "gameover",
      };
    }
    return {
      ...state,
      timer,
    };
  }

  return state;
}

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    status: "start", // start, playing, game over, paused
    timer: 0,
    enemies: [
      ...Array(NB_ENEMIES)
        .fill(null),
    ],
    coins: [
      ...Array(10)
        .fill(null),
    ],
    meats: [
      ...Array(10)
        .fill(null),
    ],
    showBomb: false,
    leaderboard: [],
    playerPosition: 'center',
    playerAnimation: 'Running',
  });


  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: "updateLoop" });
    }, 1000);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: "respawn" });
    }, 100);
    return () => clearInterval(gameLoop);
  }, []);


  const { enemies, status, timer, leaderboard, showBomb, coins, meats } = gameState;

  useEffect(() => {
    if (!showBomb) return;
    const timeout = setTimeout(() => {
      dispatch({ type: "hideBomb" });
    }, 900);
    return () => clearTimeout(timeout);
  }, [showBomb]);

  return (
    <GameContext.Provider
      value={{
        dispatch,
        coins,meats,
        enemies,
        status,
        timer,
        leaderboard,
        showBomb,
        playerPosition: gameState.playerPosition,
        playerAnimation: gameState.playerAnimation,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

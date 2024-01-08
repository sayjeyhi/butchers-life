import { atomWithStorage } from 'jotai/utils';

export const playerNameAtom = atomWithStorage('playerName', false);
export const isMusicEnabledAtom = atomWithStorage('isMusicEnabled', true);
export const isSoundEnabledAtom = atomWithStorage('isSoundEnabled', true);
export const currentMapAtom = atomWithStorage('currentMap', true);
export const currentCharacterAtom = atomWithStorage('currentCharacter', true);

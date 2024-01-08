export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export interface GameObject {
  id: UUID;
  position: [number, number, number];
  isCollected: boolean;
}

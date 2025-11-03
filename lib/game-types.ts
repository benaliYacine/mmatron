// Training stat types
export type TrainingStat =
  | "striking"
  | "grappling"
  | "cardio"
  | "footwork"
  | "mindset"
  | "sleep";

// All training stats array
export const TRAINING_STATS: TrainingStat[] = [
  "striking",
  "grappling",
  "cardio",
  "footwork",
  "mindset",
  "sleep",
];

// Stat display info
export const STAT_INFO: Record<
  TrainingStat,
  { emoji: string; label: string }
> = {
  striking: { emoji: "🥊", label: "Striking" },
  grappling: { emoji: "🤼", label: "Grappling" },
  cardio: { emoji: "❤️", label: "Cardio" },
  footwork: { emoji: "👣", label: "Footwork" },
  mindset: { emoji: "🧠", label: "Mindset" },
  sleep: { emoji: "😴", label: "Sleep" },
};

// Slider state (0-10 for each stat)
export type SliderState = Record<TrainingStat, number>;

// Athlete definition
export interface Athlete {
  id: string;
  name: string;
  weights: Record<TrainingStat, number>; // base weights (0-1 range)
  bias_range: [number, number]; // [min, max] for talent bias
  avatar?: string; // optional image path
  description?: string; // short description
}

// Opponent definition
export interface Opponent {
  id: number;
  name: string;
  threshold: number; // minimum score to win
  stats: Record<TrainingStat, number>; // opponent's abilities (0-1 range)
  avatar?: string; // optional image path
  description?: string; // short description
}

// Fight result
export interface FightResult {
  score: number;
  won: boolean;
  bias_used: number;
  effective_weights: Record<TrainingStat, number>;
  threshold: number;
}

// Game progress state
export interface GameState {
  selectedAthleteId: string | null;
  currentOpponentId: number | null;
  sliderState: SliderState;
  unlockedOpponents: number[]; // array of opponent IDs
  beatenOpponents: number[]; // array of opponent IDs
  lastFightResult: FightResult | null;
  currentScreen: GameScreen;
}

// Game screens
export type GameScreen =
  | "landing"
  | "how-to-play"
  | "choose-athlete"
  | "opponent-path"
  | "training-room"
  | "result"
  | "end-screen";

// Game configuration
export interface GameConfig {
  time_budget: number;
  athletes: Athlete[];
  opponents: Opponent[];
}

// Assistant advice tip
export interface AdviceTip {
  message: string;
  priority: number; // lower = higher priority
}

// Default values
export const DEFAULT_SLIDER_STATE: SliderState = {
  striking: 0,
  grappling: 0,
  cardio: 0,
  footwork: 0,
  mindset: 0,
  sleep: 0,
};

export const INITIAL_GAME_STATE: GameState = {
  selectedAthleteId: null,
  currentOpponentId: null,
  sliderState: DEFAULT_SLIDER_STATE,
  unlockedOpponents: [1], // first opponent always unlocked
  beatenOpponents: [],
  lastFightResult: null,
  currentScreen: "landing",
};


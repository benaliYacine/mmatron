// Training stat types
export type TrainingStat =
    | "conditioning"
    | "striking"
    | "wrestling"
    | "bjj"
    | "muay_thai"
    | "tactical"
    | "recovery";

// All training stats array
export const TRAINING_STATS: TrainingStat[] = [
    "conditioning",
    "striking",
    "wrestling",
    "bjj",
    "muay_thai",
    "tactical",
    "recovery",
];

// Stat display info
export const STAT_INFO: Record<TrainingStat, { emoji: string; label: string }> =
    {
        conditioning: { emoji: "💪", label: "Conditioning" },
        striking: { emoji: "🥊", label: "Striking" },
        wrestling: { emoji: "🤼", label: "Wrestling" },
        bjj: { emoji: "🥋", label: "BJJ" },
        muay_thai: { emoji: "🥊", label: "Muay Thai" },
        tactical: { emoji: "🧠", label: "Tactical" },
        recovery: { emoji: "😴", label: "Recovery" },
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
    | "championship-validation"
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

// Championship validation result for a single opponent
export interface OpponentValidationResult {
    opponent: Opponent;
    result: FightResult;
    passed: boolean;
}

// Full championship validation results
export interface ChampionshipValidation {
    results: OpponentValidationResult[];
    allPassed: boolean;
}

// Default values
export const DEFAULT_SLIDER_STATE: SliderState = {
    conditioning: 0,
    striking: 0,
    wrestling: 0,
    bjj: 0,
    muay_thai: 0,
    tactical: 0,
    recovery: 0,
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

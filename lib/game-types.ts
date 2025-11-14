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
        conditioning: { emoji: "", label: "Conditioning" },
        striking: { emoji: "", label: "Striking" },
        wrestling: { emoji: "", label: "Wrestling" },
        bjj: { emoji: "", label: "BJJ" },
        muay_thai: { emoji: "", label: "Muay Thai" },
        tactical: { emoji: "", label: "Tactical" },
        recovery: { emoji: "", label: "Recovery" },
    };

// Slider state (0-10 for each stat)
export type SliderState = Record<TrainingStat, number>;

// Athlete definition
export interface Athlete {
    id: string;
    name: string;
    weights: Record<TrainingStat, number>; // base weights (0-1 range)
    bias_range: [number, number]; // [min, max] for talent bias (for display/reference)
    fixedTalent: number; // fixed talent value for this athlete
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

// Part 2: Training Session (represents a hidden layer node)
export interface TrainingSession {
    sessionId: number; // 1, 2, or 3
    sliders: SliderState;
    mood: number; // bias for this session (fixedTalent + mood variation)
    fightResult: FightResult | null;
}

// Part 2: Best of Three Result
export interface BestOfThreeResult {
    sessions: TrainingSession[];
    wins: number; // 0, 1, 2, or 3
    won: boolean; // true if wins >= 2
    outputLayerScore: number; // sum of wins (1 for win, 0 for loss)
}

// Game part (1 or 2)
export type GamePart = 1 | 2;

// Game progress state
export interface GameState {
    selectedAthleteId: string | null;
    currentOpponentId: number | null;
    sliderState: SliderState; // Part 1 only
    unlockedOpponents: number[]; // array of opponent IDs
    beatenOpponents: number[]; // array of opponent IDs
    lastFightResult: FightResult | null; // Part 1 only
    currentScreen: GameScreen;
    fixedTalent: number | null; // fixed talent value for the selected athlete
    // Part 2 specific
    gamePart: GamePart;
    sessions: TrainingSession[]; // Part 2: 3 training sessions
    lastBestOfThreeResult: BestOfThreeResult | null; // Part 2 only
    unlockedOpponentsPart2: number[]; // Part 2 opponent progress
    beatenOpponentsPart2: number[]; // Part 2 beaten opponents
}

// Game screens
export type GameScreen =
    | "landing"
    | "how-to-play"
    | "how-to-play-part2"
    | "choose-athlete"
    | "opponent-path"
    | "training-room"
    | "training-room-part2"
    | "result"
    | "result-part2"
    | "championship-validation"
    | "championship-validation-part2"
    | "end-screen"
    | "end-screen-part2";

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

// Helper to create empty sessions for Part 2
export const createEmptySessions = (): TrainingSession[] => [
    {
        sessionId: 1,
        sliders: { ...DEFAULT_SLIDER_STATE },
        mood: 0,
        fightResult: null,
    },
    {
        sessionId: 2,
        sliders: { ...DEFAULT_SLIDER_STATE },
        mood: 0,
        fightResult: null,
    },
    {
        sessionId: 3,
        sliders: { ...DEFAULT_SLIDER_STATE },
        mood: 0,
        fightResult: null,
    },
];

export const INITIAL_GAME_STATE: GameState = {
    selectedAthleteId: null,
    currentOpponentId: null,
    sliderState: DEFAULT_SLIDER_STATE,
    unlockedOpponents: [1], // first opponent always unlocked
    beatenOpponents: [],
    lastFightResult: null,
    currentScreen: "landing",
    fixedTalent: null,
    // Part 2 specific
    gamePart: 1,
    sessions: createEmptySessions(),
    lastBestOfThreeResult: null,
    unlockedOpponentsPart2: [1],
    beatenOpponentsPart2: [],
};

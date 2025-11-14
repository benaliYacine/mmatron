import {
    Athlete,
    Opponent,
    SliderState,
    FightResult,
    TrainingStat,
    TRAINING_STATS,
    AdviceTip,
    OpponentValidationResult,
    ChampionshipValidation,
    TrainingSession,
    BestOfThreeResult,
} from "./game-types";

/**
 * Calculate effective weights based on opponent stats
 * Uses average of athlete weight and opponent stat: (athlete_w + opp_stat) / 2
 */
export function calculateEffectiveWeights(
    athleteWeights: Record<TrainingStat, number>,
    opponentStats: Record<TrainingStat, number>
): Record<TrainingStat, number> {
    const effectiveWeights: Partial<Record<TrainingStat, number>> = {};

    for (const stat of TRAINING_STATS) {
        // Recovery is personal/self-improvement, not affected by opponent
        // Other stats use: average of athlete weight and opponent stat
        let effective: number;
        if (stat === "recovery") {
            effective = athleteWeights[stat];
        } else {
            effective = (athleteWeights[stat] + opponentStats[stat]) / 2;
        }

        effectiveWeights[stat] = effective;
    }

    // Optional normalization to maintain difficulty curve
    const sum = Object.values(effectiveWeights).reduce((a, b) => a + b, 0);
    const K = 3.0; // tuning constant

    if (sum > 0) {
        for (const stat of TRAINING_STATS) {
            effectiveWeights[stat]! = (effectiveWeights[stat]! * K) / sum;
        }
    }

    return effectiveWeights as Record<TrainingStat, number>;
}

/**
 * Calculate bias (fixed athlete talent + mood variation)
 * @param fixedTalent - The fixed talent value for the athlete (set once when athlete is selected)
 * @returns The total bias (talent + mood variation)
 */
export function calculateBias(fixedTalent: number): number {
    const moodVariation = -0.15 + Math.random() * 0.3; // -0.15 to +0.15
    return fixedTalent + moodVariation;
}

/**
 * Enforce time budget on sliders
 * Returns scaled sliders if over budget
 */
export function enforceTimeBudget(
    sliders: SliderState,
    timeBudget: number
): SliderState {
    const sum = Object.values(sliders).reduce((a, b) => a + b, 0);

    if (sum <= timeBudget) {
        return sliders;
    }

    // Proportional scaling
    const scaleFactor = timeBudget / sum;
    const scaled: Partial<SliderState> = {};

    for (const stat of TRAINING_STATS) {
        scaled[stat] = Math.floor(sliders[stat] * scaleFactor);
    }

    return scaled as SliderState;
}

/**
 * Calculate fight score and determine winner
 */
export function calculateFight(
    athlete: Athlete,
    opponent: Opponent,
    sliders: SliderState,
    timeBudget: number,
    fixedTalent: number
): FightResult {
    // Enforce time budget
    const enforcedSliders = enforceTimeBudget(sliders, timeBudget);

    // Calculate effective weights
    const effectiveWeights = calculateEffectiveWeights(
        athlete.weights,
        opponent.stats
    );

    // Calculate bias (fixed talent + mood variation)
    const bias = calculateBias(fixedTalent);

    // Calculate score: sum(effective_w[i] * slider[i]) + bias
    let score = bias;
    for (const stat of TRAINING_STATS) {
        score += effectiveWeights[stat] * enforcedSliders[stat];
    }

    return {
        score,
        won: score >= opponent.threshold,
        bias_used: bias,
        effective_weights: effectiveWeights,
        threshold: opponent.threshold,
    };
}

/**
 * Generate assistant advice tips based on fight result
 */
export function generateAdvice(
    fightResult: FightResult,
    sliders: SliderState,
    opponent: Opponent
): AdviceTip[] {
    const tips: AdviceTip[] = [];
    const { score, threshold, effective_weights } = fightResult;

    // Sort stats by effective weight
    const sortedByWeight = TRAINING_STATS.map((stat) => ({
        stat,
        weight: effective_weights[stat],
        slider: sliders[stat],
    })).sort((a, b) => b.weight - a.weight);

    const highWeightStats = sortedByWeight.slice(0, 2); // top 2
    const lowWeightStats = sortedByWeight.slice(-2); // bottom 2

    // 1. Very close miss (within 10% of threshold)
    if (score >= threshold * 0.9 && score < threshold) {
        const bestGainStat = highWeightStats.find((s) => s.slider < 8);
        if (bestGainStat) {
            tips.push({
                message: `So close! Add a small boost to **${getStatLabel(
                    bestGainStat.stat
                )}**.`,
                priority: 1,
            });
        }
    }

    // 2. Under-trained on high effective weight stat
    for (const { stat, weight, slider } of highWeightStats) {
        if (weight > 0.5 && slider < 5) {
            tips.push({
                message: `We needed a bit more **${getStatLabel(
                    stat
                )}** to match them.`,
                priority: 2,
            });
        }
    }

    // 3. Over-trained on low effective weight stat
    for (const { stat, weight, slider } of lowWeightStats) {
        if (weight < 0.3 && slider > 7) {
            tips.push({
                message: `We trained **${getStatLabel(
                    stat
                )}** a lot, but it didn't help much here.`,
                priority: 3,
            });
        }
    }

    // 4. Too unbalanced (>80% on single stat)
    const totalUsed = Object.values(sliders).reduce((a, b) => a + b, 0);
    const maxStat = Math.max(...Object.values(sliders));
    if (maxStat > totalUsed * 0.8 && totalUsed > 10) {
        tips.push({
            message: "Try spreading your time a bit.",
            priority: 4,
        });
    }

    // Sort by priority and return the highest priority tip only
    return tips.sort((a, b) => a.priority - b.priority).slice(0, 1);
}

/**
 * Get display label for stat
 */
function getStatLabel(stat: TrainingStat): string {
    const labels: Record<TrainingStat, string> = {
        conditioning: "Conditioning",
        striking: "Striking",
        wrestling: "Wrestling",
        bjj: "BJJ",
        muay_thai: "Muay Thai",
        tactical: "Tactical",
        recovery: "Recovery",
    };
    return labels[stat];
}

/**
 * Get time budget status (for color coding)
 */
export function getTimeBudgetStatus(
    sliders: SliderState,
    timeBudget: number
): "normal" | "warning" | "caution" | "error" {
    const used = Object.values(sliders).reduce((a, b) => a + b, 0);
    const maxStat = Math.max(...Object.values(sliders));

    if (used > timeBudget) return "error";
    if (maxStat > timeBudget * 0.8) return "caution";
    if (used > timeBudget * 0.95) return "caution";
    if (used > timeBudget * 0.8) return "warning";
    return "normal";
}

/**
 * Get mood message based on bias
 */
export function getMoodMessage(bias: number, athleteName: string): string {
    if (bias > 0.15) return `${athleteName} feels sharp today!`;
    if (bias < -0.1) return `${athleteName} seems a bit tired today.`;
    return `${athleteName} is ready to fight!`;
}

/**
 * Calculate fight score with deterministic bias (for validation)
 * Uses fixed talent without mood variation for consistent validation results
 */
function calculateFightDeterministic(
    athlete: Athlete,
    opponent: Opponent,
    sliders: SliderState,
    timeBudget: number,
    fixedTalent: number
): FightResult {
    // Enforce time budget
    const enforcedSliders = enforceTimeBudget(sliders, timeBudget);

    // Calculate effective weights
    const effectiveWeights = calculateEffectiveWeights(
        athlete.weights,
        opponent.stats
    );

    // Use fixed talent without mood variation for deterministic validation
    const bias = fixedTalent;

    // Calculate score: sum(effective_w[i] * slider[i]) + bias
    let score = bias;
    for (const stat of TRAINING_STATS) {
        score += effectiveWeights[stat] * enforcedSliders[stat];
    }

    return {
        score,
        won: score >= opponent.threshold,
        bias_used: bias,
        effective_weights: effectiveWeights,
        threshold: opponent.threshold,
    };
}

/**
 * Validate championship weights against all opponents
 * Tests if the current slider configuration (weights) can beat all opponents
 * Uses fixed talent without mood variation for consistent validation
 */
export function validateChampionshipWeights(
    athlete: Athlete,
    opponents: Opponent[],
    sliders: SliderState,
    timeBudget: number,
    fixedTalent: number
): ChampionshipValidation {
    const results: OpponentValidationResult[] = opponents.map((opponent) => {
        const result = calculateFightDeterministic(
            athlete,
            opponent,
            sliders,
            timeBudget,
            fixedTalent
        );
        return {
            opponent,
            result,
            passed: result.won,
        };
    });

    const allPassed = results.every((r) => r.passed);

    return {
        results,
        allPassed,
    };
}

/**
 * Part 2: Generate mood variation for a training session
 * Each session has its own independent mood
 */
export function generateMoodForSession(fixedTalent: number): number {
    const moodVariation = -0.15 + Math.random() * 0.3; // -0.15 to +0.15
    return fixedTalent + moodVariation;
}

/**
 * Part 2: Calculate Best of Three fights
 * Runs 3 independent fights (one per training session) and determines winner
 * based on output layer logic: wins >= 2
 */
export function calculateBestOfThree(
    athlete: Athlete,
    opponent: Opponent,
    sessions: TrainingSession[],
    timeBudget: number,
    fixedTalent: number
): BestOfThreeResult {
    if (sessions.length !== 3) {
        throw new Error("Must have exactly 3 training sessions for Best of Three");
    }

    // Run each fight with its session's sliders and mood
    const updatedSessions: TrainingSession[] = sessions.map((session) => {
        const effectiveWeights = calculateEffectiveWeights(
            athlete.weights,
            opponent.stats
        );

        // Enforce time budget for this session
        const enforcedSliders = enforceTimeBudget(session.sliders, timeBudget);

        // Use the session's pre-generated mood
        const bias = session.mood;

        // Calculate score
        let score = bias;
        for (const stat of TRAINING_STATS) {
            score += effectiveWeights[stat] * enforcedSliders[stat];
        }

        const fightResult: FightResult = {
            score,
            won: score >= opponent.threshold,
            bias_used: bias,
            effective_weights: effectiveWeights,
            threshold: opponent.threshold,
        };

        return {
            ...session,
            fightResult,
        };
    });

    // Count wins
    const wins = updatedSessions.filter((s) => s.fightResult?.won).length;

    // Output layer: sum of wins (1 for win, 0 for loss)
    // Weights are all 1, bias is -2, so we need sum >= 2 (i.e., 2+ wins)
    const outputLayerScore = wins; // sum of 1s and 0s

    return {
        sessions: updatedSessions,
        wins,
        won: outputLayerScore >= 2, // Output layer logic: score >= 2 means win
        outputLayerScore,
    };
}

/**
 * Part 2: Validate championship weights against all opponents using Best of Three
 * Tests if the current session configurations can beat all opponents
 * Uses deterministic moods (fixed talent only) for consistent validation
 */
export function validateChampionshipWeightsPart2(
    athlete: Athlete,
    opponents: Opponent[],
    sessions: TrainingSession[],
    timeBudget: number,
    fixedTalent: number
): ChampionshipValidation {
    // Create deterministic sessions (use fixed talent as mood, no variation)
    const deterministicSessions: TrainingSession[] = sessions.map((session) => ({
        ...session,
        mood: fixedTalent, // No mood variation for deterministic validation
    }));

    const results: OpponentValidationResult[] = opponents.map((opponent) => {
        const bestOfThree = calculateBestOfThree(
            athlete,
            opponent,
            deterministicSessions,
            timeBudget,
            fixedTalent
        );

        // For validation purposes, we consider the average score across all 3 fights
        const avgScore =
            bestOfThree.sessions.reduce(
                (sum, s) => sum + (s.fightResult?.score || 0),
                0
            ) / 3;

        const validationResult: FightResult = {
            score: avgScore,
            won: bestOfThree.won,
            bias_used: fixedTalent,
            effective_weights:
                bestOfThree.sessions[0].fightResult?.effective_weights ||
                ({} as Record<TrainingStat, number>),
            threshold: opponent.threshold,
        };

        return {
            opponent,
            result: validationResult,
            passed: bestOfThree.won,
        };
    });

    const allPassed = results.every((r) => r.passed);

    return {
        results,
        allPassed,
    };
}

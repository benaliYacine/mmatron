import {
    Athlete,
    Opponent,
    SliderState,
    FightResult,
    TrainingStat,
    TRAINING_STATS,
    AdviceTip,
} from "./game-types";

/**
 * Calculate effective weights based on opponent stats
 * High opponent stat → need to counter → effective weight stays high
 * Low opponent stat → can exploit → effective weight lower
 */
export function calculateEffectiveWeights(
    athleteWeights: Record<TrainingStat, number>,
    opponentStats: Record<TrainingStat, number>
): Record<TrainingStat, number> {
    const effectiveWeights: Partial<Record<TrainingStat, number>> = {};

    for (const stat of TRAINING_STATS) {
        // Recovery is personal/self-improvement, not affected by opponent
        // Other stats use: athlete weight - opponent stat (need to counter opponent)
        let effective: number;
        if (stat === "recovery") {
            effective = athleteWeights[stat];
        } else {
            effective = athleteWeights[stat] - opponentStats[stat];
            // Ensure non-negative
            if (effective < 0) effective = 0;
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
 * Calculate bias (athlete talent + mood variation)
 */
export function calculateBias(athlete: Athlete): number {
    const [minBias, maxBias] = athlete.bias_range;
    const athleteBaseBias = minBias + Math.random() * (maxBias - minBias);
    const moodVariation = -0.15 + Math.random() * 0.3; // -0.15 to +0.15
    return athleteBaseBias + moodVariation;
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
    timeBudget: number
): FightResult {
    // Enforce time budget
    const enforcedSliders = enforceTimeBudget(sliders, timeBudget);

    // Calculate effective weights
    const effectiveWeights = calculateEffectiveWeights(
        athlete.weights,
        opponent.stats
    );

    // Calculate bias
    const bias = calculateBias(athlete);

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

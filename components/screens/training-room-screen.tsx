"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import {
    Athlete,
    Opponent,
    SliderState,
    STAT_INFO,
    TRAINING_STATS,
    TrainingStat,
    DEFAULT_SLIDER_STATE,
} from "@/lib/game-types";
import {
    getTimeBudgetStatus,
    calculateBias,
    getMoodMessage,
} from "@/lib/game-logic";
import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw, Sparkles, CloudOff } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrainingRoomScreenProps {
    athlete: Athlete;
    opponent: Opponent;
    sliders: SliderState;
    timeBudget: number;
    onUpdateSliders: (sliders: SliderState) => void;
    onFight: () => void;
    onReset: () => void;
    onBackToPath: () => void;
    onNextOpponent?: () => void;
    hasNextOpponent?: boolean;
}

export function TrainingRoomScreen({
    athlete,
    opponent,
    sliders,
    timeBudget,
    onUpdateSliders,
    onFight,
    onReset,
    onBackToPath,
    onNextOpponent,
    hasNextOpponent,
}: TrainingRoomScreenProps) {
    const budgetStatus = getTimeBudgetStatus(sliders, timeBudget);
    const usedBudget = Object.values(sliders).reduce((a, b) => a + b, 0);

    // Calculate current mood/bias for display
    const [currentBias, setCurrentBias] = useState<number>(0);
    const [baseTalent, setBaseTalent] = useState<number>(0);
    const [moodVariation, setMoodVariation] = useState<number>(0);
    const [moodMessage, setMoodMessage] = useState<string>("");

    // Update mood when component mounts, athlete changes, or opponent changes
    useEffect(() => {
        // Calculate base talent and mood variation separately
        const [minBias, maxBias] = athlete.bias_range;
        const talent = minBias + Math.random() * (maxBias - minBias);
        const mood = -0.15 + Math.random() * 0.3; // -0.15 to +0.15
        const totalBias = talent + mood;

        setBaseTalent(talent);
        setMoodVariation(mood);
        setCurrentBias(totalBias);
        setMoodMessage(getMoodMessage(totalBias, athlete.name));
    }, [athlete, opponent]);

    // Get mood icon and color based on bias
    const getMoodIndicator = () => {
        if (currentBias > 0.15) {
            return {
                icon: Sparkles,
                color: "text-primary",
                bgColor: "bg-primary/10",
            };
        } else if (currentBias < -0.1) {
            return {
                icon: CloudOff,
                color: "text-muted-foreground",
                bgColor: "bg-muted",
            };
        }
        return {
            icon: null,
            color: "text-foreground",
            bgColor: "bg-secondary",
        };
    };

    const moodIndicator = getMoodIndicator();

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Top Strip - Athlete and Opponent Info */}
                <div className="flex items-end justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onBackToPath}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Path
                    </Button>

                    <div className="flex gap-8">
                        {/* Athlete Badge */}
                        <Card className=" p-4 flex items-center gap-4">
                            {athlete.avatar && (
                                <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-white">
                                    <Image
                                        src={athlete.avatar}
                                        alt={athlete.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Your Athlete
                                </p>
                                <p className="text-lg font-bold text-foreground">
                                    {athlete.name}
                                </p>
                            </div>
                        </Card>

                        {/* VS */}
                        <div className="flex items-center">
                            <span className="text-7xl font-bold text-pop-art-red">
                                VS
                            </span>
                        </div>

                        {/* Opponent Badge */}
                        <Card className=" p-4 flex items-center gap-4">
                            {opponent.avatar && (
                                <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-white">
                                    <Image
                                        src={opponent.avatar}
                                        alt={opponent.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Opponent
                                </p>
                                <p className="text-lg font-bold text-foreground">
                                    {opponent.name}
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="w-24" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Training Sliders */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-foreground">
                                Training Setup
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onReset}
                                className="gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reset
                            </Button>
                        </div>

                        {/* Training Sliders */}
                        <div className="space-y-4">
                            {TRAINING_STATS.map((stat) => (
                                <TrainingSlider
                                    key={stat}
                                    stat={stat}
                                    value={sliders[stat]}
                                    onChange={(value) =>
                                        onUpdateSliders({
                                            ...sliders,
                                            [stat]: value,
                                        })
                                    }
                                />
                            ))}
                        </div>

                        {/* Time Budget Bar */}
                        <div className="space-y-2 pt-4 border-t">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-foreground">
                                    Time Budget
                                </span>
                                <span
                                    className={`text-sm font-bold ${
                                        budgetStatus === "error"
                                            ? "text-destructive"
                                            : budgetStatus === "caution"
                                            ? "text-chart-4"
                                            : budgetStatus === "warning"
                                            ? "text-chart-3"
                                            : "text-primary"
                                    }`}
                                >
                                    {usedBudget} / {timeBudget}
                                </span>
                            </div>
                            <Progress
                                value={(usedBudget / timeBudget) * 100}
                                className={`h-3 ${
                                    budgetStatus === "error"
                                        ? "[&>div]:bg-destructive"
                                        : budgetStatus === "caution"
                                        ? "[&>div]:bg-chart-4"
                                        : budgetStatus === "warning"
                                        ? "[&>div]:bg-chart-3"
                                        : "[&>div]:bg-primary"
                                }`}
                            />
                            {budgetStatus === "error" && (
                                <p className="text-xs text-destructive">
                                    Over budget! Training will be scaled down.
                                </p>
                            )}
                            {budgetStatus === "caution" && (
                                <p className="text-xs text-chart-4">
                                    Too focused on one area. Try spreading your
                                    time!
                                </p>
                            )}
                        </div>

                        {/* Athlete Mood/Bias Indicator */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="space-y-2 pt-4 border-t cursor-help">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-foreground">
                                                Athlete Mood
                                            </span>
                                            <span
                                                className={`text-sm font-bold ${
                                                    currentBias > 0.15
                                                        ? "text-primary"
                                                        : currentBias < -0.1
                                                        ? "text-destructive"
                                                        : "text-chart-3"
                                                }`}
                                            >
                                                {currentBias.toFixed(2)}
                                            </span>
                                        </div>
                                        <Progress
                                            value={
                                                ((currentBias + 0.3) / 0.6) *
                                                100
                                            }
                                            className={`h-3 ${
                                                currentBias > 0.15
                                                    ? "[&>div]:bg-primary"
                                                    : currentBias < -0.1
                                                    ? "[&>div]:bg-destructive"
                                                    : "[&>div]:bg-chart-3"
                                            }`}
                                        />
                                        <div className="flex items-center gap-2">
                                            {moodIndicator.icon && (
                                                <moodIndicator.icon
                                                    className={`h-3 w-3 ${moodIndicator.color}`}
                                                />
                                            )}
                                            <p
                                                className={`text-xs ${moodIndicator.color}`}
                                            >
                                                {moodMessage}
                                            </p>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <div className="space-y-2">
                                        <p className="font-semibold text-sm">
                                            How Mood Works:
                                        </p>
                                        <div className="text-xs space-y-1">
                                            <p>
                                                <strong>
                                                    Base Talent Range:
                                                </strong>{" "}
                                                {athlete.bias_range[0]} to{" "}
                                                {athlete.bias_range[1]}
                                            </p>
                                            <p>
                                                <strong>
                                                    Daily Mood Range:
                                                </strong>{" "}
                                                -0.15 to +0.15
                                            </p>
                                            <p className="pt-1 text-muted-foreground">
                                                Final = Base Talent + Daily Mood
                                            </p>
                                        </div>
                                        <div className="text-xs space-y-1 pt-2 border-t bg-muted/50 p-2 rounded">
                                            <p className="font-semibold">
                                                Current Values:
                                            </p>
                                            <p>
                                                <strong>
                                                    {athlete.name}&apos;s Talent
                                                    Today:
                                                </strong>{" "}
                                                {baseTalent.toFixed(3)}
                                            </p>
                                            <p>
                                                <strong>Mood Variation:</strong>{" "}
                                                {moodVariation >= 0 ? "+" : ""}
                                                {moodVariation.toFixed(3)}
                                            </p>
                                            <p className="pt-1 border-t">
                                                <strong>Final Bias:</strong>{" "}
                                                <span
                                                    className={
                                                        currentBias > 0.15
                                                            ? "text-primary font-bold"
                                                            : currentBias < -0.1
                                                            ? "text-destructive font-bold"
                                                            : "text-chart-3 font-bold"
                                                    }
                                                >
                                                    {currentBias.toFixed(3)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-xs space-y-1 pt-2 border-t">
                                            <p className="font-semibold">
                                                Mood States:
                                            </p>
                                            <p className="text-primary">
                                                🟢 Sharp (&gt; 0.15): Extra
                                                boost!
                                            </p>
                                            <p className="text-chart-3">
                                                🟡 Ready (-0.1 to 0.15): Normal
                                            </p>
                                            <p className="text-destructive">
                                                🔴 Tired (&lt; -0.1): Penalty
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground pt-2 border-t">
                                            💡 Mood changes each fight, adding
                                            variability to results!
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Card>

                    {/* Right Side - Knowledge Panels */}
                    <div className="space-y-6">
                        {/* Born Strengths Panel */}
                        <Card className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    Born Strengths
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Your athlete&apos;s natural abilities
                                </p>
                            </div>

                            <div className="space-y-3">
                                {TRAINING_STATS.map((stat) => {
                                    const weight = athlete.weights[stat];
                                    const maxWeight = Math.max(
                                        ...Object.values(athlete.weights)
                                    );
                                    const percentage =
                                        (weight / maxWeight) * 100;

                                    return (
                                        <div key={stat} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-foreground">
                                                    {STAT_INFO[stat].emoji}{" "}
                                                    {STAT_INFO[stat].label}
                                                </span>
                                            </div>
                                            <Progress
                                                value={percentage}
                                                className="h-2"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Opponent Stats Panel */}
                        <Card className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    Opponent Stats
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Their strengths (counter!) and weaknesses
                                    (exploit!)
                                </p>
                            </div>

                            <div className="space-y-3">
                                {TRAINING_STATS.map((stat) => {
                                    const opponentStat = opponent.stats[stat];
                                    const isStrength = opponentStat >= 0.7;
                                    const isWeakness = opponentStat <= 0.4;

                                    return (
                                        <div key={stat} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-foreground">
                                                    {STAT_INFO[stat].emoji}{" "}
                                                    {STAT_INFO[stat].label}
                                                </span>
                                                {isStrength && (
                                                    <Badge
                                                        variant="destructive"
                                                        className="text-xs"
                                                    >
                                                        Strong!
                                                    </Badge>
                                                )}
                                                {isWeakness && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        Weak
                                                    </Badge>
                                                )}
                                            </div>
                                            <Progress
                                                value={opponentStat * 100}
                                                className={`h-2 ${
                                                    isStrength
                                                        ? "[&>div]:bg-destructive"
                                                        : isWeakness
                                                        ? "[&>div]:bg-muted"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-center gap-4 pt-4">
                    <Button
                        size="lg"
                        onClick={onFight}
                        className="text-lg px-12 py-6"
                    >
                        Fight! 🥊
                    </Button>
                    {hasNextOpponent && onNextOpponent ? (
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={onNextOpponent}
                            className="text-lg px-8 py-6"
                        >
                            Skip to Next →
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={onBackToPath}
                            className="text-lg px-8 py-6"
                        >
                            Back to Path
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

interface TrainingSliderProps {
    stat: TrainingStat;
    value: number;
    onChange: (value: number) => void;
}

function TrainingSlider({ stat, value, onChange }: TrainingSliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                    {STAT_INFO[stat].emoji} {STAT_INFO[stat].label}
                </label>
                <Badge variant="secondary" className="text-sm">
                    {value}
                </Badge>
            </div>
            <Slider
                value={[value]}
                onValueChange={(vals) => onChange(vals[0])}
                max={10}
                step={1}
                className="cursor-pointer"
            />
        </div>
    );
}

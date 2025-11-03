"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Athlete,
    Opponent,
    SliderState,
    STAT_INFO,
    TRAINING_STATS,
    TrainingStat,
    DEFAULT_SLIDER_STATE,
} from "@/lib/game-types";
import { getTimeBudgetStatus } from "@/lib/game-logic";
import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
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

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Top Strip - Athlete and Opponent Info */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBackToPath}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Path
                    </Button>

                    <div className="flex gap-8">
                        {/* Athlete Badge */}
                        <Card className="px-6 py-3 flex items-center gap-3">
                            <Badge variant="default" className="text-lg">
                                {athlete.id === "nora_quick" ? "⚡" : "💪"}
                            </Badge>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Your Athlete
                                </p>
                                <p className="font-bold text-foreground">
                                    {athlete.name}
                                </p>
                            </div>
                        </Card>

                        {/* VS */}
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-pop-art-contrast">
                                VS
                            </span>
                        </div>

                        {/* Opponent Badge */}
                        <Card className="px-6 py-3 flex items-center gap-3">
                            <Badge variant="secondary" className="text-lg">
                                {getOpponentEmoji(opponent.id)}
                            </Badge>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Opponent
                                </p>
                                <p className="font-bold text-foreground">
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

function getOpponentEmoji(id: number): string {
    const emojis = ["💨", "🌪️", "🧱", "⚡", "🎭", "👑"];
    return emojis[id - 1] || "👤";
}

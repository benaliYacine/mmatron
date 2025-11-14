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
    TrainingSession,
} from "@/lib/game-types";
import { getTimeBudgetStatus } from "@/lib/game-logic";
import { useState } from "react";
import {
    ArrowLeft,
    RotateCcw,
    Dumbbell,
    Swords,
    Users,
    Shield,
    Target,
    Brain,
    Moon,
    CheckCircle2,
    Circle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TrainingRoomPart2ScreenProps {
    athlete: Athlete;
    opponent: Opponent;
    sessions: TrainingSession[];
    timeBudget: number;
    onUpdateSessionSliders: (sessionId: number, sliders: SliderState) => void;
    onFight: () => void;
    onReset: () => void;
    onBackToPath: () => void;
    onNextOpponent?: () => void;
    hasNextOpponent?: boolean;
}

export function TrainingRoomPart2Screen({
    athlete,
    opponent,
    sessions,
    timeBudget,
    onUpdateSessionSliders,
    onFight,
    onReset,
    onBackToPath,
    onNextOpponent,
    hasNextOpponent,
}: TrainingRoomPart2ScreenProps) {
    // Track which sessions are expanded
    const [expandedSessions, setExpandedSessions] = useState<number[]>([1]);

    const toggleSession = (sessionId: number) => {
        setExpandedSessions((prev) =>
            prev.includes(sessionId)
                ? prev.filter((id) => id !== sessionId)
                : [...prev, sessionId]
        );
    };

    // Check if all sessions have been configured (have non-zero sliders)
    const allSessionsConfigured = sessions.every((session) =>
        Object.values(session.sliders).some((val) => val > 0)
    );

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
                        <Card className="p-4 flex items-center gap-4">
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
                        <Card className="p-4 flex items-center gap-4">
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
                    {/* Left Side - Training Sessions */}
                    <Card className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">
                                    Training Sessions
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Define all 3 sessions, then fight!
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onReset}
                                className="gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reset All
                            </Button>
                        </div>

                        {/* Session Accordions */}
                        <div className="space-y-4">
                            {sessions.map((session) => (
                                <SessionAccordion
                                    key={session.sessionId}
                                    session={session}
                                    timeBudget={timeBudget}
                                    isExpanded={expandedSessions.includes(
                                        session.sessionId
                                    )}
                                    onToggle={() =>
                                        toggleSession(session.sessionId)
                                    }
                                    onUpdateSliders={(sliders) =>
                                        onUpdateSessionSliders(
                                            session.sessionId,
                                            sliders
                                        )
                                    }
                                />
                            ))}
                        </div>

                        {/* Info about sessions */}
                        <Card className="p-4 bg-muted/30 border-primary">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">
                                    💡 Tip:
                                </strong>{" "}
                                Each session represents a hidden layer node.
                                They process the same inputs (athlete + opponent
                                stats) independently with their own training
                                plans!
                            </p>
                        </Card>
                    </Card>

                    {/* Right Side - Knowledge Panels */}
                    <div className="space-y-6">
                        {/* Born Strengths Panel */}
                        <Card className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    Strengths
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
                                                <span className="text-foreground flex items-center gap-2">
                                                    {getStatIcon(stat)}
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
                                                <span className="text-foreground flex items-center gap-2">
                                                    {getStatIcon(stat)}
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
                        disabled={!allSessionsConfigured}
                        className="text-lg px-12 py-6 gap-2"
                    >
                        <Swords className="h-5 w-5" />
                        Fight Best of 3!
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

                {!allSessionsConfigured && (
                    <p className="text-center text-sm text-destructive">
                        Configure all 3 sessions before fighting!
                    </p>
                )}
            </div>
        </div>
    );
}

interface SessionAccordionProps {
    session: TrainingSession;
    timeBudget: number;
    isExpanded: boolean;
    onToggle: () => void;
    onUpdateSliders: (sliders: SliderState) => void;
}

function SessionAccordion({
    session,
    timeBudget,
    isExpanded,
    onToggle,
    onUpdateSliders,
}: SessionAccordionProps) {
    const budgetStatus = getTimeBudgetStatus(session.sliders, timeBudget);
    const usedBudget = Object.values(session.sliders).reduce(
        (a, b) => a + b,
        0
    );
    const isConfigured = Object.values(session.sliders).some((val) => val > 0);

    return (
        <Card
            className={`overflow-hidden p-0 ${
                isConfigured ? "border-primary" : "border-muted"
            }`}
        >
            <Collapsible open={isExpanded} onOpenChange={onToggle}>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                            {isConfigured ? (
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                                <h4 className="font-semibold text-foreground">
                                    Session {session.sessionId}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    {isConfigured
                                        ? `${usedBudget}/${timeBudget} hours used`
                                        : "Not configured"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isConfigured && (
                                <Badge variant="secondary" className="text-xs">
                                    Configured
                                </Badge>
                            )}
                            {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="p-4  space-y-4 border-t">
                        {/* Training Sliders */}
                        <div className="space-y-4">
                            {TRAINING_STATS.map((stat) => (
                                <TrainingSlider
                                    key={stat}
                                    stat={stat}
                                    value={session.sliders[stat]}
                                    onChange={(value) =>
                                        onUpdateSliders({
                                            ...session.sliders,
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
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

interface TrainingSliderProps {
    stat: TrainingStat;
    value: number;
    onChange: (value: number) => void;
}

function getStatIcon(stat: TrainingStat) {
    const iconClass = "h-4 w-4";
    switch (stat) {
        case "conditioning":
            return <Dumbbell className={iconClass} />;
        case "striking":
            return <Swords className={iconClass} />;
        case "wrestling":
            return <Users className={iconClass} />;
        case "bjj":
            return <Shield className={iconClass} />;
        case "muay_thai":
            return <Target className={iconClass} />;
        case "tactical":
            return <Brain className={iconClass} />;
        case "recovery":
            return <Moon className={iconClass} />;
        default:
            return null;
    }
}

function TrainingSlider({ stat, value, onChange }: TrainingSliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    {getStatIcon(stat)}
                    {STAT_INFO[stat].label}
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

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Athlete,
    STAT_INFO,
    TRAINING_STATS,
    TrainingStat,
} from "@/lib/game-types";
import Image from "next/image";
import {
    Dumbbell,
    Swords,
    Users,
    Shield,
    Target,
    Brain,
    Moon,
} from "lucide-react";

interface ChooseAthleteScreenProps {
    athletes: Athlete[];
    onSelect: (athleteId: string) => void;
}

export function ChooseAthleteScreen({
    athletes,
    onSelect,
}: ChooseAthleteScreenProps) {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <div className="flex flex-col items-center gap-8 max-w-5xl w-full">
                <h2 className="text-4xl font-bold text-foreground">
                    Choose Your Athlete
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {athletes.map((athlete) => (
                        <AthleteCard
                            key={athlete.id}
                            athlete={athlete}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface AthleteCardProps {
    athlete: Athlete;
    onSelect: (athleteId: string) => void;
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

function AthleteCard({ athlete, onSelect }: AthleteCardProps) {
    // Find max weight for normalization
    const maxWeight = Math.max(...Object.values(athlete.weights));

    return (
        <Card className="p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
            {/* Character Illustration */}
            {athlete.avatar && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white">
                    <Image
                        src={athlete.avatar}
                        alt={athlete.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-foreground">
                    {athlete.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {athlete.description}
                </p>
            </div>

            <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                    Born Strengths:
                </p>
                {TRAINING_STATS.map((stat) => {
                    const weight = athlete.weights[stat];
                    const percentage = (weight / maxWeight) * 100;

                    return (
                        <div key={stat} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    {getStatIcon(stat)}
                                    {STAT_INFO[stat].label}
                                </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                        </div>
                    );
                })}
            </div>

            <Button
                size="lg"
                onClick={() => onSelect(athlete.id)}
                className="w-full mt-2"
            >
                Pick {athlete.name}
            </Button>
        </Card>
    );
}

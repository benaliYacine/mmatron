"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Opponent } from "@/lib/game-types";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OpponentPathScreenProps {
    opponents: Opponent[];
    unlockedOpponents: number[];
    beatenOpponents: number[];
    onSelectOpponent: (opponentId: number) => void;
    onEndScreen: () => void;
    onHowToPlay: () => void;
    onChangeAthlete: () => void;
    onRestart: () => void;
}

export function OpponentPathScreen({
    opponents,
    unlockedOpponents,
    beatenOpponents,
    onSelectOpponent,
    onEndScreen,
    onHowToPlay,
    onChangeAthlete,
    onRestart,
}: OpponentPathScreenProps) {
    const allBeaten = opponents.every((opp) =>
        beatenOpponents.includes(opp.id)
    );

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <div className="flex flex-col items-center gap-8 max-w-6xl w-full">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-2">
                        Opponent Path
                    </h2>
                    <p className="text-pop-art-contrast">
                        Choose your next challenge
                    </p>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap justify-center gap-3 w-full">
                    <Button variant="outline" size="sm" onClick={onHowToPlay}>
                        📖 How to Play
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onChangeAthlete}
                    >
                        🔄 Change Athlete
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                🔁 Restart Game
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Restart Game?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will reset all your progress, including
                                    unlocked opponents and victories. Are you
                                    sure you want to restart?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onRestart}>
                                    Restart
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {opponents.map((opponent) => {
                        const isUnlocked = unlockedOpponents.includes(
                            opponent.id
                        );
                        const isBeaten = beatenOpponents.includes(opponent.id);

                        return (
                            <OpponentBubble
                                key={opponent.id}
                                opponent={opponent}
                                isUnlocked={isUnlocked}
                                isBeaten={isBeaten}
                                onSelect={onSelectOpponent}
                            />
                        );
                    })}
                </div>

                {allBeaten ? (
                    <Card className="p-6 text-center border-primary">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                            🏆 All Opponents Defeated!
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            You&apos;ve mastered the fundamentals. Ready to
                            learn what happened?
                        </p>
                        <Button size="lg" onClick={onEndScreen}>
                            See What You Learned
                        </Button>
                    </Card>
                ) : (
                    <div className="p-4 border-muted">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={onEndScreen}
                            className="w-full"
                        >
                            📚 What you'll Learn
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}

interface OpponentBubbleProps {
    opponent: Opponent;
    isUnlocked: boolean;
    isBeaten: boolean;
    onSelect: (opponentId: number) => void;
}

function OpponentBubble({
    opponent,
    isUnlocked,
    isBeaten,
    onSelect,
}: OpponentBubbleProps) {
    if (!isUnlocked) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Card className="p-6 flex flex-col items-center gap-3 opacity-50 cursor-not-allowed">
                            <Lock className="h-8 w-8 text-muted-foreground" />
                            <h3 className="text-xl font-semibold text-muted-foreground">
                                ???
                            </h3>
                            <Badge variant="secondary">Locked</Badge>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Beat previous opponents to unlock</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <Card
            className="p-4 flex flex-col items-center gap-3 cursor-pointer relative hover:shadow-lg transition-shadow"
            onClick={() => onSelect(opponent.id)}
        >
            {isBeaten && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="rounded-full bg-primary p-1">
                        <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                </div>
            )}

            {/* Character Illustration */}
            {opponent.avatar && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white">
                    <Image
                        src={opponent.avatar}
                        alt={opponent.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="flex flex-col items-center gap-1 w-full">
                <h3 className="text-lg font-semibold text-foreground text-center">
                    {opponent.name}
                </h3>

                <p className="text-xs text-muted-foreground text-center line-clamp-2">
                    {opponent.description}
                </p>

                <Badge
                    variant={isBeaten ? "default" : "secondary"}
                    className="mt-1"
                >
                    {isBeaten ? "Defeated" : `Level ${opponent.id}`}
                </Badge>
            </div>

            <Button
                variant={isBeaten ? "outline" : "default"}
                size="sm"
                className="w-full"
            >
                {isBeaten ? "Rematch" : "Fight"}
            </Button>
        </Card>
    );
}

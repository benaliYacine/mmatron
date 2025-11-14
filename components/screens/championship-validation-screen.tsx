"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChampionshipValidation, Opponent, Athlete } from "@/lib/game-types";
import { Check, X, Loader2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LottieAnimation } from "@/components/ui/lottie-animation";

interface ChampionshipValidationScreenProps {
    athlete: Athlete;
    opponents: Opponent[];
    validation: ChampionshipValidation;
    onAdjustTraining: () => void;
    onContinue: () => void;
    gamePart?: 1 | 2; // Track which part we're validating
}

export function ChampionshipValidationScreen({
    athlete,
    opponents,
    validation,
    onAdjustTraining,
    onContinue,
    gamePart = 1, // Default to Part 1 for backward compatibility
}: ChampionshipValidationScreenProps) {
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [isTesting, setIsTesting] = useState(true);
    const [showResults, setShowResults] = useState(false);

    // Animate through testing each opponent
    useEffect(() => {
        if (isTesting && currentTestIndex < validation.results.length) {
            const timer = setTimeout(() => {
                if (currentTestIndex < validation.results.length - 1) {
                    setCurrentTestIndex(currentTestIndex + 1);
                } else {
                    setIsTesting(false);
                    setTimeout(() => setShowResults(true), 500);
                }
            }, 800); // Test each opponent for 800ms

            return () => clearTimeout(timer);
        }
    }, [currentTestIndex, isTesting, validation.results.length]);

    const currentResult = validation.results[currentTestIndex];

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex items-center justify-center"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <Card className="p-12 max-w-5xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3">
                        <h2 className="text-5xl font-bold text-foreground">
                            Championship Test
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground">
                        Testing if your training weights work for{" "}
                        <strong className="text-foreground">ALL</strong>{" "}
                        opponents...
                    </p>
                </div>

                {/* Testing Animation */}
                <AnimatePresence mode="wait">
                    {isTesting && currentResult && (
                        <motion.div
                            key={currentTestIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center gap-6 py-8"
                        >
                            <div className="flex items-center gap-4">
                                {athlete.avatar && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white">
                                        <Image
                                            src={athlete.avatar}
                                            alt={athlete.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <span className="text-3xl font-bold">VS</span>
                                {currentResult.opponent.avatar && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white">
                                        <Image
                                            src={currentResult.opponent.avatar}
                                            alt={currentResult.opponent.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    Testing against{" "}
                                    {currentResult.opponent.name}
                                </h3>
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    <p className="text-muted-foreground">
                                        Calculating...
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Grid */}
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Educational Message */}
                        <Card className="p-6 bg-primary/5 border-primary">
                            <p className="text-base text-foreground leading-relaxed">
                                <strong className="text-primary">
                                    The Big Idea:
                                </strong>{" "}
                                {gamePart === 1 ? (
                                    <>
                                        In perceptron training, we need weights that
                                        work for <strong>all</strong> training examples,
                                        not just one! This is called{" "}
                                        <strong>generalization</strong>. Your training
                                        weights must beat every opponent, not just the
                                        last one you faced.
                                    </>
                                ) : (
                                    <>
                                        In neural network training, we need training
                                        sessions that work for <strong>all</strong>{" "}
                                        opponents, not just one! This is called{" "}
                                        <strong>generalization</strong>. Your 3 training
                                        sessions (hidden layer nodes) must create a
                                        strategy that wins best of 3 against every
                                        opponent, not just the last one you faced.
                                    </>
                                )}
                            </p>
                        </Card>

                        {/* Opponents Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {validation.results.map((result, index) => (
                                <OpponentResultCard
                                    key={result.opponent.id}
                                    result={result}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <Card
                            className={`p-6 text-center ${
                                validation.allPassed
                                    ? "bg-primary/10 border-primary"
                                    : "bg-destructive/10 border-destructive"
                            }`}
                        >
                            {validation.allPassed ? (
                                <SuccessSummary onContinue={onContinue} gamePart={gamePart} />
                            ) : (
                                <>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <AlertTriangle className="h-8 w-8 text-destructive" />
                                        <h3 className="text-3xl font-bold text-destructive">
                                            Some Tests Failed
                                        </h3>
                                    </div>
                                    <p className="text-lg text-muted-foreground mb-4">
                                        {gamePart === 1 ? (
                                            <>
                                                Your current weights don&apos;t work for
                                                all opponents. This means they
                                                aren&apos;t generalizing well. Try
                                                adjusting your training to find weights
                                                that work for everyone!
                                            </>
                                        ) : (
                                            <>
                                                Your current training sessions don&apos;t
                                                work for all opponents. This means they
                                                aren&apos;t generalizing well. Try
                                                adjusting your sessions to find a strategy
                                                that wins best of 3 against everyone!
                                            </>
                                        )}
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-foreground">
                                            Failed opponents:
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {validation.results
                                                .filter((r) => !r.passed)
                                                .map((r) => (
                                                    <Badge
                                                        key={r.opponent.id}
                                                        variant="destructive"
                                                    >
                                                        {r.opponent.name}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                    <Button
                                        size="lg"
                                        onClick={onAdjustTraining}
                                        className="mt-4 gap-2"
                                        variant="destructive"
                                    >
                                        Adjust Training
                                    </Button>
                                </>
                            )}
                        </Card>
                    </motion.div>
                )}
            </Card>
        </div>
    );
}

interface SuccessSummaryProps {
    onContinue: () => void;
    gamePart?: 1 | 2;
}

function SuccessSummary({ onContinue, gamePart = 1 }: SuccessSummaryProps) {
    const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

    // Delay animation until after card scale animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldPlayAnimation(true);
        }, 400); // Wait for card animation (spring animation ~300ms) + buffer

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                }}
                className="mb-4"
            >
                <div className="w-32 h-32 mx-auto">
                    {shouldPlayAnimation && (
                        <LottieAnimation
                            src="https://lottie.host/6057d8f0-6745-4224-8511-65c899cba353/hTIvvxT3Xc.lottie"
                            className="w-32 h-32"
                            loop={false}
                            autoplay={true}
                        />
                    )}
                </div>
            </motion.div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-3xl font-bold text-foreground">
                    Perfect! All Tests Passed!
                </h3>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
                {gamePart === 1 ? (
                    <>
                        Your training weights work for{" "}
                        <strong className="text-foreground">all 6 opponents</strong>.
                        You&apos;ve found weights that generalize!
                    </>
                ) : (
                    <>
                        Your training sessions work for{" "}
                        <strong className="text-foreground">all 6 opponents</strong>.
                        Your neural network generalizes perfectly!
                    </>
                )}
            </p>
            <Button size="lg" onClick={onContinue} className="gap-2">
                Continue to Learn More →
            </Button>
        </>
    );
}

interface OpponentResultCardProps {
    result: {
        opponent: Opponent;
        result: {
            score: number;
            won: boolean;
            threshold: number;
        };
        passed: boolean;
    };
    index: number;
}

function OpponentResultCard({ result, index }: OpponentResultCardProps) {
    const { opponent, result: fightResult, passed } = result;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card
                className={`p-4 flex flex-col items-center gap-3 ${
                    passed
                        ? "border-primary bg-primary/5"
                        : "border-destructive bg-destructive/5"
                }`}
            >
                {opponent.avatar && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white">
                        <Image
                            src={opponent.avatar}
                            alt={opponent.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <h4 className="text-lg font-semibold text-foreground text-center">
                    {opponent.name}
                </h4>
                <div className="flex items-center gap-2">
                    {passed ? (
                        <>
                            <Check className="h-5 w-5 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                                Passed
                            </span>
                        </>
                    ) : (
                        <>
                            <X className="h-5 w-5 text-destructive" />
                            <span className="text-sm font-semibold text-destructive">
                                Failed
                            </span>
                        </>
                    )}
                </div>
                <div className="text-xs text-muted-foreground text-center space-y-1">
                    <p>
                        Score:{" "}
                        <strong
                            className={
                                passed ? "text-primary" : "text-destructive"
                            }
                        >
                            {fightResult.score.toFixed(2)}
                        </strong>
                    </p>
                    <p>
                        Needed:{" "}
                        <strong className="text-foreground">
                            {fightResult.threshold.toFixed(2)}
                        </strong>
                    </p>
                </div>
            </Card>
        </motion.div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FightResult, SliderState, Opponent } from "@/lib/game-types";
import { generateAdvice } from "@/lib/game-logic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CloudRain } from "lucide-react";
import { LottieAnimation } from "@/components/ui/lottie-animation";

interface ResultOverlayProps {
    result: FightResult;
    sliders: SliderState;
    opponent: Opponent;
    onTryAgain: () => void;
    onTweakTraining: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
    onChampionshipValidation: () => void;
    hasNextOpponent: boolean;
    allOpponentsBeaten: boolean;
}

export function ResultOverlay({
    result,
    sliders,
    opponent,
    onTryAgain,
    onTweakTraining,
    onNextOpponent,
    onBackToPath,
    onEndScreen,
    onChampionshipValidation,
    hasNextOpponent,
    allOpponentsBeaten,
}: ResultOverlayProps) {
    const [showAdvice, setShowAdvice] = useState(false);
    const [showFightAnimation, setShowFightAnimation] = useState(true);
    const advice = !result.won ? generateAdvice(result, sliders, opponent) : [];

    useEffect(() => {
        // Show fight animation for 1 second
        const fightTimer = setTimeout(() => setShowFightAnimation(false), 1000);

        if (!result.won) {
            const adviceTimer = setTimeout(() => setShowAdvice(true), 2000);
            return () => {
                clearTimeout(fightTimer);
                clearTimeout(adviceTimer);
            };
        }

        return () => clearTimeout(fightTimer);
    }, [result.won]);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <AnimatePresence mode="wait">
                {showFightAnimation ? (
                    <FightAnimation key="fight" />
                ) : result.won ? (
                    <WinOverlay
                        key="win"
                        onTryAgain={onTryAgain}
                        onNextOpponent={onNextOpponent}
                        onBackToPath={onBackToPath}
                        onEndScreen={onEndScreen}
                        onChampionshipValidation={onChampionshipValidation}
                        hasNextOpponent={hasNextOpponent}
                        allOpponentsBeaten={allOpponentsBeaten}
                    />
                ) : (
                    <LossOverlay
                        key="loss"
                        advice={advice}
                        showAdvice={showAdvice}
                        onTweakTraining={onTweakTraining}
                        onNextOpponent={onNextOpponent}
                        onBackToPath={onBackToPath}
                        hasNextOpponent={hasNextOpponent}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Fight Animation Component
function FightAnimation() {
    const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

    useEffect(() => {
        // Small delay to ensure container is at full size
        const timer = setTimeout(() => {
            setShouldPlayAnimation(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
        >
            <div className="w-64 h-64">
                {shouldPlayAnimation && (
                    <LottieAnimation
                        src="https://lottie.host/06bd0830-7c2c-4ed0-ba51-55bc0ea5ce15/yYl8cRqWlT.lottie"
                        className="w-64 h-64"
                        loop={false}
                        autoplay={true}
                    />
                )}
            </div>
        </motion.div>
    );
}

interface WinOverlayProps {
    onTryAgain: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
    onChampionshipValidation: () => void;
    hasNextOpponent: boolean;
    allOpponentsBeaten: boolean;
}

function WinOverlay({
    onTryAgain,
    onNextOpponent,
    onBackToPath,
    onEndScreen,
    onChampionshipValidation,
    hasNextOpponent,
    allOpponentsBeaten,
}: WinOverlayProps) {
    const [shouldPlayAnimations, setShouldPlayAnimations] = useState(false);

    // Use long firework for the final boss, short for others
    const fireworkSrc = allOpponentsBeaten
        ? "https://lottie.host/60e70a4f-9c77-4cdb-88da-5469aaa078cd/PL54NuzKx4.lottie" // 10s long
        : "https://lottie.host/3380a954-832b-4928-bf80-3a91b44a409b/Kvku3jdYfS.lottie"; // 1s short

    // Delay animations until after card scale animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldPlayAnimations(true);
        }, 300); // Wait for card animation (300ms) + buffer

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Fireworks - Full screen behind everything */}
            {shouldPlayAnimations && (
                <div className="absolute inset-0 pointer-events-none z-20">
                    <LottieAnimation
                        src={fireworkSrc}
                        className="w-full h-full"
                        loop={allOpponentsBeaten}
                        autoplay={true}
                    />
                </div>
            )}

            {/* Win Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="relative z-10"
            >
                <Card className="p-12 flex flex-col items-center gap-6 border-primary shadow-lg max-w-md bg-background/95">
                    {/* Win Crown Animation - Fixed size container */}
                    <div className="relative w-48 h-48">
                        {shouldPlayAnimations && (
                            <LottieAnimation
                                src="https://lottie.host/6057d8f0-6745-4224-8511-65c899cba353/hTIvvxT3Xc.lottie"
                                className="w-48 h-48"
                                loop={false}
                                autoplay={true}
                            />
                        )}
                    </div>

                    <div className="text-center space-y-2">
                        <motion.h2
                            className="text-5xl font-bold text-foreground"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            WIN!
                        </motion.h2>
                        <motion.p
                            className="text-lg text-muted-foreground"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {allOpponentsBeaten
                                ? "You defeated the final boss! 🎉"
                                : "Excellent training strategy!"}
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex flex-col gap-3 w-full"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {hasNextOpponent && (
                            <Button
                                size="lg"
                                onClick={onNextOpponent}
                                className="w-full"
                            >
                                Next Opponent →
                            </Button>
                        )}
                        {allOpponentsBeaten && (
                            <Button
                                size="lg"
                                onClick={onChampionshipValidation}
                                className="w-full"
                            >
                                🏆 Test Against All Opponents
                            </Button>
                        )}
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={onTryAgain}
                            className="w-full"
                        >
                            Replay This Fight
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onBackToPath}
                            className="w-full"
                        >
                            Back to Path
                        </Button>
                    </motion.div>
                </Card>
            </motion.div>
        </>
    );
}

interface LossOverlayProps {
    advice: Array<{ message: string; priority: number }>;
    showAdvice: boolean;
    onTweakTraining: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    hasNextOpponent: boolean;
}

function LossOverlay({
    advice,
    showAdvice,
    onTweakTraining,
    onNextOpponent,
    onBackToPath,
    hasNextOpponent,
}: LossOverlayProps) {
    const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

    // Delay animation until after card scale animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldPlayAnimation(true);
        }, 400); // Wait for card animation (300ms) + buffer

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="p-12 flex flex-col items-center gap-6 max-w-md">
                {/* Loss Animation - Fixed size container */}
                <div className="relative w-48 h-48">
                    {shouldPlayAnimation && (
                        <LottieAnimation
                            src="https://lottie.host/d4b105e8-d03f-4632-af7d-b75dc31df0cb/M6C2pjdcoE.lottie"
                            className="w-48 h-48"
                            loop={false}
                            autoplay={true}
                        />
                    )}
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-5xl font-bold text-foreground">LOSS</h2>
                    <p className="text-lg text-muted-foreground">
                        Don&apos;t worry! Let&apos;s adjust your training.
                    </p>
                </div>

                {/* Assistant Advice */}
                <AnimatePresence>
                    {showAdvice && advice.length > 0 && (
                        <motion.div
                            className="w-full space-y-3 bg-muted/50 p-4 rounded-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">
                                    💡 Coach&apos;s Advice
                                </Badge>
                            </div>
                            <motion.p
                                className="text-sm text-foreground"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                dangerouslySetInnerHTML={{
                                    __html: advice[0].message.replace(
                                        /\*\*(.*?)\*\*/g,
                                        '<strong class="text-primary font-bold" style="-webkit-text-stroke: 0.5px black; ">$1</strong>'
                                    ),
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col gap-3 w-full">
                    <Button
                        size="lg"
                        onClick={onTweakTraining}
                        className="w-full"
                    >
                        Tweak Training
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={
                            hasNextOpponent ? onNextOpponent : onBackToPath
                        }
                        className="w-full"
                    >
                        {hasNextOpponent
                            ? "Skip to Next Opponent"
                            : "Back to Path"}
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}

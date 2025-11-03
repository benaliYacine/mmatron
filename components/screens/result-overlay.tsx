"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FightResult, SliderState, Opponent } from "@/lib/game-types";
import { generateAdvice } from "@/lib/game-logic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CloudRain } from "lucide-react";

interface ResultOverlayProps {
    result: FightResult;
    sliders: SliderState;
    opponent: Opponent;
    onTryAgain: () => void;
    onTweakTraining: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
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
    hasNextOpponent,
    allOpponentsBeaten,
}: ResultOverlayProps) {
    const [showAdvice, setShowAdvice] = useState(false);
    const advice = !result.won ? generateAdvice(result, sliders, opponent) : [];

    useEffect(() => {
        if (!result.won) {
            const timer = setTimeout(() => setShowAdvice(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [result.won]);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <AnimatePresence mode="wait">
                {result.won ? (
                    <WinOverlay
                        onTryAgain={onTryAgain}
                        onNextOpponent={onNextOpponent}
                        onBackToPath={onBackToPath}
                        onEndScreen={onEndScreen}
                        hasNextOpponent={hasNextOpponent}
                        allOpponentsBeaten={allOpponentsBeaten}
                    />
                ) : (
                    <LossOverlay
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

interface WinOverlayProps {
    onTryAgain: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
    hasNextOpponent: boolean;
    allOpponentsBeaten: boolean;
}

function WinOverlay({
    onTryAgain,
    onNextOpponent,
    onBackToPath,
    onEndScreen,
    hasNextOpponent,
    allOpponentsBeaten,
}: WinOverlayProps) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
        >
            <Card className="p-12 flex flex-col items-center gap-6 border-primary shadow-lg max-w-md">
                {/* Confetti Animation */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <div className="text-8xl">🏆</div>
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Sparkles className="h-16 w-16 text-primary absolute -top-4 -right-4" />
                    </motion.div>
                </motion.div>

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
                            onClick={onEndScreen}
                            className="w-full"
                        >
                            📚 See What You Learned
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
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="p-12 flex flex-col items-center gap-6 max-w-md">
                {/* Loss Animation */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-8xl">💨</div>
                    <motion.div
                        animate={{
                            x: [-5, 5, -5],
                        }}
                        transition={{
                            duration: 0.3,
                            repeat: 2,
                        }}
                    >
                        <CloudRain className="h-12 w-12 text-muted-foreground absolute -top-2 -right-2 opacity-50" />
                    </motion.div>
                </motion.div>

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
                            {advice.map((tip, idx) => (
                                <motion.p
                                    key={idx}
                                    className="text-sm text-foreground"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    dangerouslySetInnerHTML={{
                                        __html: tip.message.replace(
                                            /\*\*(.*?)\*\*/g,
                                            '<strong class="text-primary">$1</strong>'
                                        ),
                                    }}
                                />
                            ))}
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

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BestOfThreeResult, Opponent } from "@/lib/game-types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { LottieAnimation } from "@/components/ui/lottie-animation";

interface ResultPart2OverlayProps {
    result: BestOfThreeResult;
    opponent: Opponent;
    onTweakTraining: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
    onChampionshipValidation: () => void;
    hasNextOpponent: boolean;
    allOpponentsBeaten: boolean;
}

export function ResultPart2Overlay({
    result,
    opponent,
    onTweakTraining,
    onNextOpponent,
    onBackToPath,
    onEndScreen,
    onChampionshipValidation,
    hasNextOpponent,
    allOpponentsBeaten,
}: ResultPart2OverlayProps) {
    const [showFightAnimation, setShowFightAnimation] = useState(true);

    useEffect(() => {
        const fightTimer = setTimeout(() => setShowFightAnimation(false), 1500);
        return () => clearTimeout(fightTimer);
    }, []);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <AnimatePresence mode="wait">
                {showFightAnimation ? (
                    <FightAnimation key="fight" />
                ) : result.won ? (
                    <WinOverlay
                        key="win"
                        result={result}
                        opponent={opponent}
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
                        result={result}
                        opponent={opponent}
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
    result: BestOfThreeResult;
    opponent: Opponent;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    onEndScreen: () => void;
    onChampionshipValidation: () => void;
    hasNextOpponent: boolean;
    allOpponentsBeaten: boolean;
}

function WinOverlay({
    result,
    opponent,
    onNextOpponent,
    onBackToPath,
    onEndScreen,
    onChampionshipValidation,
    hasNextOpponent,
    allOpponentsBeaten,
}: WinOverlayProps) {
    const [shouldPlayAnimations, setShouldPlayAnimations] = useState(false);

    const fireworkSrc = allOpponentsBeaten
        ? "https://lottie.host/60e70a4f-9c77-4cdb-88da-5469aaa078cd/PL54NuzKx4.lottie"
        : "https://lottie.host/3380a954-832b-4928-bf80-3a91b44a409b/Kvku3jdYfS.lottie";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldPlayAnimations(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Fireworks */}
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
                <Card className="p-8 flex flex-col items-center gap-6 border-primary shadow-lg max-w-3xl bg-background/95">
                    {/* Title */}
                    <div className="text-center space-y-2">
                        <motion.h2
                            className="text-5xl font-bold text-foreground"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            VICTORY!
                        </motion.h2>
                        <motion.p
                            className="text-lg text-muted-foreground flex items-center justify-center gap-2"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {allOpponentsBeaten ? (
                                <>
                                    You defeated the final boss!{" "}
                                    <Sparkles className="h-5 w-5" />
                                </>
                            ) : (
                                `Won ${result.wins} out of 3 fights!`
                            )}
                        </motion.p>
                    </div>

                    {/* Fight Results */}
                    <motion.div
                        className="w-full space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold text-foreground text-center">
                            Fight Results
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {result.sessions.map((session) => (
                                <FightResultCard
                                    key={session.sessionId}
                                    sessionId={session.sessionId}
                                    won={session.fightResult?.won || false}
                                    score={session.fightResult?.score || 0}
                                    threshold={opponent.threshold}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Output Layer Explanation */}
                    <motion.div
                        className="w-full p-4 bg-primary/10 rounded-lg border-2 border-primary"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h4 className="font-semibold text-foreground mb-2 text-center">
                            Neural Network Output Layer
                        </h4>
                        <p className="text-sm text-muted-foreground text-center">
                            Score = ({result.sessions[0].fightResult?.won ? "1" : "0"} × 1) + 
                            ({result.sessions[1].fightResult?.won ? "1" : "0"} × 1) + 
                            ({result.sessions[2].fightResult?.won ? "1" : "0"} × 1) - 2 
                            = {result.outputLayerScore} - 2 
                            = {result.outputLayerScore - 2} ≥ 0 → WIN!
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="flex flex-col gap-3 w-full"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
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
                                className="w-full gap-2"
                            >
                                <Trophy className="h-5 w-5" />
                                Test Against All Opponents
                            </Button>
                        )}
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
    result: BestOfThreeResult;
    opponent: Opponent;
    onTweakTraining: () => void;
    onNextOpponent: () => void;
    onBackToPath: () => void;
    hasNextOpponent: boolean;
}

function LossOverlay({
    result,
    opponent,
    onTweakTraining,
    onNextOpponent,
    onBackToPath,
    hasNextOpponent,
}: LossOverlayProps) {
    const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldPlayAnimation(true);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="p-8 flex flex-col items-center gap-6 max-w-3xl">
                {/* Loss Animation */}
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
                    <h2 className="text-5xl font-bold text-foreground">DEFEAT</h2>
                    <p className="text-lg text-muted-foreground">
                        Won {result.wins} out of 3. Need at least 2 wins!
                    </p>
                </div>

                {/* Fight Results */}
                <div className="w-full space-y-4">
                    <h3 className="text-xl font-semibold text-foreground text-center">
                        Fight Results
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {result.sessions.map((session) => (
                            <FightResultCard
                                key={session.sessionId}
                                sessionId={session.sessionId}
                                won={session.fightResult?.won || false}
                                score={session.fightResult?.score || 0}
                                threshold={opponent.threshold}
                            />
                        ))}
                    </div>
                </div>

                {/* Output Layer Explanation */}
                <div className="w-full p-4 bg-muted/50 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold text-foreground mb-2 text-center">
                        Neural Network Output Layer
                    </h4>
                    <p className="text-sm text-muted-foreground text-center">
                        Score = ({result.sessions[0].fightResult?.won ? "1" : "0"} × 1) + 
                        ({result.sessions[1].fightResult?.won ? "1" : "0"} × 1) + 
                        ({result.sessions[2].fightResult?.won ? "1" : "0"} × 1) - 2 
                        = {result.outputLayerScore} - 2 
                        = {result.outputLayerScore - 2} &lt; 0 → LOSS
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full">
                    <Button
                        size="lg"
                        onClick={onTweakTraining}
                        className="w-full"
                    >
                        Adjust Training Sessions
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

interface FightResultCardProps {
    sessionId: number;
    won: boolean;
    score: number;
    threshold: number;
}

function FightResultCard({
    sessionId,
    won,
    score,
    threshold,
}: FightResultCardProps) {
    return (
        <Card
            className={`p-4 text-center ${
                won
                    ? "bg-primary/10 border-primary"
                    : "bg-destructive/10 border-destructive"
            }`}
        >
            <div className="flex flex-col items-center gap-2">
                {won ? (
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                ) : (
                    <XCircle className="h-8 w-8 text-destructive" />
                )}
                <div>
                    <p className="text-sm font-semibold text-foreground">
                        Session {sessionId}
                    </p>
                    <p className={`text-lg font-bold ${won ? "text-primary" : "text-destructive"}`}>
                        {won ? "WIN" : "LOSS"}
                    </p>
                </div>
                <div className="text-xs text-muted-foreground">
                    <p>Score: {score.toFixed(2)}</p>
                    <p>Threshold: {threshold}</p>
                </div>
            </div>
        </Card>
    );
}


"use client";

import { GameProvider, useGame } from "@/contexts/game-context";
import { LandingScreen } from "@/components/screens/landing-screen";
import { HowToPlayScreen } from "@/components/screens/how-to-play-screen";
import { ChooseAthleteScreen } from "@/components/screens/choose-athlete-screen";
import { OpponentPathScreen } from "@/components/screens/opponent-path-screen";
import { TrainingRoomScreen } from "@/components/screens/training-room-screen";
import { ResultOverlay } from "@/components/screens/result-overlay";
import { ChampionshipValidationScreen } from "@/components/screens/championship-validation-screen";
import { EndScreen } from "@/components/screens/end-screen";
import { GAME_CONFIG } from "@/lib/game-data";
import { INITIAL_GAME_STATE } from "@/lib/game-types";
import { validateChampionshipWeights } from "@/lib/game-logic";

function GameContent() {
    const {
        gameState,
        setScreen,
        selectAthlete,
        selectOpponent,
        updateSliders,
        fight,
        resetSliders,
        getCurrentAthlete,
        getCurrentOpponent,
        isOpponentUnlocked,
        isOpponentBeaten,
        getOpponent,
        goToNextOpponent,
        startChampionshipValidation,
    } = useGame();

    // Navigation handlers
    const handleStart = () => setScreen("how-to-play");
    const handleHowToPlayContinue = () => setScreen("choose-athlete");
    const handleAthleteSelect = (athleteId: string) => {
        selectAthlete(athleteId);
        setScreen("opponent-path");
    };
    const handleOpponentSelect = (opponentId: number) => {
        selectOpponent(opponentId);
        setScreen("training-room");
    };
    const handleFight = () => {
        fight();
        // Result screen is set by fight() in context
    };
    const handleBackToPath = () => {
        resetSliders();
        setScreen("opponent-path");
    };
    const handleTryAgain = () => {
        // Close overlay, keep same sliders and opponent, fight again
        setScreen("training-room");
        // Small delay to show we're back in training room before fighting
        setTimeout(() => {
            fight();
        }, 100);
    };
    const handleTweakTraining = () => {
        // Go back to training room
        setScreen("training-room");
    };
    const handleNextOpponent = () => {
        const currentId = gameState.currentOpponentId || 1;
        const nextOpponent = getOpponent(currentId + 1);
        if (nextOpponent) {
            // Use the new goToNextOpponent which handles unlocking
            goToNextOpponent();
        } else {
            // No more opponents - show end screen or go back to path
            const allBeaten = GAME_CONFIG.opponents.every((opp) =>
                gameState.beatenOpponents.includes(opp.id)
            );
            if (allBeaten) {
                setScreen("end-screen");
            } else {
                handleBackToPath();
            }
        }
    };
    const handleEndScreen = () => {
        setScreen("end-screen");
    };

    const handleChampionshipValidation = () => {
        startChampionshipValidation();
    };

    const handleAdjustTraining = () => {
        // Go back to the last opponent (opponent 6) to adjust training
        const lastOpponentId = GAME_CONFIG.opponents.length;
        selectOpponent(lastOpponentId);
        setScreen("training-room");
    };

    const handleValidationContinue = () => {
        // After successful validation, go to end screen
        setScreen("end-screen");
    };
    const handleRestart = () => {
        // Reset everything
        window.location.reload();
    };

    const handleHowToPlay = () => {
        setScreen("how-to-play");
    };

    const handleChangeAthlete = () => {
        // Reset athlete selection but keep progress
        selectAthlete("");
        setScreen("choose-athlete");
    };

    const handleBackFromHowToPlay = () => {
        // If we have an athlete selected, go back to opponent path
        // Otherwise, go to choose athlete
        if (gameState.selectedAthleteId) {
            setScreen("opponent-path");
        } else {
            setScreen("choose-athlete");
        }
    };

    // Render current screen
    if (gameState.currentScreen === "landing") {
        return <LandingScreen onStart={handleStart} />;
    }

    if (gameState.currentScreen === "how-to-play") {
        return (
            <HowToPlayScreen
                onContinue={
                    gameState.selectedAthleteId
                        ? handleBackFromHowToPlay
                        : handleHowToPlayContinue
                }
                onBack={
                    gameState.selectedAthleteId
                        ? handleBackFromHowToPlay
                        : undefined
                }
            />
        );
    }

    if (gameState.currentScreen === "choose-athlete") {
        return (
            <ChooseAthleteScreen
                athletes={GAME_CONFIG.athletes}
                onSelect={handleAthleteSelect}
            />
        );
    }

    if (gameState.currentScreen === "opponent-path") {
        return (
            <OpponentPathScreen
                opponents={GAME_CONFIG.opponents}
                unlockedOpponents={gameState.unlockedOpponents}
                beatenOpponents={gameState.beatenOpponents}
                onSelectOpponent={handleOpponentSelect}
                onEndScreen={handleEndScreen}
                onHowToPlay={handleHowToPlay}
                onChangeAthlete={handleChangeAthlete}
                onRestart={handleRestart}
            />
        );
    }

    if (gameState.currentScreen === "training-room") {
        const athlete = getCurrentAthlete();
        const opponent = getCurrentOpponent();

        if (!athlete || !opponent) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-muted-foreground">
                        Error: Athlete or opponent not selected
                    </p>
                </div>
            );
        }

        const currentId = gameState.currentOpponentId || 1;
        const hasNextOpponent = currentId < GAME_CONFIG.opponents.length;

        return (
            <TrainingRoomScreen
                athlete={athlete}
                opponent={opponent}
                sliders={gameState.sliderState}
                timeBudget={GAME_CONFIG.time_budget}
                onUpdateSliders={updateSliders}
                onFight={handleFight}
                onReset={resetSliders}
                onBackToPath={handleBackToPath}
                onNextOpponent={handleNextOpponent}
                hasNextOpponent={hasNextOpponent}
            />
        );
    }

    if (gameState.currentScreen === "result" && gameState.lastFightResult) {
        const opponent = getCurrentOpponent();
        const currentId = gameState.currentOpponentId || 1;
        const hasNextOpponent = currentId < GAME_CONFIG.opponents.length;

        if (!opponent) {
            return null;
        }

        return (
            <>
                {/* Show training room in background */}
                {(() => {
                    const athlete = getCurrentAthlete();
                    if (!athlete) return null;

                    return (
                        <TrainingRoomScreen
                            athlete={athlete}
                            opponent={opponent}
                            sliders={gameState.sliderState}
                            timeBudget={GAME_CONFIG.time_budget}
                            onUpdateSliders={updateSliders}
                            onFight={handleFight}
                            onReset={resetSliders}
                            onBackToPath={handleBackToPath}
                            onNextOpponent={handleNextOpponent}
                            hasNextOpponent={hasNextOpponent}
                        />
                    );
                })()}

                {/* Result overlay on top */}
                <ResultOverlay
                    result={gameState.lastFightResult}
                    sliders={gameState.sliderState}
                    opponent={opponent}
                    onTryAgain={handleTryAgain}
                    onTweakTraining={handleTweakTraining}
                    onNextOpponent={handleNextOpponent}
                    onBackToPath={handleBackToPath}
                    onEndScreen={handleEndScreen}
                    onChampionshipValidation={handleChampionshipValidation}
                    hasNextOpponent={hasNextOpponent}
                    allOpponentsBeaten={
                        gameState.lastFightResult?.won &&
                        opponent.id ===
                            GAME_CONFIG.opponents[
                                GAME_CONFIG.opponents.length - 1
                            ].id
                    }
                />
            </>
        );
    }

    if (gameState.currentScreen === "championship-validation") {
        const athlete = getCurrentAthlete();
        if (!athlete) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-muted-foreground">
                        Error: Athlete not selected
                    </p>
                </div>
            );
        }

        // Calculate validation results
        const validation = validateChampionshipWeights(
            athlete,
            GAME_CONFIG.opponents,
            gameState.sliderState,
            GAME_CONFIG.time_budget
        );

        return (
            <ChampionshipValidationScreen
                athlete={athlete}
                opponents={GAME_CONFIG.opponents}
                validation={validation}
                onAdjustTraining={handleAdjustTraining}
                onContinue={handleValidationContinue}
            />
        );
    }

    if (gameState.currentScreen === "end-screen") {
        return (
            <EndScreen
                onRestart={handleRestart}
                onBackToPath={handleBackToPath}
            />
        );
    }

    return null;
}

export default function Home() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

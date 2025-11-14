"use client";

import { GameProvider, useGame } from "@/contexts/game-context";
import { LandingScreen } from "@/components/screens/landing-screen";
import { HowToPlayScreen } from "@/components/screens/how-to-play-screen";
import { HowToPlayPart2Screen } from "@/components/screens/how-to-play-part2-screen";
import { ChooseAthleteScreen } from "@/components/screens/choose-athlete-screen";
import { OpponentPathScreen } from "@/components/screens/opponent-path-screen";
import { TrainingRoomScreen } from "@/components/screens/training-room-screen";
import { TrainingRoomPart2Screen } from "@/components/screens/training-room-part2-screen";
import { ResultOverlay } from "@/components/screens/result-overlay";
import { ResultPart2Overlay } from "@/components/screens/result-part2-overlay";
import { ChampionshipValidationScreen } from "@/components/screens/championship-validation-screen";
import { EndScreen } from "@/components/screens/end-screen";
import { EndScreenPart2 } from "@/components/screens/end-screen-part2";
import { GAME_CONFIG } from "@/lib/game-data";
import { INITIAL_GAME_STATE } from "@/lib/game-types";
import { validateChampionshipWeights, validateChampionshipWeightsPart2 } from "@/lib/game-logic";

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
        // Part 2 functions
        switchToPart2,
        updateSessionSliders,
        fightBestOfThree,
        resetSessions,
        goToNextOpponentPart2,
        startChampionshipValidationPart2,
        isOpponentUnlockedPart2,
        isOpponentBeatenPart2,
    } = useGame();

    // Navigation handlers - Part 1
    const handleStart = () => setScreen("how-to-play");
    const handleStartPart2 = () => switchToPart2();
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
        // Show the appropriate How to Play screen based on current game part
        if (gameState.gamePart === 2) {
            setScreen("how-to-play-part2");
        } else {
            setScreen("how-to-play");
        }
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

    const handleContinueToPart2 = () => {
        switchToPart2();
    };

    // Navigation handlers - Part 2
    const handleHowToPlayPart2Continue = () => setScreen("choose-athlete");
    const handleAthleteSelectPart2 = (athleteId: string) => {
        selectAthlete(athleteId);
        setScreen("opponent-path");
    };
    const handleOpponentSelectPart2 = (opponentId: number) => {
        selectOpponent(opponentId);
        setScreen("training-room-part2");
    };
    const handleFightPart2 = () => {
        fightBestOfThree();
    };
    const handleBackToPathPart2 = () => {
        resetSessions();
        setScreen("opponent-path");
    };
    const handleTweakTrainingPart2 = () => {
        setScreen("training-room-part2");
    };
    const handleNextOpponentPart2 = () => {
        const currentId = gameState.currentOpponentId || 1;
        const nextOpponent = getOpponent(currentId + 1);
        if (nextOpponent) {
            goToNextOpponentPart2();
        } else {
            // No more opponents - show end screen or go back to path
            const allBeaten = GAME_CONFIG.opponents.every((opp) =>
                gameState.beatenOpponentsPart2.includes(opp.id)
            );
            if (allBeaten) {
                setScreen("end-screen-part2");
            } else {
                handleBackToPathPart2();
            }
        }
    };
    const handleEndScreenPart2 = () => {
        setScreen("end-screen-part2");
    };
    const handleChampionshipValidationPart2 = () => {
        startChampionshipValidationPart2();
    };
    const handleAdjustTrainingPart2 = () => {
        // Go back to the last opponent to adjust training
        const lastOpponentId = GAME_CONFIG.opponents.length;
        selectOpponent(lastOpponentId);
        setScreen("training-room-part2");
    };
    const handleValidationContinuePart2 = () => {
        setScreen("end-screen-part2");
    };

    // Render current screen
    if (gameState.currentScreen === "landing") {
        return <LandingScreen onStart={handleStart} onStartPart2={handleStartPart2} />;
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
        // Use the appropriate handler based on which part we're in
        const athleteHandler = gameState.gamePart === 2 ? handleAthleteSelectPart2 : handleAthleteSelect;
        
        return (
            <ChooseAthleteScreen
                athletes={GAME_CONFIG.athletes}
                onSelect={athleteHandler}
            />
        );
    }

    if (gameState.currentScreen === "opponent-path") {
        // Determine which part we're in and use the appropriate data
        const isPart2 = gameState.gamePart === 2;
        const unlockedList = isPart2 ? gameState.unlockedOpponentsPart2 : gameState.unlockedOpponents;
        const beatenList = isPart2 ? gameState.beatenOpponentsPart2 : gameState.beatenOpponents;
        const opponentHandler = isPart2 ? handleOpponentSelectPart2 : handleOpponentSelect;
        
        return (
            <OpponentPathScreen
                opponents={GAME_CONFIG.opponents}
                unlockedOpponents={unlockedList}
                beatenOpponents={beatenList}
                onSelectOpponent={opponentHandler}
                onEndScreen={handleEndScreen}
                onHowToPlay={handleHowToPlay}
                onChangeAthlete={handleChangeAthlete}
                onRestart={handleRestart}
                gamePart={gameState.gamePart}
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
                fixedTalent={gameState.fixedTalent ?? 0}
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
                            fixedTalent={gameState.fixedTalent ?? 0}
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

        if (gameState.fixedTalent === null) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-muted-foreground">
                        Error: Fixed talent not set
                    </p>
                </div>
            );
        }

        // Calculate validation results
        const validation = validateChampionshipWeights(
            athlete,
            GAME_CONFIG.opponents,
            gameState.sliderState,
            GAME_CONFIG.time_budget,
            gameState.fixedTalent
        );

        return (
            <ChampionshipValidationScreen
                athlete={athlete}
                opponents={GAME_CONFIG.opponents}
                validation={validation}
                onAdjustTraining={handleAdjustTraining}
                onContinue={handleValidationContinue}
                gamePart={1}
            />
        );
    }

    if (gameState.currentScreen === "end-screen") {
        return (
            <EndScreen
                onRestart={handleRestart}
                onBackToPath={handleBackToPath}
                onContinueToPart2={handleContinueToPart2}
            />
        );
    }

    // Part 2 Screens
    if (gameState.currentScreen === "how-to-play-part2") {
        // If they have an athlete selected, back goes to opponent path
        // Otherwise, back goes to landing
        const backHandler = gameState.selectedAthleteId 
            ? () => setScreen("opponent-path")
            : () => setScreen("landing");
        
        return (
            <HowToPlayPart2Screen
                onContinue={handleHowToPlayPart2Continue}
                onBack={backHandler}
            />
        );
    }

    if (gameState.currentScreen === "training-room-part2") {
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
            <TrainingRoomPart2Screen
                athlete={athlete}
                opponent={opponent}
                sessions={gameState.sessions}
                timeBudget={GAME_CONFIG.time_budget}
                onUpdateSessionSliders={updateSessionSliders}
                onFight={handleFightPart2}
                onReset={resetSessions}
                onBackToPath={handleBackToPathPart2}
                onNextOpponent={handleNextOpponentPart2}
                hasNextOpponent={hasNextOpponent}
            />
        );
    }

    if (gameState.currentScreen === "result-part2" && gameState.lastBestOfThreeResult) {
        const opponent = getCurrentOpponent();
        const currentId = gameState.currentOpponentId || 1;
        const hasNextOpponent = currentId < GAME_CONFIG.opponents.length;

        if (!opponent) {
            return null;
        }

        return (
            <ResultPart2Overlay
                result={gameState.lastBestOfThreeResult}
                opponent={opponent}
                onTweakTraining={handleTweakTrainingPart2}
                onNextOpponent={handleNextOpponentPart2}
                onBackToPath={handleBackToPathPart2}
                onEndScreen={handleEndScreenPart2}
                onChampionshipValidation={handleChampionshipValidationPart2}
                hasNextOpponent={hasNextOpponent}
                allOpponentsBeaten={
                    gameState.lastBestOfThreeResult?.won &&
                    opponent.id ===
                        GAME_CONFIG.opponents[
                            GAME_CONFIG.opponents.length - 1
                        ].id
                }
            />
        );
    }

    if (gameState.currentScreen === "championship-validation-part2") {
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

        if (gameState.fixedTalent === null) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-muted-foreground">
                        Error: Fixed talent not set
                    </p>
                </div>
            );
        }

        // Calculate validation results for Part 2
        const validation = validateChampionshipWeightsPart2(
            athlete,
            GAME_CONFIG.opponents,
            gameState.sessions,
            GAME_CONFIG.time_budget,
            gameState.fixedTalent
        );

        return (
            <ChampionshipValidationScreen
                athlete={athlete}
                opponents={GAME_CONFIG.opponents}
                validation={validation}
                onAdjustTraining={handleAdjustTrainingPart2}
                onContinue={handleValidationContinuePart2}
                gamePart={2}
            />
        );
    }

    if (gameState.currentScreen === "end-screen-part2") {
        return (
            <EndScreenPart2
                onRestart={handleRestart}
                onBackToPath={handleBackToPathPart2}
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

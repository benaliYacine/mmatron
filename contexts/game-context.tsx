"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
    GameState,
    INITIAL_GAME_STATE,
    SliderState,
    FightResult,
    GameScreen,
    Athlete,
    Opponent,
    DEFAULT_SLIDER_STATE,
    TrainingSession,
    createEmptySessions,
} from "@/lib/game-types";
import { GAME_CONFIG } from "@/lib/game-data";
import { calculateFight, calculateBestOfThree, generateMoodForSession } from "@/lib/game-logic";

interface GameContextType {
    gameState: GameState;
    setScreen: (screen: GameScreen) => void;
    selectAthlete: (athleteId: string) => void;
    selectOpponent: (opponentId: number) => void;
    updateSliders: (sliders: SliderState) => void;
    fight: () => void;
    resetSliders: () => void;
    unlockNextOpponent: () => void;
    goToNextOpponent: () => void;
    startChampionshipValidation: () => void;
    getAthlete: (athleteId: string) => Athlete | undefined;
    getOpponent: (opponentId: number) => Opponent | undefined;
    getCurrentAthlete: () => Athlete | undefined;
    getCurrentOpponent: () => Opponent | undefined;
    isOpponentUnlocked: (opponentId: number) => boolean;
    isOpponentBeaten: (opponentId: number) => boolean;
    // Part 2 functions
    switchToPart2: () => void;
    updateSessionSliders: (sessionId: number, sliders: SliderState) => void;
    fightBestOfThree: () => void;
    resetSessions: () => void;
    generateSessionMoods: () => void;
    goToNextOpponentPart2: () => void;
    startChampionshipValidationPart2: () => void;
    isOpponentUnlockedPart2: (opponentId: number) => boolean;
    isOpponentBeatenPart2: (opponentId: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

    const setScreen = useCallback((screen: GameScreen) => {
        setGameState((prev) => ({ ...prev, currentScreen: screen }));
    }, []);

    const getAthlete = useCallback(
        (athleteId: string) =>
            GAME_CONFIG.athletes.find((a) => a.id === athleteId),
        []
    );

    const getOpponent = useCallback(
        (opponentId: number) =>
            GAME_CONFIG.opponents.find((o) => o.id === opponentId),
        []
    );

    const selectAthlete = useCallback(
        (athleteId: string) => {
            const athlete = getAthlete(athleteId);
            if (!athlete) {
                console.error("Athlete not found:", athleteId);
                return;
            }

            setGameState((prev) => ({
                ...prev,
                selectedAthleteId: athleteId,
                fixedTalent: athlete.fixedTalent,
            }));
        },
        [getAthlete]
    );

    const selectOpponent = useCallback((opponentId: number) => {
        setGameState((prev) => ({
            ...prev,
            currentOpponentId: opponentId,
        }));
    }, []);

    const updateSliders = useCallback((sliders: SliderState) => {
        setGameState((prev) => ({
            ...prev,
            sliderState: sliders,
        }));
    }, []);

    const resetSliders = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            sliderState: INITIAL_GAME_STATE.sliderState,
        }));
    }, []);

    const getCurrentAthlete = useCallback(
        () =>
            gameState.selectedAthleteId
                ? getAthlete(gameState.selectedAthleteId)
                : undefined,
        [gameState.selectedAthleteId, getAthlete]
    );

    const getCurrentOpponent = useCallback(
        () =>
            gameState.currentOpponentId
                ? getOpponent(gameState.currentOpponentId)
                : undefined,
        [gameState.currentOpponentId, getOpponent]
    );

    const fight = useCallback(() => {
        const athlete = getCurrentAthlete();
        const opponent = getCurrentOpponent();

        if (!athlete || !opponent) {
            console.error("Cannot fight: athlete or opponent not selected");
            return;
        }

        if (gameState.fixedTalent === null) {
            console.error("Cannot fight: fixed talent not set");
            return;
        }

        const result: FightResult = calculateFight(
            athlete,
            opponent,
            gameState.sliderState,
            GAME_CONFIG.time_budget,
            gameState.fixedTalent
        );

        setGameState((prev) => ({
            ...prev,
            lastFightResult: result,
            currentScreen: "result",
            // If won, mark opponent as beaten and unlock next
            beatenOpponents: result.won
                ? [...new Set([...prev.beatenOpponents, opponent.id])]
                : prev.beatenOpponents,
            unlockedOpponents: result.won
                ? [...new Set([...prev.unlockedOpponents, opponent.id + 1])]
                : prev.unlockedOpponents,
        }));
    }, [
        getCurrentAthlete,
        getCurrentOpponent,
        gameState.sliderState,
        gameState.fixedTalent,
    ]);

    const goToNextOpponent = useCallback(() => {
        const currentId = gameState.currentOpponentId || 1;
        const nextId = currentId + 1;

        // Unlock the next opponent when navigating to it
        // Preserve slider state between fights (only reset via reset button)
        setGameState((prev) => ({
            ...prev,
            currentOpponentId: nextId,
            unlockedOpponents: [
                ...new Set([...prev.unlockedOpponents, nextId]),
            ],
            currentScreen: "training-room",
        }));
    }, [gameState.currentOpponentId]);

    const unlockNextOpponent = useCallback(() => {
        setGameState((prev) => {
            const currentId = prev.currentOpponentId || 0;
            const nextId = currentId + 1;
            return {
                ...prev,
                unlockedOpponents: [
                    ...new Set([...prev.unlockedOpponents, nextId]),
                ],
            };
        });
    }, []);

    const isOpponentUnlocked = useCallback(
        (opponentId: number) =>
            gameState.unlockedOpponents.includes(opponentId),
        [gameState.unlockedOpponents]
    );

    const isOpponentBeaten = useCallback(
        (opponentId: number) => gameState.beatenOpponents.includes(opponentId),
        [gameState.beatenOpponents]
    );

    const startChampionshipValidation = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            currentScreen: "championship-validation",
        }));
    }, []);

    // Part 2 functions
    const switchToPart2 = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            gamePart: 2,
            currentScreen: "how-to-play-part2",
            sessions: createEmptySessions(),
            lastBestOfThreeResult: null,
        }));
    }, []);

    const updateSessionSliders = useCallback((sessionId: number, sliders: SliderState) => {
        setGameState((prev) => {
            const updatedSessions = prev.sessions.map((session) =>
                session.sessionId === sessionId
                    ? { ...session, sliders }
                    : session
            );
            return {
                ...prev,
                sessions: updatedSessions,
            };
        });
    }, []);

    const generateSessionMoods = useCallback(() => {
        if (gameState.fixedTalent === null) {
            console.error("Cannot generate moods: fixed talent not set");
            return;
        }

        setGameState((prev) => {
            const updatedSessions = prev.sessions.map((session) => ({
                ...session,
                mood: generateMoodForSession(gameState.fixedTalent!),
            }));
            return {
                ...prev,
                sessions: updatedSessions,
            };
        });
    }, [gameState.fixedTalent]);

    const fightBestOfThree = useCallback(() => {
        const athlete = getCurrentAthlete();
        const opponent = getCurrentOpponent();

        if (!athlete || !opponent) {
            console.error("Cannot fight: athlete or opponent not selected");
            return;
        }

        if (gameState.fixedTalent === null) {
            console.error("Cannot fight: fixed talent not set");
            return;
        }

        // Generate moods for all sessions before fighting
        const sessionsWithMoods = gameState.sessions.map((session) => ({
            ...session,
            mood: generateMoodForSession(gameState.fixedTalent!),
        }));

        const result = calculateBestOfThree(
            athlete,
            opponent,
            sessionsWithMoods,
            GAME_CONFIG.time_budget,
            gameState.fixedTalent
        );

        setGameState((prev) => ({
            ...prev,
            lastBestOfThreeResult: result,
            sessions: result.sessions,
            currentScreen: "result-part2",
            // If won, mark opponent as beaten and unlock next
            beatenOpponentsPart2: result.won
                ? [...new Set([...prev.beatenOpponentsPart2, opponent.id])]
                : prev.beatenOpponentsPart2,
            unlockedOpponentsPart2: result.won
                ? [...new Set([...prev.unlockedOpponentsPart2, opponent.id + 1])]
                : prev.unlockedOpponentsPart2,
        }));
    }, [getCurrentAthlete, getCurrentOpponent, gameState.sessions, gameState.fixedTalent]);

    const resetSessions = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            sessions: createEmptySessions(),
        }));
    }, []);

    const goToNextOpponentPart2 = useCallback(() => {
        const currentId = gameState.currentOpponentId || 1;
        const nextId = currentId + 1;

        // Preserve session sliders but reset fight results when moving to next opponent
        const preservedSessions = gameState.sessions.map((session) => ({
            ...session,
            fightResult: null,
            mood: 0,
        }));

        setGameState((prev) => ({
            ...prev,
            currentOpponentId: nextId,
            unlockedOpponentsPart2: [
                ...new Set([...prev.unlockedOpponentsPart2, nextId]),
            ],
            sessions: preservedSessions,
            currentScreen: "training-room-part2",
        }));
    }, [gameState.currentOpponentId, gameState.sessions]);

    const startChampionshipValidationPart2 = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            currentScreen: "championship-validation-part2",
        }));
    }, []);

    const isOpponentUnlockedPart2 = useCallback(
        (opponentId: number) =>
            gameState.unlockedOpponentsPart2.includes(opponentId),
        [gameState.unlockedOpponentsPart2]
    );

    const isOpponentBeatenPart2 = useCallback(
        (opponentId: number) => gameState.beatenOpponentsPart2.includes(opponentId),
        [gameState.beatenOpponentsPart2]
    );

    const value: GameContextType = {
        gameState,
        setScreen,
        selectAthlete,
        selectOpponent,
        updateSliders,
        fight,
        resetSliders,
        unlockNextOpponent,
        goToNextOpponent,
        startChampionshipValidation,
        getAthlete,
        getOpponent,
        getCurrentAthlete,
        getCurrentOpponent,
        isOpponentUnlocked,
        isOpponentBeaten,
        // Part 2
        switchToPart2,
        updateSessionSliders,
        fightBestOfThree,
        resetSessions,
        generateSessionMoods,
        goToNextOpponentPart2,
        startChampionshipValidationPart2,
        isOpponentUnlockedPart2,
        isOpponentBeatenPart2,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
}

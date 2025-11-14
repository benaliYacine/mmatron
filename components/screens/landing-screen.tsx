"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Brain, Network } from "lucide-react";

interface LandingScreenProps {
    onStart: () => void;
    onStartPart2: () => void;
}

export function LandingScreen({ onStart, onStartPart2 }: LandingScreenProps) {
    return (
        <div
            className="fixed inset-0 flex items-end justify-center bg-cover bg-center bg-no-repeat pb-35 z-50"
            style={{
                backgroundImage: `url('/landing_page.svg')`,
            }}
        >
            <div className="flex flex-col items-center gap-4">
                <TooltipProvider>
                    <div className="flex gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    onClick={onStart}
                                    className="text-lg px-8 py-6 gap-2"
                                >
                                    <Brain className="h-5 w-5" />
                                    Start Part 1
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Brain className="h-4 w-4 text-primary" />
                                        <p className="font-semibold">
                                            Part 1: Perceptrons
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        Learn the basics of neural networks with
                                        a single perceptron. Train your fighter
                                        and understand how weights and biases
                                        work!
                                    </p>
                                    <ul className="text-xs space-y-1 list-disc list-inside">
                                        <li>Single training session</li>
                                        <li>6 opponents to defeat</li>
                                        <li>Learn perceptron fundamentals</li>
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={onStartPart2}
                                    className="text-lg px-8 py-6 gap-2"
                                >
                                    <Network className="h-5 w-5" />
                                    Start Part 2
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Network className="h-4 w-4 text-primary" />
                                        <p className="font-semibold">
                                            Part 2: Neural Networks
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        Level up to multi-layer neural networks!
                                        Use 3 training sessions and fight best
                                        of 3 against each opponent.
                                    </p>
                                    <ul className="text-xs space-y-1 list-disc list-inside">
                                        <li>
                                            3 training sessions (hidden layer)
                                        </li>
                                        <li>Best of 3 fights</li>
                                        <li>
                                            Learn neural network architecture
                                        </li>
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>

                <p className="text-sm text-muted-foreground text-center max-w-md">
                    New to neural networks? Start with Part 1!
                    <br />
                    Already know perceptrons? Jump straight to Part 2!
                </p>
            </div>
        </div>
    );
}

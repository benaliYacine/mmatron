"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Layers, Trophy, Lightbulb, Target, TrendingUp } from "lucide-react";

interface HowToPlayPart2ScreenProps {
    onContinue: () => void;
    onBack?: () => void;
}

export function HowToPlayPart2Screen({ onContinue, onBack }: HowToPlayPart2ScreenProps) {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <Card className="flex flex-col max-w-4xl p-0 px-1 relative h-[90vh]">
                {onBack && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="absolute top-4 right-4 z-10"
                    >
                        Back
                    </Button>
                )}

                <ScrollArea className="h-full">
                    <div className="flex flex-col items-center gap-8 p-12">
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-bold text-foreground">
                                Welcome to Part 2
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Level up to Neural Networks!
                            </p>
                        </div>

                        {/* What's New */}
                        <Card className="p-6 bg-primary/5 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Network className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        What&apos;s Different?
                                    </h3>
                                    <p className="text-muted-foreground">
                                        In Part 1, you trained a <strong>perceptron</strong> — 
                                        a single node that makes one decision. Now you&apos;ll train a 
                                        <strong className="text-primary"> multi-layer neural network</strong> 
                                        {" "}with hidden nodes!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Multiple Training Sessions */}
                        <Card className="p-6 w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Layers className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        3 Training Sessions, 3 Fights
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Instead of one fight, you&apos;ll prepare for{" "}
                                        <strong className="text-foreground">3 separate training sessions</strong>. 
                                        Each session is a <strong>hidden layer node</strong> in your neural network!
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline">Session 1: Set training sliders</Badge>
                                        <Badge variant="outline">Session 2: Set training sliders</Badge>
                                        <Badge variant="outline">Session 3: Set training sliders</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        After defining all 3 sessions, you&apos;ll fight with each one against 
                                        the same opponent. Each session has its own mood (bias) for variety!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Best of 3 */}
                        <Card className="p-6 bg-destructive/5 border-destructive w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-destructive/10 p-3">
                                    <Trophy className="h-6 w-6 text-destructive" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Best of 3 to Win!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        You face the <strong className="text-destructive">same opponent 3 times</strong> 
                                        {" "}(once with each training session). Win at least{" "}
                                        <strong className="text-destructive">2 out of 3 fights</strong> to advance!
                                    </p>
                                    <div className="mt-3 p-4 bg-background rounded-lg border-2 border-destructive">
                                        <p className="font-semibold text-foreground mb-1">
                                            Output Layer Logic:
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            The neural network&apos;s <strong>output layer</strong> combines 
                                            all 3 fight results. Each win = 1, each loss = 0. The output layer 
                                            sums them up with weights of 1 and bias of -2:
                                        </p>
                                        <p className="text-sm font-mono bg-muted p-2 rounded mt-2">
                                            Score = (Win₁ × 1) + (Win₂ × 1) + (Win₃ × 1) - 2
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            If Score ≥ 0, you win! This means you need at least 2 wins.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Weight Preservation */}
                        <Card className="p-6 bg-primary/5 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Build on Your Progress
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Just like Part 1, when you move to the next opponent, your training 
                                        sliders are <strong className="text-foreground">preserved</strong>. 
                                        Adjust them to counter the new opponent&apos;s strengths!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Neural Network Visualization */}
                        <Card className="p-6 w-full bg-secondary/20">
                            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                                Neural Network Structure
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-8">
                                    {/* Input Layer */}
                                    <div className="flex flex-col items-center gap-2">
                                        <Badge variant="secondary">Input Layer</Badge>
                                        <div className="text-center text-sm text-muted-foreground">
                                            Athlete Stats<br/>+ Opponent Stats
                                        </div>
                                    </div>

                                    <div className="text-3xl text-muted-foreground">→</div>

                                    {/* Hidden Layer */}
                                    <div className="flex flex-col items-center gap-2">
                                        <Badge variant="default">Hidden Layer</Badge>
                                        <div className="flex gap-2">
                                            <div className="text-center text-xs">
                                                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-1">
                                                    S1
                                                </div>
                                                <p className="text-muted-foreground">Session 1</p>
                                            </div>
                                            <div className="text-center text-xs">
                                                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-1">
                                                    S2
                                                </div>
                                                <p className="text-muted-foreground">Session 2</p>
                                            </div>
                                            <div className="text-center text-xs">
                                                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-1">
                                                    S3
                                                </div>
                                                <p className="text-muted-foreground">Session 3</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-3xl text-muted-foreground">→</div>

                                    {/* Output Layer */}
                                    <div className="flex flex-col items-center gap-2">
                                        <Badge variant="destructive">Output Layer</Badge>
                                        <div className="text-center text-sm text-muted-foreground">
                                            Best of 3<br/>Win/Loss
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Each hidden node (session) processes inputs independently, then the 
                                    output layer combines their results!
                                </p>
                            </div>
                        </Card>

                        {/* What You'll Learn */}
                        <Card className="p-6 bg-primary/10 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/20 p-3">
                                    <Lightbulb className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        What You&apos;ll Learn: Multi-Layer Networks!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        A <strong>multi-layer neural network</strong> has multiple nodes 
                                        (hidden layer) that each make independent decisions, which are then 
                                        combined by an output layer. This is how real neural networks work — 
                                        with many layers processing information in parallel!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <Layers className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    1. Define 3 Sessions
                                </h3>
                                <p className="text-muted-foreground">
                                    Set training sliders for all 3 sessions before fighting
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <Target className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    2. Fight All 3
                                </h3>
                                <p className="text-muted-foreground">
                                    Each session fights the same opponent independently
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <Trophy className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    3. Win Best of 3!
                                </h3>
                                <p className="text-muted-foreground">
                                    Get 2+ wins to advance. The output layer decides!
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {onBack && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={onBack}
                                    className="text-lg px-8 py-6"
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                size="lg"
                                onClick={onContinue}
                                className="text-lg px-8 py-6"
                            >
                                {onBack ? "Continue" : "Let's Go!"}
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
}


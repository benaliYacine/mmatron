"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface EndScreenProps {
    onRestart: () => void;
    onBackToPath: () => void;
}

export function EndScreen({ onRestart, onBackToPath }: EndScreenProps) {
    return (
        <div className="min-h-screen bg-background p-6 flex items-center justify-center">
            <Card className="p-12 max-w-4xl space-y-8">
                <div className="text-center space-y-3">
                    <h2 className="text-5xl font-bold text-foreground">
                        What You Learned
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        You just experienced how a perceptron works!
                    </p>
                </div>

                {/* Perceptron Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                    {/* Inputs */}
                    <Card className="p-6 space-y-4 bg-card">
                        <Badge variant="default" className="w-fit">
                            Inputs
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground">
                            Training Sliders
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your six training sliders were the{" "}
                            <strong>inputs</strong> to the perceptron:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>🥊 Striking</li>
                            <li>🤼 Grappling</li>
                            <li>❤️ Cardio</li>
                            <li>👣 Footwork</li>
                            <li>🧠 Mindset</li>
                            <li>😴 Sleep</li>
                        </ul>
                    </Card>

                    {/* Weights */}
                    <Card className="p-6 space-y-4 bg-primary/5 border-primary">
                        <Badge variant="default" className="w-fit">
                            Weights
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground">
                            Born Strengths + Opponent Stats
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Each input was multiplied by a{" "}
                            <strong>weight</strong>:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>
                                <strong className="text-foreground">
                                    Base:
                                </strong>{" "}
                                Your athlete&apos;s genetics
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Adjusted by:
                                </strong>{" "}
                                Opponent&apos;s strengths/weaknesses
                            </li>
                            <li>
                                <strong className="text-primary">
                                    Strong opponents
                                </strong>{" "}
                                = counter them!
                            </li>
                            <li>
                                <strong className="text-muted">
                                    Weak opponents
                                </strong>{" "}
                                = exploit them!
                            </li>
                        </ul>
                    </Card>

                    {/* Output */}
                    <Card className="p-6 space-y-4 bg-card">
                        <Badge variant="default" className="w-fit">
                            Output
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground">
                            Win or Loss
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            The perceptron added up all the weighted inputs
                            (plus a hidden bias):
                        </p>
                        <div className="text-sm text-muted-foreground space-y-2 border-l-2 border-primary pl-4">
                            <p>
                                <strong className="text-foreground">
                                    Score
                                </strong>{" "}
                                = Sum(input × weight) + bias
                            </p>
                            <p>
                                If{" "}
                                <strong className="text-foreground">
                                    score ≥ threshold
                                </strong>
                                :{" "}
                                <span className="text-primary font-bold">
                                    WIN!
                                </span>
                            </p>
                            <p>
                                If{" "}
                                <strong className="text-foreground">
                                    score &lt; threshold
                                </strong>
                                :{" "}
                                <span className="text-muted-foreground font-bold">
                                    LOSS
                                </span>
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Summary */}
                <Card className="p-6 bg-muted/30">
                    <p className="text-base text-foreground leading-relaxed">
                        <strong className="text-primary">The Big Idea:</strong>{" "}
                        A perceptron combines your choices (training sliders)
                        using learned importance values (weights). Your
                        athlete&apos;s <strong>Born Strengths</strong> set the
                        base weights, but each{" "}
                        <strong>opponent&apos;s stats</strong> changed what
                        matters most for that specific fight—strong opponents
                        forced you to counter their strengths, weak opponents
                        let you exploit their weaknesses. The perceptron&apos;s
                        hidden threshold determined win or loss!
                    </p>
                </Card>

                {/* Call to Action */}
                <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={onBackToPath}
                            className="gap-2 text-lg px-8"
                        >
                            <ArrowLeft className="h-5 w-5" /> Back to Path
                        </Button>
                        <Button
                            size="lg"
                            onClick={onRestart}
                            className="gap-2 text-lg px-8"
                        >
                            Play Again <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Try a different athlete or rematch tough opponents!
                    </p>
                </div>
            </Card>
        </div>
    );
}

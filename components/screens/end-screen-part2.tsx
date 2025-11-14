"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    ArrowLeft,
    Brain,
    Target,
    Lightbulb,
    CheckCircle2,
    BadgeCheck,
    Network,
    Layers,
} from "lucide-react";

interface EndScreenPart2Props {
    onRestart: () => void;
    onBackToPath: () => void;
}

export function EndScreenPart2({ onRestart, onBackToPath }: EndScreenPart2Props) {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6 py-12"
            style={{
                backgroundImage: `url('/background.svg')`,
            }}
        >
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <Card className="p-12 text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <Network className="h-12 w-12 text-primary" />
                        <h2 className="text-5xl font-bold text-foreground">
                            What You Learned
                        </h2>
                    </div>
                    <p className="text-2xl text-muted-foreground">
                        You just trained a multi-layer neural network!
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        You went from a simple perceptron (Part 1) to a{" "}
                        <strong className="text-foreground">
                            neural network with a hidden layer
                        </strong>
                        . This is how real AI systems work!
                    </p>
                </Card>

                {/* The Big Realization */}
                <Card className="p-0 border-primary border-2 overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-primary/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-4">
                                <Lightbulb className="h-8 w-8 text-primary shrink-0 mt-1" />
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-foreground">
                                        The Evolution
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        In Part 1, you had <strong>one perceptron</strong> making 
                                        one decision. In Part 2, you created{" "}
                                        <strong className="text-primary">
                                            3 perceptrons (hidden nodes)
                                        </strong>{" "}
                                        working in parallel, then combined their outputs with another 
                                        node (output layer). This is a <strong>multi-layer neural network</strong>!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Network Architecture */}
                <Card className="p-8">
                    <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
                        Your Neural Network Architecture
                    </h3>
                    <div className="space-y-6">
                        {/* Visual Diagram */}
                        <div className="flex items-center justify-center gap-8 p-6 bg-muted/20 rounded-lg">
                            {/* Input Layer */}
                            <div className="flex flex-col items-center gap-2">
                                <Badge variant="secondary" className="mb-2">Input Layer</Badge>
                                <div className="space-y-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-4 h-4 rounded-full bg-secondary border-2 border-secondary-foreground"
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    7 inputs<br/>(training stats)
                                </p>
                            </div>

                            <div className="text-2xl text-muted-foreground">→</div>

                            {/* Hidden Layer */}
                            <div className="flex flex-col items-center gap-2">
                                <Badge variant="default" className="mb-2">Hidden Layer</Badge>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                                            <span className="font-bold">S1</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                                            <span className="font-bold">S2</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                                            <span className="font-bold">S3</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    3 hidden nodes<br/>(sessions)
                                </p>
                            </div>

                            <div className="text-2xl text-muted-foreground">→</div>

                            {/* Output Layer */}
                            <div className="flex flex-col items-center gap-2">
                                <Badge variant="destructive" className="mb-2">Output Layer</Badge>
                                <div className="w-16 h-16 rounded-full bg-destructive/20 border-4 border-destructive flex items-center justify-center">
                                    <span className="font-bold">Out</span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    1 output<br/>(Best of 3)
                                </p>
                            </div>
                        </div>

                        {/* Layer Explanations */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <Card className="p-0 border-primary overflow-hidden">
                                <div className="p-6 space-y-4 relative bg-background h-full">
                                    <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                    <div className="relative z-10 space-y-4">
                                        <Badge variant="secondary" className="w-fit">
                                            Input Layer
                                        </Badge>
                                        <h4 className="text-xl font-bold text-foreground">
                                            Same Inputs for All
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            All 3 hidden nodes receive the{" "}
                                            <strong>same inputs</strong>: athlete strengths 
                                            combined with opponent stats. They process this 
                                            information independently.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-0 border-primary overflow-hidden">
                                <div className="p-6 space-y-4 relative bg-background h-full">
                                    <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                    <div className="relative z-10 space-y-4">
                                        <Badge variant="default" className="w-fit">
                                            Hidden Layer
                                        </Badge>
                                        <h4 className="text-xl font-bold text-foreground">
                                            3 Perceptrons
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Each training session was a{" "}
                                            <strong>hidden layer node</strong> (perceptron). 
                                            They had different weights (training sliders) 
                                            and biases (moods), creating diverse strategies.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-0 border-primary overflow-hidden">
                                <div className="p-6 space-y-4 relative bg-background h-full">
                                    <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                    <div className="relative z-10 space-y-4">
                                        <Badge variant="destructive" className="w-fit">
                                            Output Layer
                                        </Badge>
                                        <h4 className="text-xl font-bold text-foreground">
                                            Combining Results
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The output node combined all 3 fight results 
                                            using simple weights (1, 1, 1) and bias (-2) 
                                            to determine the final outcome.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>

                {/* Key Differences from Part 1 */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-secondary/5"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-6">
                                <Layers className="h-8 w-8 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">
                                        Part 1 vs Part 2
                                    </h3>
                                    <p className="text-lg text-muted-foreground">
                                        Here&apos;s how multi-layer networks differ from single perceptrons:
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Multiple Decisions
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Instead of one decision (Part 1), you made{" "}
                                            <strong>3 independent decisions</strong> (hidden layer) 
                                            that were then combined (output layer).
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Diverse Strategies
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Each hidden node had{" "}
                                            <strong>different weights and biases</strong>, 
                                            allowing the network to try multiple training strategies 
                                            simultaneously!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Ensemble Decision-Making
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The output layer <strong>combined</strong> all 3 results, 
                                            making a final decision based on consensus (best of 3). 
                                            This is more robust than a single decision!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-destructive">
                                    <CheckCircle2 className="h-6 w-6 text-destructive shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            More Complex Problems
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Multi-layer networks can solve{" "}
                                            <strong className="text-destructive">
                                                much more complex problems
                                            </strong>{" "}
                                            than single perceptrons. By adding more layers and nodes, 
                                            neural networks can recognize images, understand language, 
                                            and make sophisticated decisions!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Real-World Connection */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-muted/30"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-foreground mb-4 text-center">
                                Real-World Connection
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                Modern neural networks like ChatGPT, image recognition systems, 
                                and self-driving cars use the <strong className="text-foreground">
                                same architecture</strong> you just learned — just with{" "}
                                <strong className="text-primary">
                                    billions of nodes and many layers
                                </strong>!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="p-4 bg-background rounded-lg border-2">
                                    <p className="font-semibold text-foreground mb-2">
                                        Your Network
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        2 layers, 3 hidden nodes
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-2">
                                    <p className="font-semibold text-foreground mb-2">
                                        Image Recognition
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        10+ layers, millions of nodes
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-2">
                                    <p className="font-semibold text-foreground mb-2">
                                        ChatGPT
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        96 layers, 175 billion parameters
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Summary */}
                <Card className="p-0 border-primary border-2 overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-primary/10"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                                Summary
                            </h3>
                            <div className="space-y-3 text-lg text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />{" "}
                                    You created a{" "}
                                    <strong className="text-foreground">
                                        multi-layer neural network
                                    </strong>{" "}
                                    with a hidden layer
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    Each{" "}
                                    <strong className="text-foreground">
                                        hidden node processed inputs independently
                                    </strong>{" "}
                                    with its own weights and bias
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    The{" "}
                                    <strong className="text-foreground">
                                        output layer combined results
                                    </strong>{" "}
                                    to make a final decision
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    You learned how{" "}
                                    <strong className="text-primary">
                                        real AI systems scale from simple to complex
                                    </strong>
                                </p>
                                <p className="pt-4 text-center text-xl font-semibold text-foreground">
                                    That&apos;s how neural networks work!
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Call to Action */}
                <Card className="p-8">
                    <div className="flex flex-col items-center gap-4">
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
                            Try different strategies or replay with a different athlete!
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}


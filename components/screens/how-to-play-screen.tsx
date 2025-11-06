"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Sliders, Swords, Target, Lightbulb } from "lucide-react";

interface HowToPlayScreenProps {
    onContinue: () => void;
    onBack?: () => void;
}

export function HowToPlayScreen({ onContinue, onBack }: HowToPlayScreenProps) {
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
                                How to Play
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                You&apos;re a coach training an MMA fighter!
                            </p>
                        </div>

                        {/* What is MMA */}
                        <Card className="p-6 bg-primary/5 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Swords className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        What is MMA?
                                    </h3>
                                    <p className="text-muted-foreground">
                                        <strong>
                                            Mixed Martial Arts (MMA)
                                        </strong>{" "}
                                        is a combat sport where fighters use
                                        many different fighting styles: boxing,
                                        wrestling, jiu-jitsu, and more! Your job
                                        is to train your athlete to become a
                                        champion.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Your Role */}
                        <Card className="p-6 w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Your Role: The Coach
                                    </h3>
                                    <p className="text-muted-foreground">
                                        You decide how much time your athlete
                                        spends training each skill. You have a{" "}
                                        <strong className="text-foreground">
                                            20-hour training budget
                                        </strong>{" "}
                                        to split between 7 skills:
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge>Conditioning</Badge>
                                        <Badge>Striking</Badge>
                                        <Badge>Wrestling</Badge>
                                        <Badge>BJJ</Badge>
                                        <Badge>Muay Thai</Badge>
                                        <Badge>Tactical</Badge>
                                        <Badge>Recovery</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* The Big Challenge */}
                        <Card className="p-6 bg-destructive/5 border-destructive w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-destructive/10 p-3">
                                    <Target className="h-6 w-6 text-destructive" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        The Big Challenge
                                    </h3>
                                    <p className="text-muted-foreground">
                                        <strong className="text-destructive">
                                            Your training weights must work for{" "}
                                            <span className="underline">
                                                ALL 6
                                            </span>{" "}
                                            opponents, not just one!
                                        </strong>{" "}
                                        This is called{" "}
                                        <strong className="text-foreground">
                                            generalization
                                        </strong>
                                        . After you beat the final opponent,
                                        you&apos;ll test your weights against
                                        everyone. If they don&apos;t work for
                                        all opponents, you need to adjust your
                                        training!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* How to Adjust Sliders */}
                        <Card className="p-6 bg-primary/5 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Sliders className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        How to Adjust Your Training Sliders
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="p-4 bg-background rounded-lg border-2 border-primary">
                                            <p className="font-semibold text-foreground mb-1">
                                                If your athlete is good at
                                                something:
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Focus on it! Put more training
                                                time into skills where your
                                                athlete has natural talent. This
                                                makes those skills even
                                                stronger.
                                            </p>
                                        </div>

                                        <div className="p-4 bg-background rounded-lg border-2 border-destructive">
                                            <p className="font-semibold text-foreground mb-1">
                                                If your opponent is good at
                                                something:
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Also focus on it! You need to
                                                counter their strengths. If
                                                they&apos;re great at wrestling,
                                                train wrestling more so you can
                                                defend against them.
                                            </p>
                                        </div>

                                        <div className="p-4 bg-background rounded-lg border-2 border-chart-3">
                                            <p className="font-semibold text-foreground mb-1">
                                                The Secret Formula:
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                The game combines your
                                                athlete&apos;s strengths + your
                                                opponent&apos;s strengths to
                                                decide what matters most. Train
                                                the skills that matter most for
                                                each fight!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* What You're Learning */}
                        <Card className="p-6 bg-primary/10 border-primary w-full">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/20 p-3">
                                    <Lightbulb className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        What You&apos;re Learning: Perceptrons!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        A <strong>perceptron</strong> is the
                                        simplest type of neural network. It
                                        learns by finding the right{" "}
                                        <strong>weights</strong> (your training
                                        sliders) that work for all training
                                        examples (all opponents). Just like you
                                        need weights that beat all 6 opponents,
                                        a perceptron needs weights that work for
                                        all its training data!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <User className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    1. Pick Your Athlete
                                </h3>
                                <p className="text-muted-foreground">
                                    Each athlete has different natural
                                    strengths. Check their &quot;Born
                                    Strengths&quot; panel!
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <Sliders className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    2. Set Training
                                </h3>
                                <p className="text-muted-foreground">
                                    Adjust sliders based on your athlete&apos;s
                                    strengths and your opponent&apos;s
                                    strengths. Remember: your weights must work
                                    for ALL opponents!
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full bg-primary/10 p-6">
                                    <Swords className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    3. Fight & Learn!
                                </h3>
                                <p className="text-muted-foreground">
                                    Fight your opponent! If you lose, get advice
                                    and try again. Beat all 6, then test your
                                    weights against everyone!
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

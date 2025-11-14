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
} from "lucide-react";

interface EndScreenProps {
    onRestart: () => void;
    onBackToPath: () => void;
    onContinueToPart2?: () => void;
}

export function EndScreen({
    onRestart,
    onBackToPath,
    onContinueToPart2,
}: EndScreenProps) {
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
                        <Brain className="h-12 w-12 text-primary" />
                        <h2 className="text-5xl font-bold text-foreground">
                            What You Learned
                        </h2>
                    </div>
                    <p className="text-2xl text-muted-foreground">
                        You just trained a perceptron!
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you did in this game was actually{" "}
                        <strong className="text-foreground">
                            training a perceptron
                        </strong>
                        —the simplest form of a neural network. Let&apos;s see
                        how!
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
                                        The Big Realization
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        When you adjusted those training
                                        sliders, you were actually{" "}
                                        <strong className="text-foreground">
                                            finding the weights
                                        </strong>{" "}
                                        for a perceptron! And when you made sure
                                        your weights worked for all 6 opponents,
                                        you learned the most important concept
                                        in machine learning:{" "}
                                        <strong className="text-primary">
                                            generalization
                                        </strong>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* How Perceptrons Work */}
                <Card className="p-8">
                    <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
                        How Perceptrons Work
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Weights */}
                        <Card className="p-0 border-primary overflow-hidden">
                            <div className="p-6 space-y-4 relative bg-background h-full">
                                <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                <div className="relative z-10 space-y-4">
                                    <Badge variant="default" className="w-fit">
                                        1. Weights
                                    </Badge>
                                    <h4 className="text-xl font-bold text-foreground">
                                        Your Training Sliders
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        In a perceptron,{" "}
                                        <strong>weights</strong> tell the
                                        network how important each input is. In
                                        this game, your training sliders were
                                        the weights!
                                    </p>
                                    <div className="space-y-1 text-sm">
                                        <p className="font-semibold text-foreground">
                                            Your 7 weights:
                                        </p>
                                        <ul className="text-muted-foreground space-y-1">
                                            <li>Conditioning weight</li>
                                            <li>Striking weight</li>
                                            <li>Wrestling weight</li>
                                            <li>BJJ weight</li>
                                            <li>Muay Thai weight</li>
                                            <li>Tactical weight</li>
                                            <li>Recovery weight</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Inputs */}
                        <Card className="p-0 border-primary overflow-hidden">
                            <div className="p-6 space-y-4 relative bg-background h-full">
                                <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                <div className="relative z-10 space-y-4">
                                    <Badge variant="default" className="w-fit">
                                        2. Inputs
                                    </Badge>
                                    <h4 className="text-xl font-bold text-foreground">
                                        Athlete + Opponent Stats
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        The <strong>inputs</strong> are the data
                                        the perceptron receives. In this game,
                                        inputs were your athlete&apos;s
                                        strengths combined with opponent stats.
                                    </p>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>
                                            <strong className="text-foreground">
                                                Effective Input
                                            </strong>{" "}
                                            = (Athlete Strength + Opponent Stat)
                                            ÷ 2
                                        </p>
                                        <p className="text-xs italic">
                                            This is why strong opponents made
                                            you train more—their stats increased
                                            the effective input!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Output */}
                        <Card className="p-0 border-primary overflow-hidden">
                            <div className="p-6 space-y-4 relative bg-background h-full">
                                <div className="absolute inset-0 bg-primary/5 h-full"></div>
                                <div className="relative z-10 space-y-4">
                                    <Badge variant="default" className="w-fit">
                                        3. Output
                                    </Badge>
                                    <h4 className="text-xl font-bold text-foreground">
                                        Win or Loss
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        The perceptron calculates a score by
                                        multiplying each input by its weight,
                                        then adding a bias.
                                    </p>
                                    <div className="text-sm space-y-2 border-l-2 border-primary pl-4">
                                        <p className="text-muted-foreground">
                                            <strong className="text-foreground">
                                                Score
                                            </strong>{" "}
                                            = Σ(Input × Weight) + Bias
                                        </p>
                                        <p className="text-muted-foreground">
                                            If{" "}
                                            <strong className="text-foreground">
                                                Score ≥ Threshold
                                            </strong>
                                            :{" "}
                                            <span className="text-primary">
                                                WIN!
                                            </span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            If{" "}
                                            <strong className="text-foreground">
                                                Score &lt; Threshold
                                            </strong>
                                            :{" "}
                                            <span className="text-muted">
                                                LOSS
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Card>

                {/* The Training Process */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-secondary/5"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-6">
                                <Target className="h-8 w-8 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">
                                        The Training Process
                                    </h3>
                                    <p className="text-lg text-muted-foreground">
                                        Here&apos;s what you did that mirrors
                                        real perceptron training:
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Step 1: Start with Random Weights
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            You began with sliders at 0—just
                                            like a perceptron starts with random
                                            weights!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Step 2: Test Against Training
                                            Examples
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Each opponent was a{" "}
                                            <strong>training example</strong>.
                                            You tested your weights against each
                                            one, just like a perceptron tests
                                            against training data!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-primary">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Step 3: Adjust Weights Based on
                                            Results
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            When you lost, you adjusted your
                                            sliders (weights) and tried again.
                                            This is exactly how perceptrons
                                            learn—they adjust weights based on
                                            errors!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-background rounded-lg border-2 border-destructive">
                                    <CheckCircle2 className="h-6 w-6 text-destructive shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            Step 4: Generalization (The
                                            Championship Test!)
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The most important step! You made
                                            sure your weights worked for{" "}
                                            <strong className="text-destructive">
                                                ALL 6 opponents
                                            </strong>
                                            , not just one. This is{" "}
                                            <strong>generalization</strong>—the
                                            key to machine learning. A
                                            perceptron must work on all training
                                            examples, not just memorize one!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Key Concepts */}
                <Card className="p-0 border-primary overflow-hidden">
                    <div className="p-8 relative bg-background">
                        <div className="absolute inset-0 bg-primary/5"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
                                Key Concepts You Learned
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-background rounded-lg border-primary border-2">
                                    <h4 className="font-bold text-foreground mb-2">
                                        Weights
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Numbers that tell the perceptron how
                                        important each input is. You controlled
                                        these with your sliders!
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-primary border-2">
                                    <h4 className="font-bold text-foreground mb-2">
                                        Inputs
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        The data fed into the perceptron. In
                                        your case, athlete strengths + opponent
                                        stats.
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-primary border-2">
                                    <h4 className="font-bold text-foreground mb-2">
                                        Bias
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        A constant added to the score. Your
                                        athlete&apos;s natural talent and daily
                                        mood were the bias!
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-primary border-2">
                                    <h4 className="font-bold text-foreground mb-2">
                                        Generalization
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        The ability to work on all examples, not
                                        just one. You proved this in the
                                        championship test!
                                    </p>
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
                            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                                Perceptrons are the building blocks of neural
                                networks. While simple, they teach the
                                fundamental concepts used in AI:{" "}
                                <strong className="text-foreground">
                                    finding weights that generalize
                                </strong>
                                . Modern AI systems use the same principles,
                                just with millions of weights and more complex
                                calculations. You just learned the foundation of
                                how AI learns!
                            </p>
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
                                    You{" "}
                                    <strong className="text-foreground">
                                        found weights
                                    </strong>{" "}
                                    (training sliders) that worked
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    You{" "}
                                    <strong className="text-foreground">
                                        tested them
                                    </strong>{" "}
                                    against multiple examples (opponents)
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    You{" "}
                                    <strong className="text-foreground">
                                        adjusted them
                                    </strong>{" "}
                                    when they failed
                                </p>
                                <p className="flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                    You{" "}
                                    <strong className="text-primary">
                                        generalized
                                    </strong>{" "}
                                    by making them work for ALL opponents
                                </p>
                                <p className="pt-4 text-center text-xl font-semibold text-foreground">
                                    That&apos;s exactly how perceptrons learn!
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Call to Action */}
                <Card className="p-8">
                    <div className="flex flex-col items-center gap-4">
                        {onContinueToPart2 && (
                            <Card className="p-6 bg-primary/10 border-primary w-full mb-4">
                                <div className="text-center space-y-4">
                                    <h3 className="text-2xl font-bold text-foreground">
                                        Ready for Part 2?
                                    </h3>
                                    <p className="text-muted-foreground">
                                        You&apos;ve mastered perceptrons! Now
                                        learn about{" "}
                                        <strong className="text-primary">
                                            multi-layer neural networks
                                        </strong>{" "}
                                        with hidden layers, multiple training
                                        sessions, and best of 3 fights!
                                    </p>
                                    <Button
                                        size="lg"
                                        onClick={onContinueToPart2}
                                        className="gap-2 text-lg px-8"
                                    >
                                        Continue to Part 2{" "}
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </Card>
                        )}
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
                            Try a different athlete or rematch tough opponents
                            to experiment with different weights!
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

// 2. Structure and Maintainability

// Use modular code organization: separate logic into functions, classes, and reusable components.

// Keep files clean — no excessive inline logic in main scripts or route handlers.

// follow best practices

// keep the project code consistant, don't repeat your self, if you notice an issue, for example we are repeating the same logic in two places and this can be improuved, let me know, and ask me if I want you to fix that.

// ### Model Identification

// At the **beginning of every message, task, or response**, the model must explicitly announce which model is active.

// **Required Format:**

// > *Model: claude-4.5-sonnet-Thinking*

// **Additional Examples:**

// * *Model: claude-4.5-sonnet*
// * *Model: gpt-5*

// **Rationale:** This ensures clarity and traceability for evaluation, debugging, and version comparison.

// **Enforcement:**

// * The identification line must be the **first visible line** in any model output.
// * if you are not a specific model don't lie say which model you're actually.

// ## Auto Model Override Rule

// **Purpose:** Ensure consistent model behavior and override outdated auto-selection logic.

// ---

// ### Rule

// When **auto model selection** is enabled:

// > Always use **`claude-4.5-sonnet-Thinking`** as the default model.

// If **`claude-4.5-sonnet-Thinking`** is not available:

// > Automatically fall back to **`claude-4.5-sonnet`**.

// ---

// ### Rationale

// The old **complexity-based model selection** logic is **deprecated**. It produces inconsistent results and is no longer suitable for current workflows. The **Thinking** model consistently provides superior reasoning and stability across all task types, making complexity detection unnecessary. do we're gonna use always claude 4.5 sonnet.

// ---

// ### Enforcement

// * This rule **overrides all other auto-selection heuristics**.
// * Ignore any internal logic attempting to choose a model based on task complexity.
// * Always prefer the Thinking variant when available.

// ---

// **Summary:**

// > Auto mode = `claude-4.5-sonnet-Thinking` → fallback = `claude-4.5-sonnet` → ignore complexity logic.
// ## Git Account Switching Rule

// When the user asks to "switch to personal account" or "switch to work account", follow these steps:

// 1. **Check for existing Git aliases** using:
//    git config --list | Select-String -Pattern "alias"

// 2. **Look for these specific aliases**:
//    - `switch-personal` - switches to personal account (benaliYacine / benaliyacine324@gmail.com)
//    - `switch-work` - switches to work account (benaliabderrahmane / benaliabderrahmen88@gmail.com)
//    - `show-account` - displays current account info

// 3. **Execute the appropriate command**:
//    - For personal: `git switch-personal`
//    - For work: `git switch-work`

// 4. **Verify the switch** using: `git show-account`

// 5. **Confirm success** by showing the current account name and email

// **Note**: These aliases are already configured on the user's system and handle the account switching automatically.

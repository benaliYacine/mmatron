"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Sliders, Swords } from "lucide-react";

interface HowToPlayScreenProps {
  onContinue: () => void;
}

export function HowToPlayScreen({ onContinue }: HowToPlayScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="flex flex-col items-center gap-8 p-12 max-w-3xl">
        <h2 className="text-4xl font-bold text-foreground">
          Pick. Slide. Fight!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              1. Pick Your Athlete
            </h3>
            <p className="text-muted-foreground">
              Each athlete has different natural strengths
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
              Adjust sliders: 🥊 Striking, 🤼 Grappling, ❤️ Cardio, 👣 Footwork, 🧠 Mindset, 😴 Sleep
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Swords className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              3. Fight!
            </h3>
            <p className="text-muted-foreground">
              If you lose, your assistant gives you advice to improve
            </p>
          </div>
        </div>
        
        <Button size="lg" onClick={onContinue} className="text-lg px-8 py-6 mt-4">
          Let&apos;s Go!
        </Button>
      </Card>
    </div>
  );
}


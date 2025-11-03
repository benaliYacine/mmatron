"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swords } from "lucide-react";

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="flex flex-col items-center gap-8 p-12 text-center">
        <div className="flex items-center gap-4">
          <Swords className="h-16 w-16 text-primary" />
          <h1 className="text-6xl font-bold tracking-tight text-foreground">
            MMATRON
          </h1>
        </div>
        
        <p className="max-w-md text-xl text-muted-foreground">
          Train your fighter. Master the matchup. Win the championship!
        </p>
        
        <Button size="lg" onClick={onStart} className="text-lg px-8 py-6">
          Start Game
        </Button>
      </Card>
    </div>
  );
}


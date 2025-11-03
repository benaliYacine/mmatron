"use client";

import { Button } from "@/components/ui/button";

interface LandingScreenProps {
    onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <div
            className="fixed inset-0 flex items-end justify-center bg-cover bg-center bg-no-repeat pb-30 z-50"
            style={{
                backgroundImage: `url('/landing_page.svg')`,
            }}
        >
            <Button size="lg" onClick={onStart} className="text-lg px-8 py-6">
                Start Game
            </Button>
        </div>
    );
}

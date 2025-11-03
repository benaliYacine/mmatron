"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
    src: string;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
}

export function LottieAnimation({
    src,
    className = "",
    loop = false,
    autoplay = true,
}: LottieAnimationProps) {
    return (
        <DotLottieReact
            src={src}
            loop={loop}
            autoplay={autoplay}
            className={className}
        />
    );
}

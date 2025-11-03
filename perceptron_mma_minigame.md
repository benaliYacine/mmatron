# MMATRON — UI/UX Spec (Opponent‑Aware Weights)

> **Goal for kids (~10 y/o):** Feel how a perceptron works _without math_. Kids act as the coach: pick an athlete, set training sliders, and fight different opponents.  
> **Key twist:** Athlete has **born strengths** (base weights), but **each opponent** changes what matters **for this fight**, so the effective weights change per match.

---

## 0) Design Principles

-   **Simple loop:** Pick athlete → set sliders → fight → instant feedback → next.
-   **No predictive meter:** Kids cannot see win/lose before fighting (no threshold gauge).
-   **Visible cause → effect:** Loss shows **one or two** actionable tips.
-   **Never stuck:** Kid can always move to the next opponent and return later.
-   **Clarity about weights:**
    -   Show **Athlete stats** (static bars, non-numeric).
    -   Show **Opponent Focus** (badges/highlights per fight).
    -   Internally, the **effective weight** = `athlete_weight * opponent_focus_multiplier`.

---

## 1) Navigation Flow

1. **Landing** → big title art, **Start**.
2. **How to Play (1 screen)** → 3 pictograms + **Let’s Go**.
3. **Choose Athlete** → select 1 of 2–3 athletes (shows stats).
4. **Opponent Path (Levels)** → row of 6 opponent bubbles; next is always unlocked.
5. **Training Room** → sliders + Born Strengths + Opponent Focus. **Fight!**
6. **Result Overlay** → WIN or LOSS, tiny animation.
    - On LOSS: **Assistant Advice** (up to 2 tips), buttons: **Try Again**, **Tweak Training**, **Next Opponent**.
7. **End Screen (“What you learned”)** → friendly perceptron diagram mapping.

---

## 2) Screens & Content

### 2.1 Landing

-   **UI:** Title/logo, playful art.
-   **CTA:** **Start** (primary, centered).

### 2.2 How to Play (single card)

-   **Steps (large icons):**
    1. **Pick your athlete** (different stats strengths).
    2. **Slide trainings**: 🥊 Striking, 🤼 Grappling, ❤️ Cardio, 👣 Footwork, 🧠 Mindset, 😴 Sleep.
    3. **Tap Fight!** If you lose, your **assistant** gives advice.
-   **Button:** **Let’s Go**.

### 2.3 Choose Athlete (weights = genetics)

-   Show 2–3 athlete cards. Each card has:
    -   Name + avatar.
    -   **Strengths/ weaknesses (stats)**: six small bars (read‑only, non‑numeric).
        -   Example: Nora Quick → high **Footwork** & **Cardio**, low **Sleep** importance.
-   **Pick** button on each card.

### 2.4 Opponent Path (levels)

-   Horizontal scroll of 6 opponent bubbles with faces & names:
    -   e.g., 1) **Breather Bruno**, 2) **Twisty Tia**, 3) **Wall Hugo**, 4) **Storm Rina**, 5) **Sneak Nico**, 6) **Boss Kato**.
-   **Unlocked rule:** Next opponent unlocks after one attempt (win or loss).
-   **Checkmark** appears on beaten opponents.

### 2.5 Training Room (core play)

**Top strip**

-   Athlete badge (name + mini Born Strengths icon row).
-   Opponent badge (face + **Opponent Focus** badges).

**Center left — Training Sliders (inputs)**

-   6 chunky sliders with icons (0–10 ticks):  
    🥊 Striking, 🤼 Grappling, ❤️ Cardio, 👣 Footwork, 🧠 Mindset, 😴 Sleep
-   **Time Budget bar** under sliders (e.g., 20 points). Turns orange if the kid spends nearly all points on one stat.

**Center right — Knowledge Panels**

-   **Born Strengths** (read‑only): six tiny bars, **static** per athlete (“How much this training usually counts for _this athlete_.”).
-   **Opponent Focus** (read‑only): 1–3 **glowing badges** for this fight (e.g., “Cardio matters here”, “Footwork helps”).  
    _(No numbers. This visually explains why weights change between fights without showing math.)_

**Bottom actions**

-   **Fight!** (primary, centered)
-   **Reset** (sliders to default)
-   **Next Opponent** (always available; tooltip “You can come back later!”)

> **No readiness gauge or threshold line** is shown here, so kids can’t predict the outcome.

### 2.6 Result Overlay

-   **WIN** 💥 or **LOSS** 💨 for ~1s (short animation).
-   On LOSS, show a card with:
    -   **Assistant Advice** (up to 2 lines, see §4).
    -   Buttons: **Try Again** (same sliders), **Tweak Training** (return to sliders), **Next Opponent**.

### 2.7 End Screen — “What you learned”

-   Friendly drawing of a perceptron with simple labels:
    -   **Inputs** = your six training sliders.
    -   **Weights** = start from your athlete’s **Born Strengths**, but change a bit for each **Opponent Focus** (fight‑day twist).
    -   **Hidden Line** = the fight pass line (we keep it hidden during play).
    -   **Output** = WIN or LOSS.
-   One sentence summary:
    > “A perceptron mixes your trainings (using your athlete’s strengths and the fight’s focus) and checks if it’s enough to win.”

---

## 3) Opponent‑Aware Weights (Kid‑safe Visuals)

-   Internally compute **effective weights** each fight:
    ```
    effective_w[i] = athlete_w[i] * opponent_multiplier[i]
    ```
-   **Born Strengths** panel shows athlete_w (static bars).
-   **Opponent Focus** shows _which trainings are boosted_ this fight (badges/glow).
    -   Never display numbers; only visual emphasis.

**Example UI micro‑copy**

-   Opponent Focus section label: “For this fight:”
-   Badges:
    -   “Cardio helps here.”
    -   “Footwork helps.”
    -   “Striking matters less today.” (optional later‑level hint)

---

## 4) Assistant Advice (Loss Feedback)

Show **max 2** lines chosen by simple rules:

1. **Under‑trained, high effective weight:**
    - “We needed a bit more **Cardio**.”
2. **Over‑trained, low effective weight:**
    - “We trained **Mindset** a lot, but it didn’t help much here.”
3. **Too unbalanced (design flag):**
    - “Try spreading your time a bit.”
4. **Very close miss (near threshold):**
    - “So close! Add a _small_ boost to **Footwork**.”

---

## 5) Progression & Difficulty

-   **Weights vary per opponent** via multipliers (Opponent Focus), but athlete Born Strengths stay visible and constant.
-   Ramps across 6 levels:
    -   **L1–2:** One clear focus (e.g., Cardio).
    -   **L3–4:** Two‑stat synergies (Cardio + Footwork).
    -   **L5–6:** Tradeoffs; avoid maxing one stat; one “matters less” badge may appear.

**Never stuck rule:** Next Opponent always available.

---

## 6) Data Model (Example)

```json
{
    "time_budget": 20,
    "athletes": [
        {
            "id": "nora_quick",
            "name": "Nora Quick",
            "weights": {
                "striking": 0.3,
                "grappling": 0.2,
                "cardio": 0.8,
                "footwork": 0.7,
                "mindset": 0.4,
                "sleep": 0.2
            },
            "bias_range": [-0.1, 0.2]
        },
        {
            "id": "max_heavy",
            "name": "Max Heavy",
            "weights": {
                "striking": 0.9,
                "grappling": 0.7,
                "cardio": 0.3,
                "footwork": 0.2,
                "mindset": 0.3,
                "sleep": 0.2
            },
            "bias_range": [-0.05, 0.15]
        }
    ],
    "opponents": [
        {
            "id": 1,
            "name": "Breather Bruno",
            "threshold": 8.0,
            "focus": { "cardio": 1.4, "footwork": 1.2 } // boosted for this fight
        },
        {
            "id": 2,
            "name": "Twisty Tia",
            "threshold": 8.6,
            "focus": { "footwork": 1.5, "cardio": 1.2 }
        },
        {
            "id": 3,
            "name": "Wall Hugo",
            "threshold": 9.0,
            "focus": { "grappling": 1.5, "striking": 1.2 }
        },
        {
            "id": 4,
            "name": "Storm Rina",
            "threshold": 9.2,
            "focus": { "cardio": 1.2, "footwork": 1.2, "striking": 0.8 } // one de‑emphasized
        },
        {
            "id": 5,
            "name": "Sneak Nico",
            "threshold": 9.4,
            "focus": { "footwork": 1.4, "mindset": 1.2 }
        },
        {
            "id": 6,
            "name": "Boss Kato",
            "threshold": 9.7,
            "focus": { "grappling": 1.4, "cardio": 1.3, "striking": 0.9 }
        }
    ]
}
```

> **Effective weight calculation per fight:**  
> `effective_w = normalize( athlete.weights ⊙ opponent.focus_defaults )`  
> where `focus_defaults` uses `1.0` for unspecified stats. (Optional normalization keeps scores within a kid‑tuned range.)

---

## 7) Core Algorithm (Pseudo)

```pseudo
// Inputs: sliders x[i] ∈ {0..10}, time_budget (e.g., 20)
// Athlete base weights a[i], opponent focus multipliers f[i] (default 1.0)
// Bias b ~ Uniform(bias_range)

effective_w[i] = a[i] * f[i]

// optional normalization to maintain difficulty curve
scale = SUM(effective_w)
if scale > 0: effective_w[i] = effective_w[i] * (K / scale)   // pick K (e.g., 3.0) to tune scores

// enforce time budget
if SUM(x) > time_budget: clamp / auto-scale back to budget

score = SUM_i (effective_w[i] * x[i]) + b

if score >= threshold:
  result = WIN
else:
  result = LOSS

// Advice selection (max 2)
tips = []
hi = top indices by effective_w
lo = bottom indices by effective_w
if any x[hi] < mid: tips += ["We needed a bit more " + name(hi_low)]
if any x[lo] is very high: tips += ["We trained " + name(lo_high) + " a lot, but it didn’t help much here."]
if near_threshold: tips = ["So close! Add a small boost to " + name(best_gain)]
if very skewed and later-level flag: tips += ["Try spreading your time a bit."]
show first 2 tips
```

---

## 8) Copy (Kid‑simple)

-   **How to Play title:** “Pick. Slide. Fight!”
-   **Opponent Focus label:** “For this fight:”
-   **Loss tips:**
    -   “We needed a bit more **Cardio**.”
    -   “Too much **Striking** for this matchup—spread a little.”
    -   “**Footwork** helps here more than **Mindset**.”
-   **Next Opponent tooltip:** “Stuck? Try the next fight—come back later!”
-   **End screen line:** “A perceptron mixes your trainings (using your athlete’s strengths and the fight’s focus) and checks if it’s enough to win.”

---

## 9) Art & Interaction Notes

-   Sliders: big ticks, snap feedback; emojis at ends.
-   Opponent Focus badges: glowing chips beside their icons.
-   Short animations: 300–400 ms; confetti on WIN, dust poof on LOSS.
-   Keep screens clean: one big focal area + supporting panels.

---

## 10) Minimal Telemetry (Optional, for tuning)

-   Store per fight: athlete_id, opponent_id, sliders, result, selected tips.
-   Use to adjust thresholds and focus multipliers for fair difficulty.

---

## 11) Implementation Tips

-   **Single page app** with route‑like states; keep asset sizes tiny.
-   Use the JSON in §6 for content; safe defaults f[i]=1.0.
-   For class demos, add a hidden "Show Numbers" toggle (dev only).

---

## 12) Technical Architecture

### 12.1 State Management

-   Use **React Context API** or component-level state for game state.
-   Core state includes:
    -   Selected athlete ID
    -   Current opponent ID
    -   Slider values (6 training stats)
    -   Unlocked opponents (array of opponent IDs)
    -   Beaten opponents (array of opponent IDs)
    -   Current fight result (if any)

### 12.2 Component Hierarchy

```
App
├── LandingScreen
├── HowToPlayScreen
├── ChooseAthleteScreen
│   └── AthleteCard (×2-3)
├── OpponentPathScreen
│   └── OpponentBubble (×6)
├── TrainingRoomScreen
│   ├── AthleteBadge
│   ├── OpponentBadge
│   ├── TrainingSliders
│   │   ├── Slider (×6)
│   │   └── TimeBudgetBar
│   ├── BornStrengthsPanel
│   └── OpponentFocusPanel
├── ResultOverlay
│   ├── WinAnimation / LossAnimation
│   └── AssistantAdvice (if loss)
└── EndScreen
```

### 12.3 Navigation & Routing

-   Use **Next.js App Router** with URL params or React state-based navigation.
-   Screen transitions via state changes, not full page reloads.
-   Implement smooth transitions between screens (300-400ms).

### 12.4 Error Handling

-   Implement React Error Boundaries for graceful error handling.
-   Show kid-friendly error messages if data fails to load.
-   Fallback to default values if athlete/opponent data is missing.

---

## 13) Game Logic Specifications

### 13.1 Bias Calculation

**When:** Before each fight attempt (recalculated every time the kid clicks "Fight!").

**Components:**

-   **Athlete Talent** (fixed): Base bias drawn from `athlete.bias_range`. This represents the athlete's natural potential and stays constant until the athlete is changed.
-   **Mood** (variable): Random variation applied on top of talent, representing day-to-day mental/physical state.

**Formula:**

```
bias = athlete_base_bias + mood_variation
where:
  athlete_base_bias ~ Uniform(athlete.bias_range[0], athlete.bias_range[1])
  mood_variation ~ Uniform(-0.15, +0.15) // slight day-to-day variation
```

**UI Communication:**

-   Show a small message or tooltip before the fight indicating the athlete's mood/talent state.
-   Example: "Nora feels sharp today!" or "Nora seems a bit tired today."
-   This helps kids understand why the same slider settings might yield different results.

### 13.2 Time Budget Enforcement

**Algorithm:**

1.  **Validation:** When kid adjusts sliders, check if `SUM(all slider values) > time_budget`.
2.  **Clamping Method:** Proportional scaling (preserves relative training distribution):


    ```
    if SUM(sliders) > time_budget:
        scale_factor = time_budget / SUM(sliders)
        for each slider:
            slider_value = slider_value * scale_factor
    ```

3.  **Allow Under-budget:** Kid can use less than the full budget (no auto-fill).
4.  **Default Slider Positions:** All sliders start at `0` (blank slate).

**Time Budget Bar:**

-   Visual progress bar showing: `used_time / time_budget`.
-   Display format: "15 / 20" (used / total).
-   **Color states:**
    -   Green (default): Normal usage
    -   Yellow: >80% of budget used
    -   Orange: >95% of budget used on a single stat (too unbalanced)
    -   Red: Budget exceeded (will auto-clamp)
-   Update in real-time as kid adjusts sliders.
-   Use shadcn Progress component for visual representation.

**Feedback:**

-   When budget is exceeded, briefly flash red and smoothly scale down sliders.
-   Show a small toast/hint: "Adjusting to fit your time budget!"

---

## 14) UI/UX Specifications

**Platform:** Desktop only. Optimize for 1920×1080 minimum, with graceful scaling to larger screens.

**Design System:**

-   Use **shadcn/ui** components as the base design system.
-   Represent all UI elements clearly using appropriate shadcn components:
    -   Buttons, Cards, Badges, Progress bars, Sliders, Tooltips, etc.
-   Visual design can be refined later; focus on clear representation first.
-   Ensure good contrast and readable text sizes.

---

## 18) Data Structure and Type Definitions

### 18.1 TypeScript Interfaces

```typescript
// Training stat types
type TrainingStat =
    | "striking"
    | "grappling"
    | "cardio"
    | "footwork"
    | "mindset"
    | "sleep";

// Slider state (0-10 for each stat)
type SliderState = Record<TrainingStat, number>;

// Athlete definition
interface Athlete {
    id: string;
    name: string;
    weights: Record<TrainingStat, number>; // base weights (0-1 range)
    bias_range: [number, number]; // [min, max] for talent bias
    avatar?: string; // optional image path
}

// Opponent definition
interface Opponent {
    id: number;
    name: string;
    threshold: number; // minimum score to win
    focus: Partial<Record<TrainingStat, number>>; // multipliers (default 1.0)
    avatar?: string; // optional image path
}

// Fight result
interface FightResult {
    score: number;
    won: boolean;
    bias_used: number;
    effective_weights: Record<TrainingStat, number>;
}

// Game progress state
interface GameState {
    selectedAthleteId: string | null;
    currentOpponentId: number | null;
    sliderState: SliderState;
    unlockedOpponents: number[]; // array of opponent IDs
    beatenOpponents: number[]; // array of opponent IDs
    lastFightResult: FightResult | null;
}

// Game configuration
interface GameConfig {
    time_budget: number;
    athletes: Athlete[];
    opponents: Opponent[];
}

// Assistant advice tip
interface AdviceTip {
    message: string;
    priority: number; // lower = higher priority
}
```

### 18.2 Default Values

```typescript
const DEFAULT_SLIDER_STATE: SliderState = {
    striking: 0,
    grappling: 0,
    cardio: 0,
    footwork: 0,
    mindset: 0,
    sleep: 0,
};

const INITIAL_GAME_STATE: GameState = {
    selectedAthleteId: null,
    currentOpponentId: null,
    sliderState: DEFAULT_SLIDER_STATE,
    unlockedOpponents: [1], // first opponent always unlocked
    beatenOpponents: [],
    lastFightResult: null,
};
```

---

## 19) Win Screen Details

### 19.1 Opponent Path System

-   **Visual:** Horizontal road/menu showing all 6 opponents as selectable bubbles/cards.
-   **Unlocking:** After winning a fight, the next opponent automatically unlocks.
-   **Visual Indicators:**
    -   **Locked:** Grayed out, shows lock icon
    -   **Unlocked (not beaten):** Available to select, normal color
    -   **Beaten:** Shows checkmark badge, can still replay

### 19.2 Win Behavior

**On WIN:**

1.  Show confetti animation (~1s).
2.  Display "WIN!" message with celebration.
3.  **Automatically unlock next opponent** (if not already unlocked).
4.  **Buttons:**


    -   **Next Opponent** (primary): Move to next opponent's training room
    -   **Replay This Fight**: Return to same opponent with fresh sliders
    -   **Back to Path**: Return to opponent selection menu

### 19.3 Navigation Flow After Win

-   Kid can choose to continue to next opponent OR return to opponent path menu.
-   If all 6 opponents are beaten, show special completion message and unlock End Screen.

### 19.4 Skip Functionality

-   **Always available:** "Skip" or "Next Opponent" button visible on opponent path.
-   **Tooltip:** "Stuck? Try the next fight—you can come back later!"
-   Allows progression even if kid can't beat current opponent.
-   Skipped opponents remain available for later attempts.

---

## 20) Visual Feedback Details

### 20.1 Time Budget Bar

**Visual Design:**

-   Use shadcn Progress component or custom progress bar.
-   **Layout:** Positioned directly below the training sliders.
-   **Display Format:**
    ```
    [████████████░░░░░░░░] 12 / 20
    ```
-   **Color States:**
    -   **Green (default):** `used_budget ≤ 0.8 × time_budget`
    -   **Yellow:** `0.8 × time_budget < used_budget ≤ 0.95 × time_budget`
    -   **Orange:** `used_budget > 0.95 × time_budget` OR any single stat uses >80% of total budget
    -   **Red:** `used_budget > time_budget` (will clamp on Fight!)
-   **Real-time Updates:** Bar updates immediately as kid drags sliders.
-   **Warning Animation:** Flash orange/red briefly when budget exceeded.

### 20.2 Slider Feedback

**Visual Indicators:**

-   **Value Display:** Show current numeric value (0-10) below or beside each slider.
-   **Icon Enhancement:** Emoji icons at slider ends (left=0, right=10).
-   **Active State:** Highlight slider track when being dragged.
-   **Snap Feedback:** Subtle bounce/pulse when slider value changes (tactile feel).

**Hover States:**

-   Show tooltip with stat name and current value on hover.
-   Subtle glow or border highlight on hover.

**Change Animation:**

-   Smooth transitions when value changes (200ms ease-out).
-   Visual indicator (small arrow or glow) showing direction of change.

### 20.3 Optimal Range Indicators (Optional, Advanced)

For later levels or expert mode:

-   **Subtle hints:** Very light background color on sliders showing "suggested range" based on Opponent Focus.
-   **Not predictive:** Don't show exact optimal values, just gentle guidance.
-   Only appear if kid has lost to this opponent 2+ times.

### 20.4 Born Strengths Visualization

**Bar Design:**

-   Six horizontal bars, one per training stat.
-   **Scale:** Each bar shows relative weight (normalized to max weight = full bar).
-   **Visual Distinction:**
    -   High weight: Long, vibrant colored bar
    -   Medium weight: Medium-length bar, muted color
    -   Low weight: Short bar, very muted/transparent
-   **No Numbers:** Pure visual representation.

### 20.5 Opponent Focus Badges

**Visual Style:**

-   **Glowing effect:** Subtle shadow/glow around badge when stat is boosted (focus > 1.0).
-   **Color Coding:**
    -   Boosted stats: Bright, warm colors (orange, yellow)
    -   Reduced stats: Cool, muted colors (blue-gray)
-   **Badge Layout:**
    -   Horizontal row or small grid
    -   Each badge: icon + text ("Cardio helps here")
    -   Icons match training stat emojis
-   **Animation:** Gentle pulse or glow effect on initial display.

### 20.6 Result Overlay Feedback

**Win Animation:**

-   Confetti particles (2-3s duration)
-   "WIN!" text scales up with bounce (300ms)
-   Celebratory sound (optional)

**Loss Animation:**

-   Dust poof effect (300ms)
-   "LOSS" text fades in
-   Slight shake effect on card

**Advice Card:**

-   Slide in from bottom (400ms ease-out)
-   Tips appear sequentially (100ms delay between each)
-   Highlighted stat names in advice text (bold or colored)

---

**That's it!** You now have a tight, opponent‑aware mini‑game that keeps weights intuitive (athlete strengths) while letting each fight shift what matters via Opponent Focus—without exposing math or prediction meters to the kid.

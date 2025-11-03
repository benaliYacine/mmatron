# MMATRON — UI/UX Spec (Opponent‑Aware Weights)

> **Goal for kids (~10 y/o):** Feel how a perceptron works _without math_. Kids act as the coach: pick an athlete, set training sliders, and fight different opponents.
> **Key twist:** Athlete has **born strengths** (base weights genitics, prefered sport, for example he likes striking, ke Recover quickly), but **each opponent** changes what matters **for this fight**, so the effective weights change per match.

---

## 0) Design Principles

-   **Simple loop:** Pick athlete → set sliders → fight → instant feedback → next.
-   **No predictive meter:** Kids cannot see win/lose before fighting (no threshold gauge).
-   **Visible cause → effect:** Loss shows **one or two** actionable tips.
-   **Never stuck:** Kid can always move to the next opponent and return later.
-   **Clarity about weights:**
    -   Show **Athlete stats** (static bars).
    -   Show **Opponent stats **
    -   Internally, the **effective weight** = `athlete_weight - opponent_stat` for each weight

---

## 1) Navigation Flow

1. **Landing** → big title art, **Start**.
2. **How to Play (1 screen)** → 3 pictograms + **Let’s Go**.
3. **Choose Athlete** → select 1 of 2–3 athletes (shows stats).
4. **Opponent Path (Levels)** → row of 6 opponent bubbles; next is always unlocked.
5. **Training Room** → sliders + Born Strengths + Opponent stats. **Fight!**
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
-   Opponent badge (face + **Opponent Stats** badges).

**Center left — Training Sliders (inputs)**

-   6 chunky sliders with icons (0–10 ticks):🥊 Striking, 🤼 Grappling, ❤️ Cardio, 👣 Footwork, 🧠 Mindset, 😴 Sleep
-   **Time Budget bar** under sliders (e.g., 20 points). Turns orange if the kid spends nearly all points on one stat.

**Center right — Knowledge Panels**

-   **Born Strengths** (read‑only): six tiny bars, **static** per athlete ("How much this training usually counts for _this athlete_.").
-   **Opponent Stats** (read‑only): six bars showing opponent's strengths/weaknesses for this fight.
    -   High bars with glowing badges: "Strong at Striking!" → You need to counter this
    -   Low bars: "Weak at Cardio" → You can exploit this
        _(No numbers. This visually explains why training importance changes per fight without showing math.)_

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
    -   **Weights** = start from your athlete's **Born Strengths**, but change based on each **opponent's stats** (opponent's strengths change what matters for this fight).
    -   **Hidden Line** = the fight pass line (we keep it hidden during play).
    -   **Output** = WIN or LOSS.
-   One sentence summary:
    > "A perceptron mixes your trainings using your athlete's strengths, but each opponent's stats change what matters most for that fight—strong opponents force you to counter, weak areas let you exploit!"

---

## 3) Opponent‑Aware Weights (Kid‑safe Visuals)

### 3.1 Effective Weight Calculation

**Core Concept:** Each opponent has their own strengths and weaknesses (stats). These opponent stats determine what training matters most for THIS specific fight:

-   **If opponent is STRONG at something** (high stat, e.g., great striker):

    -   You need to **counter their strength** → Focus MORE on that area
    -   Your effective weight for that stat **increases** (becomes more important)
    -   Example: Opponent is elite at Striking → You need more Striking training to compete

-   **If opponent is WEAK at something** (low stat, e.g., poor cardio):

    -   You can **exploit their weakness** → Even if you don't train much, it helps
    -   Your effective weight for that stat might stay similar or slightly decrease
    -   Example: Opponent has weak Cardio → Your Cardio training is still valuable but less critical

**Internal Formula:**

```
effective_w[i] = athlete_w[i] - opponent_stats[i]
```

Where:

-   `athlete_w[i]` = Your athlete's base strength in stat `i` (genetics/preference)
-   `opponent_stats[i]` = Opponent's ability in stat `i` (0-1 range)
-   If `opponent_stats[i]` is high → subtraction reduces effective weight less (net: higher effective weight, more important)
-   If `opponent_stats[i]` is low → subtraction reduces effective weight more (net: lower effective weight, less critical)

**Alternative interpretation (depending on implementation):**
The subtraction creates a **differential** that determines training importance:

-   High opponent stat → Small reduction → Effective weight stays high → Need to train more
-   Low opponent stat → Larger reduction → Effective weight lower → Less training needed to exploit

### 3.2 Visual Representation

-   **Born Strengths** panel shows `athlete_w` (static bars, per athlete).
-   **Opponent Stats** panel shows opponent's strengths/weaknesses visually:
    -   High bars = Opponent is strong here (you need to counter it)
    -   Low bars = Opponent is weak here (you can exploit it)
-   Never display numbers to kids; only visual bars/badges showing relative strengths.

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

**Weights vary per opponent** via opponants stats, but athlete Born Strengths stay visible and constant.

Ramps across 6 levels:each one a diffrent opponant, and each one is a bit harder than the previus

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
            "stats": {
                "striking": 0.4,
                "grappling": 0.3,
                "cardio": 0.9,
                "footwork": 0.7,
                "mindset": 0.3,
                "sleep": 0.5
            }
        },
        {
            "id": 2,
            "name": "Twisty Tia",
            "threshold": 8.6,
            "stats": {
                "striking": 0.3,
                "grappling": 0.4,
                "cardio": 0.6,
                "footwork": 0.9,
                "mindset": 0.4,
                "sleep": 0.4
            }
        },
        {
            "id": 3,
            "name": "Wall Hugo",
            "threshold": 9.0,
            "stats": {
                "striking": 0.7,
                "grappling": 0.9,
                "cardio": 0.3,
                "footwork": 0.2,
                "mindset": 0.3,
                "sleep": 0.4
            }
        },
        {
            "id": 4,
            "name": "Storm Rina",
            "threshold": 9.2,
            "stats": {
                "striking": 0.8,
                "grappling": 0.5,
                "cardio": 0.7,
                "footwork": 0.6,
                "mindset": 0.5,
                "sleep": 0.3
            }
        },
        {
            "id": 5,
            "name": "Sneak Nico",
            "threshold": 9.4,
            "stats": {
                "striking": 0.5,
                "grappling": 0.4,
                "cardio": 0.5,
                "footwork": 0.9,
                "mindset": 0.8,
                "sleep": 0.3
            }
        },
        {
            "id": 6,
            "name": "Boss Kato",
            "threshold": 9.7,
            "stats": {
                "striking": 0.8,
                "grappling": 0.9,
                "cardio": 0.8,
                "footwork": 0.6,
                "mindset": 0.7,
                "sleep": 0.5
            }
        }
    ]
}
```

> **Effective weight calculation per fight:** > `effective_w[i] = athlete.weights[i] - opponent.stats[i]`
>
> **Interpretation:**
>
> -   High opponent stat (e.g., 0.9) → Small reduction → High effective weight → You need to train MORE to counter
> -   Low opponent stat (e.g., 0.2) → Larger reduction → Lower effective weight → Less training needed (but still useful to exploit)
>
> (Optional normalization may be applied to keep scores within a kid‑tuned range.)

---

## 7) Core Algorithm (Pseudo)

```pseudo
// Inputs: sliders x[i] ∈ {0..10}, time_budget (e.g., 20)
// Athlete base weights a[i], opponent stats o[i] (0-1 range for each stat)
// Bias b ~ Uniform(bias_range)

// Calculate effective weights based on opponent stats
// High opponent stat → need to counter → effective weight stays high
// Low opponent stat → can exploit → effective weight lower
effective_w[i] = a[i] - o[i]

// Ensure non-negative weights (clip to 0 if subtraction goes negative)
for each i:
  if effective_w[i] < 0: effective_w[i] = 0

// Optional normalization to maintain difficulty curve
scale = SUM(effective_w)
if scale > 0: effective_w[i] = effective_w[i] * (K / scale)   // pick K (e.g., 3.0) to tune scores

// Enforce time budget
if SUM(x) > time_budget: clamp / auto-scale back to budget

// Calculate fight score
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
if any x[lo] is very high: tips += ["We trained " + name(lo_high) + " a lot, but it didn't help much here."]
if near_threshold: tips = ["So close! Add a small boost to " + name(best_gain)]
if very skewed and later-level flag: tips += ["Try spreading your time a bit."]
show first 2 tips
```

---

## 8) Copy (Kid‑simple)

-   **How to Play title:** "Pick. Slide. Fight!"
-   **Opponent Stats label:** "Your Opponent:"
-   **Opponent Stats description:** Show opponent's strengths/weaknesses with simple labels:
    -   High stat: "Strong at Striking!" or "Elite Grappler"
    -   Low stat: "Weak at Cardio" or "Poor Footwork"
-   **Loss tips:**
    -   "We needed a bit more **Cardio** to match them."
    -   "Too much **Striking** for this matchup—spread a little."
    -   "**Footwork** helps here more than **Mindset**."
-   **Next Opponent tooltip:** "Stuck? Try the next fight—come back later!"
-   **End screen line:** "A perceptron mixes your trainings using your athlete's strengths, but each opponent's stats change what matters most for that fight—strong opponents force you to counter, weak areas let you exploit!"

---

## 9) Art & Interaction Notes

-   Sliders: big ticks, snap feedback; emojis at ends.
-   Opponent Stats badges: glowing chips showing opponent strengths/weaknesses.
-   Short animations: 300–400 ms; confetti on WIN, dust poof on LOSS.
-   Keep screens clean: one big focal area + supporting panels.

---

## 10) Minimal Telemetry (Optional, for tuning)

-   Store per fight: athlete_id, opponent_id, sliders, result, selected tips.
-   Use to adjust thresholds and focus multipliers for fair difficulty.

---

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
│   └── OpponentStatsPanel
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

1. **Validation:** When kid adjusts sliders, check if `SUM(all slider values) > time_budget`.
2. **Clamping Method:** Proportional scaling (preserves relative training distribution):

    ```
    if SUM(sliders) > time_budget:
        scale_factor = time_budget / SUM(sliders)
        for each slider:
            slider_value = slider_value * scale_factor
    ```

3. **Allow Under-budget:** Kid can use less than the full budget (no auto-fill).
4. **Default Slider Positions:** All sliders start at `0` (blank slate).

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

**Platform:** Desktop only.

**Design System:**

-   Use **shadcn/ui** components as the base design system.
-   Represent all UI elements clearly using appropriate shadcn components:
    -   Buttons, Cards, Badges, Progress bars, Sliders, Tooltips, etc.
-   Visual design can be refined later; focus on clear representation first.
-   Ensure good contrast and readable text sizes.

**Styling & Theming Requirements:**

-   **Always use Tailwind CSS variables** (defined in `globals.css`) instead of hardcoded colors or values.
    -   Use semantic color tokens: `bg-background`, `text-foreground`, `border-border`, `text-primary`, `bg-card`, `text-muted-foreground`, etc.
    -   For opponent stats visualization:
        -   High stats (strong opponent): Use `destructive` or `chart-1` / `chart-2` variants (warm/danger colors)
        -   Low stats (weak opponent): Use `muted` or `secondary` variants (cool/neutral colors)
    -   For time budget bar states:
        -   Green: `text-green-600` → Use `text-primary` or appropriate semantic token
        -   Yellow/Orange: `text-yellow-600` → Use `text-chart-3` or `text-chart-4`
        -   Red: `text-red-600` → Use `text-destructive`
-   **Never hardcode colors** like `#FF5733`, `rgb(255, 0, 0)`, or hex values in components.
-   **Never hardcode spacing** values; use Tailwind spacing scale (`p-4`, `gap-2`, `mt-8`, etc.).
-   This ensures the entire game respects theme changes (light/dark mode) and maintains visual consistency when theme variables are updated.

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
    stats: Record<TrainingStat, number>; // opponent's abilities (0-1 range)
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

1. Show confetti animation (~1s).
2. Display "WIN!" message with celebration.
3. **Automatically unlock next opponent** (if not already unlocked).
4. **Buttons:**

    - **Next Opponent** (primary): Move to next opponent's training room
    - **Replay This Fight**: Return to same opponent with fresh sliders
    - **Back to Path**: Return to opponent selection menu

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
-   **Color States (using Tailwind variables):**
    -   **Green (default):** `used_budget ≤ 0.8 × time_budget`
        -   Use: `text-primary` or `bg-primary` (normal state)
    -   **Yellow:** `0.8 × time_budget < used_budget ≤ 0.95 × time_budget`
        -   Use: `text-chart-3` or `text-chart-4` (warning state)
    -   **Orange:** `used_budget > 0.95 × time_budget` OR any single stat uses >80% of total budget
        -   Use: `text-chart-4` or `text-chart-5` (caution state)
    -   **Red:** `used_budget > time_budget` (will clamp on Fight!)
        -   Use: `text-destructive` or `bg-destructive` (error state)
-   **Real-time Updates:** Bar updates immediately as kid drags sliders.
-   **Warning Animation:** Flash orange/red briefly when budget exceeded (using `animate-pulse` with destructive colors).

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

-   **Subtle hints:** Very light background color on sliders showing "suggested range" based on Opponent Stats.
-   **Logic:** Highlight sliders for stats where opponent is strong (you need to counter).
-   **Not predictive:** Don't show exact optimal values, just gentle guidance.
-   Only appear if kid has lost to this opponent 2+ times.

### 20.4 Born Strengths Visualization

**Bar Design:**

-   Six horizontal bars, one per training stat.
-   **Scale:** Each bar shows relative weight (normalized to max weight = full bar).
-   **Visual Distinction (using Tailwind variables):**
    -   High weight: Long, vibrant colored bar (`bg-primary` or `bg-chart-1`)
    -   Medium weight: Medium-length bar, muted color (`bg-muted` or `bg-secondary`)
    -   Low weight: Short bar, very muted/transparent (`bg-muted/50` or `opacity-50`)
-   **No Numbers:** Pure visual representation.

### 20.5 Opponent Stats Visualization

**Visual Style:**

-   **High Stat (Opponent Strong):**

    -   Use Tailwind variables: `text-destructive`, `bg-destructive/10`, or `text-chart-1` / `text-chart-2` (warm/danger colors)
    -   Glowing effect around stat bar (using `ring-destructive` or similar)
    -   Badge text: "Strong at Striking!" or "Elite Grappler"
    -   Visual cue: You need to counter this strength

-   **Low Stat (Opponent Weak):**

    -   Use Tailwind variables: `text-muted-foreground`, `bg-muted`, or `text-secondary-foreground` (cool/neutral colors)
    -   Less prominent visual treatment
    -   Badge text: "Weak at Cardio" or "Poor Footwork"
    -   Visual cue: You can exploit this weakness

**Bar Layout:**

-   Six horizontal bars, one per training stat
-   Each bar shows opponent's ability level (0-1, normalized visually)
-   High bars = opponent strong here (you need to counter)
-   Low bars = opponent weak here (you can exploit)

**Badge Layout:**

-   Show 2-3 most significant stats as badges (strongest and weakest)
-   Horizontal row or small grid
-   Each badge: icon + text describing opponent's ability
-   Icons match training stat emojis
-   **Animation:** Gentle pulse or glow effect on high stats only

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

**That's it!** You now have a tight, opponent‑aware mini‑game that keeps weights intuitive (athlete strengths) while letting each opponent's stats determine what training matters most for each fight—strong opponents force you to counter their strengths, weak opponents let you exploit their weaknesses—all without exposing math or prediction meters to the kid.

# Power Within Incremental — README (The Hope)

A fast, mobile-first incremental game built for the browser using **HTML/CSS/JS**. Manage **Energy**, convert it into **Power Level (PL)**, then **Prestige** for **Mastery Points (MP)** to unlock a single, branching skill tree. Visuals are minimal, high-contrast, and reactive.

---

## 1) Tech & Target

- **Platform:** Website (static files: HTML, CSS, JS)
- **Devices:** Mobile-first, works on desktop
- **Persistence:** `localStorage` (client-side)

---

## 2) Core Loop

1. **Charge Energy** — Hold to fill the Energy bar. Charging ramps while held.
2. **Expel Energy** — Spend Energy to gain **Power Level (PL)** via different attack profiles.
3. **Prestige** — On hitting a PL threshold, reset current run to gain **Mastery Points (MP)**.
4. **Spend MP** — Unlock skills, slots, and build modifiers in a single skill tree.
5. Repeat with higher PL targets and stronger builds.

---

## 3) Resources

- **Power Level (PL):** Main progress stat. Gates prestige thresholds and milestones. Over-leveling beyond the requirement grants extra MP on prestige.
- **Energy:** Charges over time. Expending Energy increases PL. Transformations will drain Energy while active (later layer).
- **Mastery Points (MP):** Earned from prestige and achievements. Persist across resets and can be saved for later use.

---

## 4) Abilities & Loadout

- **Passives** (toggleable): Always-on modifiers with trade-offs.
- **Techniques**: Actives on cooldown that spike charge or conversion.
- **Transformations**: High multipliers that drain Energy while active.
- **Attacks**: Different Energy-to-PL conversion profiles.

**Slots:** Passives, Techniques, and Transformations consume limited slots. Slots can be expanded via MP or specific skill nodes.

---

## 5) Skill Tree

- **One unified tree** with vibe-based branches (e.g., Fiery, Frozen, Voltaic, Brutal, Void, Ascended).
- Some branches **lock** others at the same tier to enforce distinct builds.
- Early nodes teach fundamentals; deeper nodes modify pacing, cooldowns, Energy economy, and slot counts.

---

## 6) Prestige & Mastery

- **Threshold growth:** `PL_req(k) = 100 × 2^k` where `k` is the number of prestiges completed.
- **MP gain:** `MP = floor( RunPL / PL_req(k) )` (over-leveling yields more MP).
- **Persistence:** MP and unlocked skills persist. Energy and PL reset.

---

## 7) Echoes (Late Game, WIP)

- Automation unlocks that handle routine actions (e.g., auto-charge, auto-expel, auto-tech).
- Earned late as a progression reward. Tuned to assist, not remove decisions.

---

## 8) Mobile UX

- One-handed layout with large tap targets (≥ 44px).
- **Charge:** Press-and-hold button.
- **Expel:** Tap button (optional swipe-up gesture).
- Smooth count-up animations on PL and MP.
- Subtle visual feedback for charge state and expel pulses.
- Optional reduced-effects mode for comfort and battery.

---

## 9) Balance Blueprint (Initial Targets)

**Energy**
- Base Cap: **100**
- Base Charge Rate: **1.0 /s**
- Hold Ramp: `charge_mult(t) = 1 + 0.6 × min(t, 3)` → caps at **2.8×** after ~3s continuous hold

**Expel → PL**
- Conversion: `PL_gain = spent_energy × attack_mult × global_PL_mult`
- `global_PL_mult` starts at **1.0**
- Ensure every valid expel grants at least **1 PL** after rounding

**Prestige**
- Threshold: `PL_req(k) = 100 × 2^k`
- MP gain: `floor( RunPL / PL_req(k) )`

**Slots**
- Passive slots: **1** base → +1 costs **3 MP**, second +1 costs **5 MP**
- Technique slot +1: **5 MP**
- Transformation slot unlock: **10 MP spent total** (or a node)

---

## 10) Early Content (for data tables)

### Attacks (Expel Methods)
| ID | Name     | Cost of Cap | Attack Mult | Cooldown | Intent                         |
|----|----------|-------------|-------------|----------|--------------------------------|
| A1 | Jab      | 0.20        | 1.0         | 0.0 s    | Baseline, no CD                |
| A2 | Burst    | 0.50        | 2.8         | 3.0 s    | Efficient burst                |
| A3 | Beam     | 0.85        | 5.0         | 8.0 s    | Big payoff                     |
| A4 | Dump All | 1.00 (all)  | 6.5         | 12.0 s   | Panic button / prestige pusher |

### Techniques (Actives)
| ID | Name       | Effect                                  | Duration | Cooldown |
|----|------------|------------------------------------------|----------|----------|
| T1 | Overclock  | Charge rate ×3, ignores hold-ramp cap    | 5 s      | 25 s     |
| T2 | Surge      | Instantly gain **30%** of cap as Energy  | —        | 35 s     |
| T3 | Focus Cast | Next attack gets **+60%** PL gain        | 6 s      | 30 s     |

### Transformations (Toggles; drain while active)
| ID | Name       | Effect                      | Drain (/s) | Deactivate |
|----|------------|-----------------------------|------------|------------|
| X1 | Awakened   | Global PL ×2                | 2          | Energy ≤ 0 |
| X2 | Storm Form | Techniques usable twice     | 3          | Energy ≤ 0 |
| X3 | Void Sync  | Conversion +80%, cap −20%   | 2.5        | Energy ≤ 0 |

### Passives (Toggleable)
| ID | Name          | Effect                          |
|----|---------------|---------------------------------|
| P1 | Burning Heart | +15% PL; −10% charge rate       |
| P2 | Still Core    | +25% cap; −10% PL               |
| P3 | Spark Pulse   | +20% charge rate                |

### Achievements (MP Rewards)
- First Charge (**+1 MP**)
- First Expel (**+1 MP**)
- Reach **100 PL** (**+1 MP**)
- Reach **1,000 PL** (**+2 MP**)
- Fill Energy to Cap (**+1 MP**)
- First Prestige (**0 MP**, tutorial flag)

Keep early MP earnable ≈ **8–12** to unlock one or two slots and a branch pick.

---

## 11) Pacing Targets (First Hour)

- **0–2 min:** Learn charge/expel; first achievement; see PL move.
- **2–5 min:** First prestige around **100 PL**; earn **1 MP**; buy first passive.
- **5–20 min:** Unlock **1 technique** and **1 transformation**; reach next threshold (~**200 PL**).
- **By 60 min:** 3–5 prestiges; **10–15 MP** spent; a clear build identity.

---

## 12) Anti-Friction Rules

- If expel fires, award **≥ 1 PL** after rounding.
- Hold-ramp cap ≈ **3×** to prevent runaway charge.
- Cooldowns have a minimum **2 s** (except the basic attack).
- Transformations auto-deactivate at **0 Energy** and apply a **3 s lockout** to prevent flicker.

---

## 13) Telemetry to Track (Client-Side)

Display on a hidden debug panel:

- Time to first prestige
- Average charge duration per cycle
- Energy at expel (% of cap)
- PL gained per minute
- MP gained per run
- Most used attack / technique

**Targets**
- First prestige ≤ **5 min**
- Avg. expel energy **30–60%** of cap
- PL/min rises **10–30%** per prestige early

---

## 14) Tuning Loop (Playtest Checklist)

1. Fresh save to first prestige. If >5 min, raise charge rate to **1.2** or lower PL req to **75**.  
2. If players only use Dump All, buff Burst to **×3.2** and reduce CD to **2.5 s**.  
3. If transformations stay off, reduce drains by **0.5/s** or add a small baseline **+10% PL** to make them worth testing.  
4. If Spark Pulse dominates, buff an alternative (e.g., Burning Heart → **+18% PL**) instead of nerfing.  
5. If MP snowballs, change MP to `floor((PL/req)^0.9)`.

---

## 15) Data-Driven Content (Schema Example)

Store balancing in JSON (or a JS object) to tune without touching logic:

```json
{
  "prestige": { "base_req": 100, "growth": 2, "mp_formula": "floor(pl/req)" },
  "attacks": [
    {"id":"jab","cost_cap":0.2,"mult":1.0,"cd":0},
    {"id":"burst","cost_cap":0.5,"mult":3.2,"cd":2.5},
    {"id":"beam","cost_cap":0.85,"mult":5.0,"cd":8},
    {"id":"dump","cost_cap":1.0,"mult":6.5,"cd":12}
  ],
  "techniques":[
    {"id":"overclock","dur":5,"cd":25,"effect":"charge_x3"},
    {"id":"surge","cd":35,"effect":"energy_plus_0.3cap"},
    {"id":"focus","dur":6,"cd":30,"effect":"next_attack_plus_0.6"}
  ],
  "transformations":[
    {"id":"awakened","pl_x":2,"drain":2},
    {"id":"storm","double_tech":true,"drain":3},
    {"id":"void","conv_plus":0.8,"cap_minus":0.2,"drain":2.5}
  ],
  "passives":[
    {"id":"burning","+pl":0.18,"-charge":0.10},
    {"id":"still","+cap":0.25,"-pl":0.10},
    {"id":"spark","+charge":0.20}
  ],
  "slots":{"passive_base":1,"passive_plus_costs":[3,5],"tech_plus_cost":5,"x_slot_cost":10}
}

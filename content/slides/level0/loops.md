## Doing it once vs doing it again

Print the numbers 1 to 5 — the obvious way:

```cpp
cout << 1 << ' ';
cout << 2 << ' ';
cout << 3 << ' ';
cout << 4 << ' ';
cout << 5 << ' ';
```

Five statements. Now print 1 to 1000.

Hand-written statements stop scaling the moment the count grows. That is the problem **loops** solve.

---

## Two kinds of repetition

Think about it in human words:

- "Do 10 push-ups." — you know the **count**
- "Walk until you reach the door." — you **don't know when** — you keep going until a condition changes
- "Try it once; if it fails, try again." — you must do it **at least once**

C++ has a loop for each kind of repetition:

| Human plan | C++ loop |
|------------|----------|
| repeat a known count | `for` |
| keep going until something changes | `while` |
| run the body once, then keep going | `do-while` |

---

## Every loop has four parts

Every loop you will ever write has the same four parts:

1. **start** — where it begins
2. **condition** — keep going while it is true
3. **step** — what moves toward the end
4. **body** — the work repeated on each pass

That is the whole theory of loops. Everything else is syntax that names these four parts.

If you cannot name all four parts of a loop, you cannot trust the loop.

---

## Init, stop, and step — the engine of a for loop

Every `for` loop lives on three choices — the most important parts of the loop:

1. **Initialization** — where it starts: `int i = 0`
2. **Condition** — until when it keeps going: `i < n`, so it stops the moment the condition is false
3. **Step** — how far it moves each pass: `i++` adds 1 every time

```cpp
for (int i = 0; i < n; i++) {     // [!]
    // start at:      i = 0       // [!]
    // keep going:    while i < n // [!]
    // step forward:  i++         // [!]
}
```

The three decide everything about the loop:

- `i` visits `0, 1, 2, …, n − 1`
- so the body runs exactly **n** times
- change any of the three and the whole loop changes — where it starts, when it stops, how many passes there are

---

## Be the computer: trace it

A trace table is you pretending to be the CPU, one row per pass.

```cpp
for (int i = 0; i < 3; i++) {
    cout << i << ' ';
}
```

| pass | `i` before body | `i < 3`? | prints |
|------|-----------------|---------|--------|
| 1 | 0 | yes | `0` |
| 2 | 1 | yes | `1` |
| 3 | 2 | yes | `2` |
| 4 | 3 | **no** | — loop ends — |

Trace every loop by hand before you run it. That habit is most of debugging, done in advance.

---

## The counting loop

The single most typed loop in competitive programming:

```cpp
for (int i = 0; i < n; i++) {
    // body
}
```

Read it out loud: *"i starts at 0; while i is less than n, run the body; then add 1 to i."*

- It runs the body exactly **n** times, with `i = 0, 1, 2, …, n − 1`.
- CP counts from 0 on purpose — arrays index from 0, as the next topic will show.

---

## Predict the pass count

Predict the three outputs before pressing next.

```cpp
#include <iostream>
using namespace std;
int main() {
    int a = 0;
    for (int i = 0; i < 5; i++) a += 1;           // [!]
    cout << a << '\n';   // 5, i = 0..4        // [!]

    int b = 0;
    for (int i = 0; i <= 5; i++) b++;          // [!]
    cout << b << '\n';   // 6 — <= keeps 5 too // [!]

    int c = 0;
    for (int i = 0; i < 0; i++) c++;           // [!]
    cout << c << '\n';   // 0 — fails first    // [!]
}
```

The condition is checked **before** the body — so a loop can run zero times. That is normal, not a crash.

---

## Read n values — the pattern

Contest input arrives as a count, then that many numbers. Read it with one loop.

```cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;                      // [!]
    long long sum = 0;
    for (int i = 0; i < n; i++) {  // [!]
        int x;
        cin >> x;                  // [!]
        sum += x;                  // [!]
    }
    cout << sum;
}
```

- The loop body runs once per input value — read `x`, fold it into `sum`.
- `sum` is the **accumulator**: it collects every value it sees.
- `long long` — sums overflow `int` faster than you expect.

---


## while — keep going until the condition changes

`while` checks the condition **before** the body, every pass:

```cpp
while (condition) {
    body
}
```

```cpp
int x = 5;
while (x > 0) {        // [!]
    cout << x << ' ';  // [!]
    x--;               // [!]   the step
}
```

Prints `5 4 3 2 1`.

- `x--` is the **step** — it moves `x` toward 0. Remove it and the loop never ends.
- Zero passes is normal here too: if `x` starts at 0, nothing prints. The condition `x > 0` tells you exactly where it stops.

---

## The same loop, two spellings

`for` and `while` are one machine — `for` just groups three parts in one place.

```cpp
int i = 0;                // start
while (i < n) {           // condition
    cout << i << ' ';     // body
    i++;                  // step
}
```

does exactly this:

```cpp
for (int i = 0; i < n; i++) {
    cout << i << ' ';
}
```

Both print `0 1 2 … n − 1`.

`for` wins when the three parts fit on one line — you see the whole promise at once. `while` wins when you do not yet know the count.

---

## The digit loop

The first loop that feels like real programming. A number is a pile of digits.

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 253;
    while (x > 0) {             // [!]
        int d = x % 10;         // [!]   last digit (topic 1)
        cout << d << ' ';       // [!]
        x /= 10;                // [!]   progress: drop the digit
    }
}
```

- `x % 10` peels the **last digit** — hello again, topic 1.
- `x /= 10` is the **step**. Watch it: `x` shrinks every pass, so the condition `x > 0` is guaranteed to end the loop. You know *why* this loop terminates.

---

## Break

> Stretch. Breathe. Drink some water.

Next up: `do-while` — and why it exists at all.

---

## do-while — the body always runs once

`do-while` checks the condition **after** the body:

```cpp
do {
    body
} while (condition);     // [!]   note the semicolon
```

- The body always runs at least once.
- The `;` after `while (...)` is required — this is the one loop whose `while` ends with a semicolon.

Difference in one sentence: `while` asks before, `do-while` acts before asking.

---

## Predict: condition false from the start

Same condition, two loops. Predict what prints.

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 0;

    while (x > 0) {            // [!]
        cout << "while! ";
    }
    // answer: not printed     // [!]

    do {
        cout << "do-while! ";  // [!]
    } while (x > 0);
    // answer: printed once    // [!]
}
```

- `while` prints **nothing** — the condition was already false.
- `do-while` prints **once** — the body ran before the condition had a say.

That guaranteed single pass is the entire difference between the two loops.

---

## break — leave the loop now

`break` ends the loop on the spot:

```cpp
for (int i = 0; i < 10; i++) {
    if (i == 5) break;        // [!]
    cout << i << ' ';
}
```

Prints `0 1 2 3 4`, then stops at 5 — it does **not** run to 10.

Use it when you have found the answer and continuing is wasted work. "Search until found, then stop."

---

## continue — skip this pass

`continue` skips the rest of this pass and jumps to the next one:

```cpp
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;     // [!]
    cout << i << ' ';
}
```

Prints `0 1 2 4` — pass 3 is skipped, the loop itself keeps going.

`break` stops the loop. `continue` skips one pass. Caution: code full of `continue` hides the shape of the loop — a clean condition beats a sprinkle of skips.

---

## Loops inside loops

A loop's body can hold another loop. The inner loop runs fully for **every** outer pass.

```cpp
for (int i = 0; i < 3; i++) {      // [!]   outer
    for (int j = 0; j < 2; j++)    // [!]   inner
        cout << i << j << ' ';     // [!]
}                                  // [!]
```

Think rows and columns — outer picks the row, inner walks across it:

```
00 01 10 11 20 21
```

Read it a pause at a time: `i = 0` prints `00 01`, `i = 1` prints `10 11`, `i = 2` prints `20 21`. The inner loop resets `j` to 0 on every outer pass — that is the whole dance.

---


## Pattern: sum and count

Two shapes you will reuse every session:

```cpp
long long sum = 0;
for (int i = 1; i <= n; i++) sum += i;       // sum of 1..n  // [!]

int cnt = 0;
for (int i = 1; i <= n; i++)
    if (n % i == 0) cnt++;                   // count divisors // [!]
```

- Both are a **counter** updated inside the body — only the update differs (`sum += i` vs `cnt++`).
- `long long`: `1..n` overflows `int` once `n` passes ~65,000. Topic 1's table warned you.

---

## Pattern: best so far

Max or min while scanning — keep a champion.

```cpp
#include <iostream>
using namespace std;
int main() {
    int n; cin >> n;
    int best; cin >> best;               // [!]   seed with the first value
    for (int i = 1; i < n; i++) {        // [!]
        int x; cin >> x;
        if (x > best) best = x;          // [!]   beat the champion
    }
    cout << best;
}
```

- Seed `best` with the **first** value — never `0`. The input may be negative, and then 0 would win forever.
- Every new value either beats the champion or is ignored. Tournament logic, nothing more.

---

## Pattern: reverse a number

The digit loop, upside down — build a new number as you peel old digits.

```cpp
#include <iostream>
using namespace std;
int main() {
    int x = 253, rev = 0;
    while (x > 0) {                 // [!]
        rev = rev * 10 + (x % 10);  // [!]   push the last digit onto rev
        x /= 10;                    // [!]
    }
    cout << rev << '\n';
    // answer: 352                  // [!]
}
```

- Same loop as the digit printer — but each digit is *pushed* onto `rev` instead of printed.
- `rev = rev * 10 + d` grows the number to the left. This "build a value" shape returns in binary conversion.

---

## Pattern: until a condition

When the count is unknown, `while` does the counting for you.

```cpp
int steps = 0;
while (x > 1) {            // [!]
    x /= 2;                // [!]   progress
    steps++;               // [!]
}
```

"How many halves until x drops below 2?" — no `for` knows that in advance.

Every pass halves `x`, so the condition `x > 1` is guaranteed to become false — the step is what ends it.

`for` is "I know how many times". `while` is "I know when to stop".

---

## Which loop do I choose?

Three situations, three answers:

| Situation | Loop |
|-----------|------|
| I know the number of times | `for` |
| I know the stopping condition, not the count | `while` |
| The body must run once before checking | `do-while` |

Half of every loop decision is knowing you are in one of these three rows.

In a real contest, about 9 loops out of 10 are `for`. `while` is for "until" problems. `do-while` is the rare, deliberate choice.

---


## Off-by-one and the boundary

The difference between right and wrong is often one character:

```cpp
for (int i = 0; i <= n; i++)   // n + 1 passes — usually one too many
for (int i = 0; i < n; i++)    // exactly n passes — the default
for (int i = 1; i <= n; i++)   // exactly n passes — when you want 1..n
```

```cpp
for (int i = 0; i < n; i++) {       // [!]
    cout << (i + 1) << ' ';         // [!]   1..n with a 0-based loop
}
```

Have a check ritual before submitting: the **first** pass, the **last** pass, and `n = 0`. Get those three right and the middle takes care of itself.

---

## Loop variable scope and overflow

Two silent killers.

```cpp
for (int i = 0; i < n; i++) { /* body */ }
cout << i;                      // [!]   error: i died with the loop
```

`i` declared inside `for (…)` lives only inside the loop. Declare it before if you need it after.

---

## Quick check — predict, then I show you

The whole toolbox in one loop. Predict the output.

```cpp
#include <iostream>
using namespace std;
int main() {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) continue;
        total += i;
    }
    cout << total;                     // [!]
    // answer: 9 — add 1, skip 2, add 3, skip 4, add 5   // [!]
}
```

Trace it aloud: `continue` skips even `i`, so only 1, 3, 5 reach `total`.

---
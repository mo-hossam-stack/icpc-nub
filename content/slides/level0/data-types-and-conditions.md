# Data Types & Conditions

> One human problem, taken apart until you can see every step between your thought and the judge's verdict.

---

## The problem: two numbers

Read two numbers and print their product:

Inside your head it happens in steps:

1. Your eyes see `3` 
2. Your eyes see `5` 
3. Your brain runs a **mechanism** you learned as a child: multiplication
4. Your brain **says** the result: `15`

A computer has no brain to fill the gaps. Every one of those steps must be spelled out.

---

## From human idea to algorithm

A machine needs the recipe written down:

- **Problem** — what you were asked
- **Algorithm** — a precise, step-by-step recipe that solves it, in any language
- **Code** — that recipe written in any programming language

---

## Computers only understand 0 and 1

A circuit has two states: OFF → `0`, ON → `1`. One such digit is a **bit**.

Everything inside the machine is made of bits — numbers, text, and **instructions** too:

```
'read'  →  01110010 01100101 01100001 01100100
```

Even the instruction "read" is just a number to the computer.

---

## Typing 0s and 1s is not an option

Writing instructions by hand would look like this:

```
01110010 01100101 01100001 01100100  ...
```

Slow, unreadable, and one wrong bit breaks everything.

So we invented **languages** that look like English — `cout<<"Hello, World!";` instead of a row of bits.

---

## The compiler translates

The CPU only takes 0s and 1s, so our words must be translated. A program called the **compiler** does exactly that:

```
cout << "Hello, World!";   →   01100001 01100010 01100011 ...
```

- One line becomes **many** machine instructions.
- That translation is the only reason we never type bits ourselves.
- Every language has a compiler (or an interpreter) behind it.

---

## The CPU runs the instructions

The **CPU** is the brain of the computer.

- It **fetches** one instruction, **executes** it, then goes to the next.
- It works on the bits in memory.
- Fast or slow, correct or wrong, it does exactly what the bits say.

---

## The IDE is where we type

The **IDE** is the editor you write code in:

- colors the code and shows mistakes as you type
- runs the compiler for you
- runs the finished program

examples:
    VS Code, CLion, CodeBlocks.
---

## What happens when you press Run

1. You write **source code** (C++)
2. The **compiler** translates it into machine code (0s and 1s)
3. The **CPU** executes it → your program's output

No magic black box. Every step has a name.

---

## The three tools

| Term | What it is |
|------|-----------|
| C++ | The language you write in |
| Compiler | Translates it into machine code |
| CPU | Executes the machine code |
| IDE (VS Code, CLion, CodeBlocks) | The editor that runs the compiler for you |

The Run button just chains these for you — now you know what it does.

---

## Why C++ for competitive programming

| Language | Speed | Typing effort | In competitive programming |
|----------|-------|---------------|---------------------------|
| C++ | fastest | more | the standard; allowed everywhere; |
| Python | slow | least | fine for tiny limits, times out on big ones |
| Java | fast | most | allowed, but slower to write |


---

## Your first program

```cpp
#include <iostream>
using namespace std;            // [!]

int main() {                    // [!]
    cout << "Hello, ICPC NUB";  // [!]
}
```

- `#include <iostream>` — brings in input/output tools.
- `using namespace std;` — lets us write `cout` instead of `std::cout` (next slide).
- `int main()` — execution starts here.
- `{ }` — a block of code. `;` — ends a statement.

---

## using namespace std;

Every standard name lives in a namespace called `std`:

```cpp
#include <iostream>
int main() {
    std::cout << "Hello";
    std::cout << 5 + 3;
}
```

- `std::` is the full name. `using namespace std;` lets us drop it.
- **The problem:** it pulls *every* std name into scope.

---

## Reading input — cin

```cpp
#include <iostream>
using namespace std;

int main() {
    string name;               // [!]
    cin >> name;               // [!]
    cout << "Hello, " << name;
}
```

- `cin >> var` reads one token — it skips spaces and newlines.
- Input becomes **values sitting in memory** — the storage you declared gets filled.

---

## Printing — cout and newlines

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello\n";   // [!]
    cout << "World";     // [!]
}
```

Output is **exact**:

- `YES` ≠ `Yes` ≠ `yes`
- spaces and capital letters matter — the judge compares character by character

---

## A × B, complete

```cpp
#include <iostream>
using namespace std;

int main() {
    int A, B;                // [!]
    cin >> A >> B;           // [!]
    int answer = A * B;
    cout << answer;          // [!]
}
```

Trace the input `3 5` before running anything:

1. `int A, B;` — storage reserved for two integers
2. `cin >> A >> B;` — A gets `3`, B gets `5`
3. `int answer = A * B;` — answer gets `15`
4. `cout << answer;` — prints `15`

---

## Push A × B until it breaks

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;                // [!]
    cin >> a >> b;           // [!]
    cout << a * b;           // [!]
}
```

Predict first, then check:

- Input `12 5` → `60`. Fine.
- Input `100000 100000` → `10000000000`. Does `int` have a pattern for that?
- Input `1000000000 1000000000` → `10¹⁸`. Certainly not.

**Why can't the computer just store any number it is given?**

---

## Variables are storage

```cpp
int age = 20;
```

means roughly:

> Give me a piece of storage large enough for an `int`, call it `age`, and put `20` there.

```
name      address      value
age       0x1000       20
```

A variable is a **name for a place where a value lives**.

---

## Declaration and assignment

```cpp
#include <iostream>
using namespace std;

int main() {
    int age;          // declaration: reserve storage // [!]
    age = 20;         // assignment: put a value in // [!]
    int score = 100;  // both at once // [!]
    cout << age << ' ' << score;
}
```

- **Declaration** creates the storage and names it.
- **Assignment** puts a value into existing storage.
- `int age = 20;` does both in one line.

`age = age + 5` is not math — it is a recipe: **read** the old value → **compute** → **store** the result back.

---

## The data types

| Type | Bytes | Holds | Use it for |
|------|-------|-------|-----------|
| `short` | 2 | −32,768 … 32,767 | rarely — the extra range is not worth it |
| `int` | 4 | about ±2.1×10⁹ | the default integer |
| `long long` | 8 | about ±9.2×10¹⁸ | big values and big products |
| `unsigned int` | 4 | 0 … about 4.3×10⁹ | no negatives — easy to get wrong |
| `float` | 4 | ~7 digits, not exact | avoid |
| `double` | 8 | ~15 digits, not exact | decimals when the problem needs them |
| `char` | 1 | one character (a number) | characters |
| `bool` | 1 | `true` / `false` | facts |
| `string` | — | text | words |

Sizes are typical on a judge. `long` is platform-dependent, so in competitive programming we write `long long`.

---

## A byte is 8 bits

Storage is counted in **bytes**, and one byte is **8 bits**:

```
1 byte    = 8 bits
int       = 4 bytes = 32 bits = 2³² patterns
long long = 8 bytes = 64 bits = 2⁶⁴ patterns
```

A fixed number of bytes gives a **fixed range** — that is the "problem" behind our A × B break.

```
00000000 00000000 00000000 00000101   →   5
```

---

## Why ~2 billion

Half the patterns are negative, half are non-negative (the exact convention is a lesson of its own — *numbers in memory*).

```
2³² / 2 = 2³¹ = 2,147,483,648 patterns per side
```

So `int` spans **-2,147,483,648 … 2,147,483,647** — about ±2.1 × 10⁹.

`long long` gets **64 bits** → about ±9.2 × 10¹⁸.

`2147483647` is not trivia you memorize — you **derived** it.

---

## Integer overflow

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 100000;      // [!]
    int b = 100000;
    int c = a * b;       // 10000000000 needs 34 bits // [!]
    cout << c;           // 1410065408 — not an error
}
```

`10⁵ × 10⁵ = 10¹⁰`, but `int` only has patterns for ±2×10⁹.

The result **wraps around** — no crash, no warning, just a wrong number. This is **the #1 beginner bug**, and it ends as a silent WA.

---

## Fix it with long long

```cpp
#include <iostream>
using namespace std;

int main() {
    long long a = 100000;    // [!]
    long long b = 100000;
    long long c = a * b;     // 10000000000
    cout << c;               // correct
}
```

Rule: if a value **or any intermediate result** can exceed ±2×10⁹, use `long long`.

But watch this:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 100000;              // [!]
    int b = 100000;
    long long c = a * b;         // did long long save us? // [!]
    cout << c;                   // NO — still wrong
}
```

`a * b` is evaluated **before** the assignment to `c`, as `int × int`.

The habit: **ask what type this expression is evaluated as.** Decide the types before you type — from the constraints.

---

## Constraints choose your types

A real problem statement hands you this:

```text
1 ≤ T ≤ 100
1 ≤ n ≤ 10^5
1 ≤ a[i] ≤ 10^9
the answer is at most 10^18
```

| Constraint | What it tells you |
|------------|-------------------|
| values ≤ 2×10⁹ | `int` is enough |
| values ≤ 9×10¹⁸ | `long long` — including intermediate products |
| n ≤ 100 | almost any approach works |
| n ≤ 10⁵ | some approaches are too slow — a later lesson |

Constraints are not decoration: they tell you **which types and which solutions are even possible**.

---

## char is a number

```cpp
#include <iostream>
using namespace std;

int main() {
    char c = 'A';        // [!]
    cout << c << '\n';   // A
    c = c + 1;           // [!]
    cout << c << '\n';   // B
}
```

Computers have no magical `A` object — a character **is a number**:

- `'A'` = 65, `'B'` = 66, `'a'` = 97 (the ASCII table)
- `c + 1` is arithmetic on numbers → `66` → printed back as `'B'`
- `char('0' + 3)` gives `'3'` — how digits become text
- `'a'` (a character) is not `"a"` (text of length 1)

---

## Doubles are not exact

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << (0.1 + 0.2 == 0.3) << '\n';   // predict: 1 // [!]
}
```

It prints **`0`**. The math says true; the machine says false.

Not every mathematical number can be represented exactly by every storage format (binary fractions — a later lesson).

Level-0 rule: **prefer integers** (`long long`) whenever the problem allows it.

---

## Division and modulus

Two questions come up constantly: *is n even?* and *what is the last digit?*

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 7 / 2   << '\n';   // 3 — truncates // [!]
    cout << 7 % 2   << '\n';   // 1 — remainder
    cout << -7 / 2  << '\n';   // -3 — toward zero // [!]
    cout << -7 % 2  << '\n';   // -1 — not 1!
}
```

- `/` between integers drops the fraction: `7 / 2` is `3`, not `3.5`.
- `%` gives the remainder: `a = q·k + r`.
- Negative numbers truncate **toward zero** — do not assume `-7 % 2` is `1`.

---

## What % is for

1. **Last digit** — `x % 10`
2. **Even / odd** — `x % 2 == 0` (even), `x % 2 != 0` (odd)
3. **Divisible by k** — `x % k == 0`

You will reuse these constantly.

---

## Expressions produce values

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 7;                    // [!]
    cout << x + 5 << '\n';   // 12 // [!]
    cout << x * x << '\n';   // 49 // [!]
    cout << (x > 10) << '\n'; // 0 — a fact
}
```

An **expression** is values in → operation → a new value out:

- `x + 5` produces an integer
- `x > 10` produces a **fact** (`true` / `false`)

Point at any piece of code and ask: **what value does this produce?**

---

## Statement or expression

- `x + 5` — an **expression**: it produces a value.
- `x = x + 5;` — a **statement**: it *does* something — it stores.
- `cout << x;` — a statement: it prints.

The point is not the terminology — it is the habit:

> **What value does this piece of code produce?**

Asking that question is how you stop guessing.

---

## Comparisons produce facts

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;                 // [!]
    cout << (x > 3)  << '\n';  // 1 // [!]
    cout << (x == 5) << '\n';  // 1
    cout << (x != 5) << '\n';  // 0
}
```

The result is **not a number and not text** — it is a fact. Its type is `bool`:

| Type | Holds | Watch out |
|------|-------|-----------|
| `bool` | `true` / `false` | prints as `1` / `0` |

Comparisons: `> >= < <= == !=`. Wrap them in parentheses when you print them.

---

## = assigns, == compares

Golden rule: `=` assigns, `==` compares.

Two traps:

- `if (x = 5)` — this **assigns** 5, and the condition is always true. Your compiler warns you.
- Chained comparisons do not work:

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = -100;                        // [!]
    cout << (0 < x && x < 10) << '\n';   // 0 — correct // [!]
    cout << (0 < x < 10)     << '\n';   // 1 — WRONG, and it compiled // [!]
}
```

C++ reads left to right: `(0 < x)` becomes `0`, then `0 < 10` is `true`. Never chain — use `&&`.

---

## Combining facts — && || !

| Operator | Reads as | Example |
|----------|----------|---------|
| `&&` | and | `x > 0 && x < 10` |
| `\|\|` | or | `x == 0 \|\| x == 1` |
| `!` | not | `!(x == 5)` is the same as `x != 5` |

Translate the English condition into small facts, then combine them.

- **Short-circuit:** in `b != 0 && a / b > 1`, if `b == 0` the second half **never runs**.
- `&&` binds tighter than `||` — when in doubt, **parenthesize**.

---

## Decisions — if

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;    // [!]
    if (x > 0) {        // [!]
        cout << "Positive";
    }
}
```

The condition is an expression that produces a fact:

- true → the body runs
- false → the body is skipped entirely

---

## Two cases — if / else

```cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;         // [!]
    if (n % 2 == 0) {
        cout << "Even";      // [!]
    } else {
        cout << "Odd";       // [!]
    }
}
```

Exactly one of the two branches runs — the same fact that made `%` worth learning.

---

## Many cases — else if

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                    // [!]
    if (x < 100) cout << "small";
    else if (x < 50) cout << "tiny";    // [!]
    else cout << "large";
}
```

What does `x = 10` print? **`small`** — so the `tiny` branch can never run. The first true branch wins; the rest are skipped.

The fix: check the **most specific** range first.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                    // [!]
    if (x < 50) cout << "tiny";
    else if (x < 100) cout << "small";
    else cout << "large";
}
```

---

## Always use braces

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;
    if (x > 0)               // [!]
        cout << "big\n";
    cout << "done\n";        // runs no matter what // [!]
}
```

Without `{ }`, only the **next single line** is guarded — `cout << "done"` runs regardless of `x`.

Habit: **braces always**, even for one line. It also prevents the classic dangling-else bug.

---

## Back to A and B

The human question: *"is A larger than B?"*

```cpp
#include <iostream>
using namespace std;

int main() {
    int A, B;                    // [!]
    cin >> A >> B;
    if (A > B) {                 // [!]
        cout << "A is larger";
    } else {                     // [!]
        cout << "B is larger or equal";
    }
}
```

The whole session in one program: a **human question** → an **expression** → a **fact** → **execution controlled by that fact**.

---

## Tracing

**Tracing** = running your code in your head, step by step.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;     // [!]
    x = x + 2;     // [!]
    x = x * 3;     // [!]
    cout << x;     // [!]
}
```

Trace: `5 → 7 → 21`. Output: `21`.

- Do it **before** you run anything.
- After a WA, trace until you find the exact line where your mental model and the program disagree.

---

## Edge cases

Test the **borders of the constraints** — that is where bugs live:

- the smallest input (`0`, `1`)
- negatives
- the largest allowed values (near `2·10⁹`, near the constraint max)
- all values equal
- output that must match **exactly** (`YES` vs `yes`)

Ask: *what does my program do at the edge?*

---

## The verdicts

You submit to an online judge. It runs hidden tests and returns a verdict:

| Verdict | Meaning |
|---------|---------|
| AC | Accepted — all tests passed |
| WA | Wrong answer — your output differs |
| TLE | Time limit — too slow |
| MLE | Memory limit — too much memory |
| CE | Compilation error — the code never ran |
| RE | Runtime error — it ran, then crashed |

---

## Reading a verdict as evidence

Don't change code randomly. The verdict is **evidence**:

- **CE** → what can't the compiler understand?
- **RE** → what can go wrong while running?
- **WA** → which test case proves my logic is wrong? Trace it.
- **TLE** → is my approach too slow?
- **AC** → do I actually know *why* it works?

Errors are feedback from the computer — not a verdict on you.

---

## The CP workflow

For every problem:

1. Read it. Understand the input and the output.
2. Work through the examples.
3. Find the algorithm — think first.
4. **Check the constraints.**
5. Choose data types that cannot overflow.
6. Write the code.
7. Trace it on edge cases.
8. Submit, read the verdict, debug, learn.

---

## The four questions

Before typing anything:

1. What do I **know**? (input)
2. What do I **need**? (output)
3. What are the **constraints**? (limits)
4. What **connects** them? (algorithm)

The better you understand the problem, the less guessing you do while coding. Rule #1: **understand before coding.**

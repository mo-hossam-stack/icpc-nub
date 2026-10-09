## The problem: two numbers

Read two numbers and print their product:

Inside your head it happens in steps:

1. Your eyes see `3` 
2. Your eyes see `5` 
3. Your brain runs a **mechanism** you learned as a child: multiplication
4. Your brain **says** the result: `15`

---

## From human idea to algorithm

A machine needs the what to be written down:

- **Problem** — what you were asked
- **Algorithm** — a precise, step-by-step instruction that solves it, in any language
- **Code** — logic, written into life.

---

## Computers only understand 0 and 1

A circuit has two states: OFF → `0`, ON → `1`. Each state represents one binary digit, called a **bit**.

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

So we invented **programming languages** that look like English  `if (score >= 50) cout << "You passed!"; ` instead of a row of bits.

---

## The compiler translates

The CPU only takes 0s and 1s, so our words must be translated. A program called the **compiler** does exactly that:

```
cout << "Hello, World!";   →   01100001 01100010 01100011 ...
```

- One line becomes **many** machine instructions.
- Every language has a compiler (or an interpreter) behind it.

---

## The CPU runs the instructions

The **CPU** is the brain of the computer.

- It fetches, decodes, and executes instructions.

---

## The "IDE" is where we type

The **IDE** is the editor you write code in:

- colors the code and shows mistakes as you type
- runs the compiler for you
- runs the finished program

examples:
    VS Code, CLion, CodeBlocks.
---

## What happens when you press Run

1. You write **source code**
2. The **compiler** translates it into machine code (0s and 1s)
3. The **CPU** executes it → your program's output


---

## The three tools

| Term | What it is |
|------|-----------|
| C++ | The language you write in |
| Compiler | Translates it into machine code |
| CPU | Executes the machine code |
| IDE (VS Code, CLion, CodeBlocks) | The editor that runs the compiler for you |


---

## Why C++?

- Python — Easy to write, but can be slow.
- C — No built-in STL.
- C# — Less common in competitive programming.
- Java — Powerful, but more verbose.
- **C++ — Fast, powerful, and built for problem solving.**


---

## Your first program

```cpp
#include <iostream>             // [!]
using namespace std;            // [!]

            int main() {                    
            cout << "Hello, ICPC NUB";  
   }
```

- `#include <iostream>` — brings in input/output tools.
- `using namespace std;` — lets us write `cout` instead of `std::cout` (next slide).
- `int main()` — execution starts here.
- `{ }` — a block of code. `;` — ends a statement.

---

## using namespace std;


```cpp
#include <iostream>
int main() {
    std::cout << "Hello";
    std::cout << 5 + 3;
}
```

---

## The data types

| Type | Bytes | Holds | Use it for |
|------|-------|-------|-----------|
| `int` | 4(32 bits) | about ±2.1×10⁹ | the default integer |
| `long long` | 8(64 bits) | about ±9.2×10¹⁸ | big values and big products |
| `float` | 4(32 bits) | ~7 digits, not exact | avoid |
| `double` | 8(64 bits) | ~15 digits, not exact | decimals when the problem needs them |
| `char` | 1(8 bits) | one character (a number) | characters |
| `string` | — | text | words |
| `bool` | 1(8 bits) | `true` / `false` | conditions and yes/no values |

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

---

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
    cout << (x > 10) << '\n'; // 0 
}
```

---

## Statement or expression

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

The result is **not a number and not text** — it is a 0/1. Its type is `bool`:

| Type | Holds | Watch out |
|------|-------|-----------|
| `bool` | `true` / `false` | prints as `1` / `0` |


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



















###### here is the start of the next section, which is about IF in C++ using if statements.
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

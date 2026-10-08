# Data Types & Conditions

> The first program, values, decisions — and how a judge scores it.

---

## The problem

Read two numbers and print their sum. As a human you would say:

- Read A
- Read B
- Add them
- Print the answer

A computer does not understand English. It executes very precise instructions.

---

## Programming is precise thinking

Programming = turning a human idea into instructions a computer can execute.

- Human: "Give me the larger number."
- Computer: `if (A > B) return A; else return B;`

Flow: **PROBLEM → THINK → ALGORITHM → CODE → COMPUTER → ANSWER**

The keyword: **precise**.

---

## How a computer understands code

Your code: `cout << "Hello";`

The CPU does not understand C++. It only knows two states: **0** and **1** — these are called **bits**.

Bits can represent numbers, characters, instructions, addresses — everything.

---

## Why 0 and 1

Computers are electronic circuits, so we abstract physical states:

- OFF → `0`
- ON → `1`

Writing raw 0s and 1s is unreadable and error-prone. That is why we write high-level languages instead.

---

## From idea to verdict

What happens when you press Run:

1. Human idea
2. Source code (C++)
3. **Compiler** translates it
4. Machine instructions (0s and 1s)
5. CPU executes → output
6. Online judge compares your output with the expected one → **verdict**

No magic black box.

---

## Programming languages

| Language | Best known for |
|----------|----------------|
| C++ | Algorithms, speed, competitive programming |
| Python | Simple, rapid scripting |
| Java | Large applications |
| JavaScript | Web |
| Rust | Safe systems code |

We use C++: fast, and allowed almost everywhere in CP.

---

## Source code vs machine code

What you write:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, ICPC NUB";         // [!]
}
```

The computer cannot run this directly — it must be translated into machine code first.

---

## The compiler

The compiler translates C++ source into an executable program:

**Source code → Compiler → Machine code (executable)**

It also checks your code against the rules of C++. Break a rule and you get **compiler errors** — nothing runs until they are fixed.

---

## Three kinds of errors

| Kind | Appears as | Meaning |
|------|-----------|---------|
| Compilation | CE | The compiler cannot translate your code |
| Runtime | RE | It runs, then crashes (divide by zero, bad index…) |
| Logic | WA | It runs fine, but gives the wrong answer |

**WA is the most common one in competitive programming.**

---

## The development cycle

Programming is an iterative loop:

**Think → Write → Compile → Run → Test → Find problem → Fix → Repeat**

Errors are feedback from the computer — not a verdict on you.

---

## The four tools

| Term | What it is |
|------|-----------|
| C++ | The language you write in |
| Compiler  | Translates it into machine code |
| IDE (VS Code, CLion, CodeBlocks) | The editor that runs the compiler for you |
| Codeforces | An online judge that tests your program |

The Run button just chains these for you. Understand what happens behind it.

---

## Our first program

```cpp
#include <iostream>                    // [!]
using namespace std;                   // [!]

int main() {                           // [!]
    cout << "Hello, ICPC NUB";         // [!]
}                                      // [!]
```

- `main()` — execution starts here.
- `{ }` — defines a block of code.
- `;` — ends a statement. Very easy to forget.

---

## Input and output

```cpp
#include <iostream>
using namespace std;

int main() {
    string name;                       // [!]
    cin >> name;                       // [!]
    cout << "Hello, " << name;         // [!]
}
```

- `cin >> var` reads one token — it skips spaces and newlines.
- `cout << ...` prints exactly what you write.
- The judge checks exact match: spaces and capital letters matter.

---

## Newlines

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello\n";                 // [!]
    cout << "World";                   // [!]
}
```

- Output is exact: `YES` ≠ `Yes` ≠ `yes`.

---

## Variables and assignment

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 20;                      // [!]
    cout << age;                       // [!] // 20
    age = 25;                          // [!]
    cout << age;                       // [!] // 25
    age = age + 5;                     // [!]
    cout << age;                       // [!] // 30
}
```

---

## Reading two numbers

```cpp
#include <iostream>
using namespace std;

int main() {
    int A, B;                          // [!]
    cin >> A >> B;                     // [!]
    int answer = A + B;                // [!]
    cout << answer;                    // [!]
}
```


---

## Data types

| Type | Holds | Watch out |
|------|-------|-----------|
| `int` | integers, about ±2·10⁹ | overflows above that |
| `long long` | integers, about ±9·10¹⁸ | use it when unsure |
| `float` | decimals, less precise | not exact |
| `double` | decimals | not exact |
| `char` | one character | `'a'`, not `a` |
| `string` | text | `"hello"` |
| `bool` | `true` / `false` | prints as `1` / `0` |

---

## Integer overflow — the #1 beginner bug

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 100000;                    // [!]
    int b = 100000;                    // [!]
    int c = a * b;                     // [!]
    cout << c;                         // [!]
}
```

`100000 × 100000 = 10¹⁰`, but `int` stops near `2·10⁹`. The result wraps around and is **wrong** — no error, no crash.

---

## Fix it with long long

```cpp
#include <iostream>
using namespace std;

int main() {
    long long a = 100000;              // [!]
    long long b = 100000;              // [!]
    long long c = a * b;               // [!]
    cout << c;                         // [!]
}
```

Rule: if a value **or any intermediate result** can exceed `2·10⁹`, use `long long`.

---

## Division and modulus

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << (7 / 2)   << '\n';         // [!]
    cout << (7 / 2.0) << '\n';         // [!]
    cout << (7 % 2)   << '\n';         // [!]
    cout << (8 % 2)   << '\n';         // [!]
    cout << (10 % 3)  << '\n';         // [!]
}
```

Prints `3`, `3.5`, `1`, `0`, `1`.

- `/` between integers truncates: `7 / 2` is `3`, not `3.5`.
- `%` gives the remainder: `a = q·k + r`.

---

## What % is for

1. **Last digit** — `x % 10`
2. **Even / odd** — `x % 2 == 0` (even), `x % 2 != 0` (odd)
3. **Divisible by k** — `x % k == 0`

You will reuse these constantly.

---

## Comparisons and booleans

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;                         // [!]
    cout << (x > 3)  << '\n';          // [!]
    cout << (x == 5) << endl;          // [!]
    cout << (x != 5) << '\n';          // [!]
}
```

Prints `1`, `1`, `0` — comparisons yield `true` / `false`, which print as 1 / 0.

Golden rule: `=` assigns, `==` compares.

---

## Logical operators

| Operator | Reads as | Example |
|----------|----------|---------|
| `&&` | and | `x > 0 && x < 10` |
| `\|\|` | or | `x == 0 \|\| x == 1` |
| `!` | not | `!(x == 5)` is the same as `x != 5` |

Translate the English condition into small boolean questions, then combine them.

---

## Decisions — if

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                   // [!]
    if (x > 0) {                       // [!]
        cout << "Positive";            // [!]
    }                                  // [!]
}
```

Condition true → the body runs. False → it is skipped entirely.

---

## Two cases — if / else

```cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;                   // [!]
    if (n % 2 == 0) {                  // [!]
        cout << "Even";                // [!]
    } else {                           // [!]
        cout << "Odd";                 // [!]
    }                                  // [!]
}
```

Exactly one of the two branches runs.

---

## Many cases — else if

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                   // [!]
    if (x < 0) {                       // [!]
        cout << "Negative";            // [!]
    } else if (x == 0) {               // [!]
        cout << "Zero";                // [!]
    } else {                           // [!]
        cout << "Positive";            // [!]
    }                                  // [!]
}
```

Only the **first** true branch runs; the rest are skipped.

---

## Order matters — the bug

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                   // [!]
    if (x < 100) cout << "small";      // [!]
    else if (x < 50) cout << "tiny";   // [!]
    else cout << "large";              // [!]
}
```

`x = 10` prints `small` — the second branch can never run, because the first one already caught everything below 100.

---

## Order matters — the fix

```cpp
#include <iostream>
using namespace std;

int main() {
    int x; cin >> x;                   // [!]
    if (x < 50) cout << "tiny";        // [!]
    else if (x < 100) cout << "small"; // [!]
    else cout << "large";              // [!]
}
```

Check ranges from most specific to broadest.

---

## Online judges and verdicts

You submit to an online judge (Codeforces, AtCoder, …). It runs hidden tests and returns a verdict:

| Verdict | Meaning |
|---------|---------|
| AC | Accepted — all tests passed |
| WA | Wrong answer — your output differs |
| TLE | Time limit — too slow |
| MLE | Memory limit — used too much memory |
| CE | Compilation error — does not build |
| RE | Runtime error — crashed while running |

---

## How to react to a verdict

Don't change code randomly. Treat the verdict as information:

- **CE** → what can't the compiler understand?
- **RE** → what can go wrong while running?
- **WA** → which test case proves my logic is wrong?
- **TLE** → is my algorithm too slow?
- **MLE** → am I using too much memory?
- **AC** → why does this actually work?

---

## Tracing

**Tracing** = running your code in your head, step by step.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;                         // [!]
    x = x + 2;                         // [!]
    x = x * 3;                         // [!]
    cout << x;                         // [!]
}
```

Trace: `5 → 7 → 21`. Output: `21`. The cheapest way to catch a WA before you submit.

---

## The CP workflow

For every problem:

1. Read it. Understand the input and the output.
2. Work through the examples.
3. Find the algorithm — think first.
4. **Check the constraints.**
5. Choose data types that cannot overflow.
6. Write the code.
7. Test by hand on edge cases.
8. Submit, read the verdict, debug, learn.

Constraints decide which algorithms and data types are even possible — never ignore them.

---

## The core questions

Before typing anything:

1. What do I **know**? (input)
2. What do I **need**? (output)
3. what constraints are there? (limits)
4. What **connects** them? (algorithm)


Then the code writes itself. Rule #1: **understand before coding.**

---
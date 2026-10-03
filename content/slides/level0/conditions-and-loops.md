# Conditions & Loops

> Control flow is how your program decides and repeats. In C++ it is four keywords
> and a handful of rules you have to respect under contest/time pressure.

---

## 1. Output — cout

- `cout << ...` prints **exactly** what you give it.
- Spaces, capitalization and punctuation are part of the answer, **not decoration**.
- No extra spaces/newlines unless you write them.

---

## Hello, ICPC NUB

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    cout << "ICPC NUB Community";        // [!]
}
```

---

## 2. Input — cin

- `cin >> var` reads **one token at a time**.
- It skips any spaces and newlines, so input can be space- or line-separated.
- Safe for competitive/assignment input.

---

## Reading a token

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string name;                        // [!]
    cin >> name;                        // [!]
    cout << "Hello, " << name;          // [!]
}
```

---

## 3. Data types — purpose, not just syntax

| Type | What it holds | Typical range/notes |
|---|---|---|
| `int` | Whole numbers | ~ ±2e9 (safe) |
| `long long` | Whole numbers (large) | ~ ±9e18 — use when sum/product can cross 2e9 |
| `double` | Decimals (floating point) | Approximate; use for values/formatting later |
| `char` | A single character | `'A'`, digits, symbols |
| `string` | Text | Sequences of chars (tokens/lines later) |

---

## The #1 beginner bug: integer overflow

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int a = 100000;                     // [!]
    int b = 100000;                     // [!]
    int c = a * b;                      // [!]
    cout << c;                          // [!]
}
```

---

## Fix: use long long when values grow

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long a = 100000LL;             // [!]
    long long b = 100000LL;             // [!]
    long long c = a * b;                // [!]
    cout << c;                          // [!]
}
```

---

## 4. Arithmetic & the assignment trap

- Operators: `+ - * /` and assignment `=`.
- **Critical:** `=` is **assignment**, `==` is **equality comparison**.
- Common mistake: ~~`if (x = 5)`~~ assigns 5 and is effectively true in C++ — a silent logic bug.

---

## Integer division vs floating point

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    cout << (7 / 2)   << '\n';         // [!]
    cout << (7 / 2.0) << '\n';         // [!]
}
```

---

## 5. Modulus % — the remainder

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    cout << (7 % 2)  << '\n';          // [!]
    cout << (8 % 2)  << '\n';          // [!]
    cout << (10 % 3) << '\n';          // [!]
}
```

---

## % — three jobs you’ll reuse constantly

1. **Last digit** — `x % 10`
2. **Even/odd check** — `x % 2 == 0` (even), `x % 2 == 1` (odd)
3. **Divisibility** — `x % k == 0` (x is divisible by k)

---

## 6. Floating point & formatting

```cpp
#include <bits/stdc++.h>
#include <iomanip>
using namespace std;
int main() {
    double pi = 3.1415926535;           // [!]
    cout << fixed << setprecision(2)    // [!]
         << pi << '\n';                 // [!]
}
```

---

## 7. Comparisons evaluate to true/false

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int x = 5;                          // [!]
    cout << (x > 3)  << '\n';           // [!]
    cout << (x == 5) << '\n';           // [!]
    cout << (x != 5) << '\n';           // [!]
}
```

---

## 8. Logical operators — && || !

- `&&` AND — both true
- `||` OR  — at least one true
- `!`  NOT — invert

**Examples to build by hand:**

- "x is even AND positive" → `(x % 2 == 0 && x > 0)`
- "x < 10 OR x > 90" → `(x < 10 || x > 90)`

---

## Combining comparisons

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int x = 12;                         // [!]
    bool ok = (x % 2 == 0 && x > 0);    // [!]
    cout << (ok ? "true" : "false");    // [!]
}
```

---

## 9. Checkpoint — compute, don’t branch yet

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int A,B; cin >> A >> B;             // [!]
    // Compute boolean: A >= B
    if (A >= B) cout << "Yes";          // [!]
    else cout << "No";                  // [!]
}
```

---

## 10. if / else if / else

- `if (cond)` runs if true.
- `else if (cond)` runs only if previous false AND this true.
- `else` runs only if all previous false.
- **Order matters** in a chain — putting ranges in wrong order gives wrong answers.
- **Only the first true branch runs.**

---

## Order matters (else if bug)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int x; cin >> x;                    // [!]
    if (x < 100) cout << "small";       // [!]
    else if (x < 50)  cout << "tiny";   // [!]  // unreachable if we only think <50 after <100? order wrong
    else cout << "large";               // [!]
}
```

---

## Order fixed (correct ranges)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int x; cin >> x;                    // [!]
    if (x < 50)  cout << "tiny";        // [!]
    else if (x < 100) cout << "small";  // [!]
    else cout << "large";               // [!]
}
```

---

## Parity branching

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;                    // [!]
    if (n % 2 == 0)                     // [!]
        cout << "Even";                 // [!]
    else                                // [!]
        cout << "Odd";                  // [!]
}
```

---

## Branching on operator (J, K, L)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long a,b; char op;             // [!]
    cin >> a >> b >> op;                // [!]
    if (op == '+') cout << (a+b);       // [!]
    else if (op == '-') cout << (a-b);  // [!]
    else if (op == '*') cout << (a*b);  // [!]
    else if (op == '/') {               // [!]
        // integer division as appropriate
        cout << (a/b);
    }
}
```

---

## 11. break — stop a loop early

- Find answer → stop, save time / avoid reading more.
- **Gap patch:** no pure `break` problem in sheet, so use this standalone demo.

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    for (int i = 1; i <= 10; ++i) {     // [!]
        cout << i << ' ';               // [!]
        if (i == 5) break;              // [!]
    }
    // prints 1 2 3 4 5
}
```

---

## 12. for loops — when count is known

`for (init; condition; step) { body }`

Execution order: init → check condition → body (if true) → step → condition…

---

## Q — print 1 to N

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int N; cin >> N;                    // [!]
    for (int i = 1; i <= N; ++i) {      // [!]
        cout << i;                      // [!]
        if (i < N) cout << ' ';         // [!]
    }
}
```

---

## Check constraints before you pick a loop

**Bad for large N (e.g. N <= 10^9):**

```cpp
// BAD for large N (e.g. N <= 10^9)
long long sum = 0;
for (long long i = 1; i <= N; ++i) {   // [!]
    sum += i;                          // [!]
}
// Will time out (too many iterations for 0.25s)
```

---

## Fix: use math, not a loop (R-style)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long N; cin >> N;              // [!]
    // sum 1..N = N*(N+1)/2
    long long sum = (N * (N+1) / 2);    // [!]
    cout << sum;                        // [!]
}
```

---

## 13. while loops — count unknown in advance

- `while (condition) { body }` — condition checked **before** body.
- Reach for `while` when you don’t know how many iterations you need (input stream, sentinel).

---

## Z — read until 0 (sentinel)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;                              // [!]
    while (cin >> n && n != 0) {        // [!]
        // process n
        cout << n << '\n';              // [!]
    }
}
```

---

## 14. do-while — body runs at least once

- `do { body } while (condition);` — condition checked **after** body.
- Runs **≥ 1 time** (vs `while` which may run 0).

---

## do-while example (gap patched)

**Sheet has no problem requiring do-while — use this tiny example (ask until positive).**

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int x;                              // [!]
    do {
        cin >> x;                       // [!]
    } while (x <= 0);                   // [!]
    cout << "Positive: " << x;          // [!]
}
```

---

## 15. Test-case loop (standard template)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);   // [!]
    cin.tie(NULL);                      // [!]
    int t; cin >> t;                    // [!]
    for (int i = 0; i < t; ++i) {       // [!]
        // read, solve, print one case   // [!]
    }
}
```

---

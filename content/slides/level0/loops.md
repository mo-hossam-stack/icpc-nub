## Last time on the path

> A quick look back before we move forward.

- A **problem** becomes an **algorithm**, and an algorithm becomes **code**.
- The **compiler** translates your words into the 0s and 1s the CPU runs.
- You wrote your first C++ program: `#include`, `main`, `cout`.

---

## The toolkit you already hold

- **Types** — `int`, `long long`,`float`, `double`, `char`, `string`, `bool` ;
- **Input / output** — `cin >> x`, `cout << x`, `'endl'` for a new line.
- **Operators** — `+ - * / %`, and `%` hands you the last digit and even / odd.
- **Decisions** — `if`, `else if`, `else` branch your program on a condition.

---

## But your program still does one thing

> Every line you wrote runs **once**, top to bottom, and stops.

- Print `1`, `2`, `3`? Three lines.
- Print `1` to `1000`? A thousand lines.
- That wall is exactly where today begins — how to make the computer **repeat** work for you.

---

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

## Types of loops

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

---

## Init, stop, and step 

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

---

## Off-by-one and the boundary

The difference between right and wrong is often one character:

```cpp
for (int i = 0; i <= n; i++)   // n + 1 passes — usually one too many
for (int i = 0; i < n; i++)    // exactly n passes — the default
for (int i = 1; i <= n; i++)   // exactly n passes — when you want 1..n

```


---


## The sum from 1 to n loop


```cpp
#include <iostream>
using namespace std;
int main() {
    long long sum = 0;
    for (int i = 1; i <= n; i++) {  // [!]
        sum += i;                  // [!]
    }
    cout << sum;
}
```


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

The condition is checked **before** the body  so a loop can run zero times. That is normal, not a crash.

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
---

## Loops inside loops

A loop's body can hold another loop. The inner loop runs fully for **every** outer pass.

```cpp
for (int i = 0; i < 3; i++) {      // [!]   outer
    for (int j = 0; j < 2; j++)    // [!]   inner
                     // [!]
}                                  // [!]
```


---


## Quick check — predict, then I show you

```cpp
#include <iostream>
using namespace std;
int main() {
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        total += i;
    }
    cout << total;                     // [!]
    // answer: 25 — add 1, skip 2, add 3, skip 4, add 5   // [!]
}
```


---

## Break

> Stretch. Breathe. Drink some water.

Next up: `do-while` — and why it exists at all.

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


---

## The digit loop

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

- `x % 10` peels the **last digit**
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

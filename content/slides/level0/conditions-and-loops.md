# Conditions & Loops

> Control flow is how your program makes decisions and repeats work. In C++ it is four keywords and a handful of rules you have to respect under contest time pressure.

## Branching

- `if` / `else if` / `else` — only the **first** true branch runs.
- `switch` is faster to read for discrete values (menus, state machines).
- Always guard the `else` — the empty case is where the bugs live.

---

## The loop family

- `for` — when you know the count or iterate a range.
- `while` — when the count is unknown.
- `do…while` — runs once, then loops. Rare on purpose.

---

## Off-by-one, the real enemy

- `i < n` not `i <= n`.
- `int i = 0; i < n; ++i` — pre-increment in the header, no surprises.
- Loop bounds off by one = the single most common WA in a first contest.

---

## Reference implementation

```cpp
for (int i = 0; i < n; i++) {
    if (a[i] % 2 == 0) continue;   // skip even values
    sum += a[i];                  // do the work
}
```

---

## Your notes

Add the sheet, the session link, and anything the coach says here.

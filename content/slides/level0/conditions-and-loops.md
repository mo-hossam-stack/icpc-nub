# Conditions & Loops

> Control flow is how your program decides and repeats. In C++ it is four keywords
> and a handful of rules you have to respect under contest time pressure.

---

## Branching

- `if` / `else if` / `else` — only the **first** true branch runs.
- `switch` reads better for discrete values (menus, state machines).
- Always guard the `else` — the empty case is where the bugs live.

~~`if (x = 5)`~~ — that is an assignment, and it is always true.

---

## Which loop

| Loop | Reach for it when |
|------|-------------------|
| `for` | you know the count, or you are walking a range |
| `while` | the count is unknown and decided by the data |
| `do…while` | the body must run once before it can be tested |

Pick wrong and you pay for it in reading, not in speed.

---

## Off-by-one, the real enemy

- `i < n` not `i <= n`.
- `int i = 0; i < n; ++i` — pre-increment in the header, no surprises.
- Loop bounds off by one = the single most common WA in a first contest.

---

## Reference implementation

```cpp
int sum = 0;                            // [!]
for (int i = 0; i < n; i++) {           // [!]
    if (a[i] % 2 == 0) continue;        // [!]
    sum += a[i];                        // [!]
}
```

---

## Why `continue` and not `if`

```cpp
if (a[i] % 2 != 0) {    // [!]
    sum += a[i];
}
```

Same answer. The guard clause stays flat, so the *next* condition has no extra
nesting to read through. When a body grows an `else`, invert it.

---

## Driving the deck

- `F` full screen — do this first, before the room settles.
- `←` `→` or `space` — next. On a slide with code it reveals one marked line
  first, so ask the room before you advance.
- `O` outline — jump to any slide without stepping through all of them.
- `P` pointer — a spotlight follows your mouse, so you can point at a line
  without walking to the laptop.
- `[` `]` — text size, for the back row.

## Your notes

Anything the coach says that is not on a slide. Keep it short — this deck is
projected, not read.

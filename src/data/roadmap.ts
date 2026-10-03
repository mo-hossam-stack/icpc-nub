export interface TopicLinks {
  session?: string
  sheet?: string
  upsolve?: string
}

type TopicStatus = 'open' | 'locked'

export interface Topic {
  id: string
  index: number
  title: string
  blurb: string
  tags: string[]
  status: TopicStatus
  links: TopicLinks
}

export interface Level {
  id: 'level0' | 'level1'
  index: number
  name: string
  kicker: string
  summary: string
  accent: string
  released: boolean
  topics: Topic[]
}

export const levels: Level[] = [
  {
    id: 'level0',
    index: 0,
    name: 'Level 0',
    kicker: 'The Foundation',
    summary:
      'Everything you need before a single contest problem makes sense. C++ syntax, loops, arrays, strings, functions, complexity and the standard library.',
    accent: '#4f7a1e',
    released: true,
    topics: [
      {
        id: 'conditions-and-loops',
        index: 0,
        title: 'Conditions & Loops',
        blurb: 'if / else, switch, for, while, do-while — and when to reach for which one.',
        tags: ['data types', 'conditions', 'loops'],
        status: 'open',
        links: {},
      },
      {
        id: 'arrays',
        index: 1,
        title: 'Arrays',
        blurb: 'Static storage, indexing, traversal patterns, sorting by hand, 2D grids.',
        tags: ['1d array', 'frequency array', 'multi-d array'],
        status: 'open',
        links: {},
      },
      {
        id: 'strings',
        index: 2,
        title: 'Strings',
        blurb: 'std::string, character handling, tokenising, parsing input like a judge does.',
        tags: ['built-in functions', 'find and substr'],
        status: 'open',
        links: {},
      },
      {
        id: 'functions-and-complexity',
        index: 3,
        title: 'Functions & Complexity',
        blurb: 'Functions, recursion, references, and reading the complexity of a solution out loud.',
        tags: ['big o', 'time complexity', 'space complexity', 'loop analysis'],
        status: 'open',
        links: {},
      },
      {
        id: 'stl1',
        index: 4,
        title: 'STL 1',
        blurb: 'vector, pair, sort, set — the containers you will use in every problem.',
        tags: ['pair and vectors', 'stack', 'queue and deque', 'priority queue'],
        status: 'open',
        links: {},
      },
      {
        id: 'stl2',
        index: 5,
        title: 'STL 2',
        blurb: 'map, queue, stack, deque, tuple — dynamic structures and priority logic.',
        tags: ['set', 'map'],
        status: 'open',
        links: {},
      },
    ],
  },
  {
    id: 'level1',
    index: 1,
    name: 'Level 1',
    kicker: 'The Construction',
    summary:
      'Level 0 gave you the tools. Level 1 builds the algorithms on top of them — the standard toolkit for real contest problems.',
    accent: '#4f7a1e',
    released: false,
    topics: [
      { id: 'binary-search', index: 0, title: 'Binary Search', blurb: 'Search on the answer, and on the space between.', tags: ['search'], status: 'locked', links: {} },
      { id: 'prefix-sum', index: 1, title: 'Prefix Sums', blurb: 'Range queries in O(1).', tags: ['arrays'], status: 'locked', links: {} },
      { id: 'two-pointers', index: 2, title: 'Two Pointers', blurb: 'Sliding windows and pair problems.', tags: ['arrays'], status: 'locked', links: {} },
      { id: 'sorting-advanced', index: 3, title: 'Advanced Sorting', blurb: 'Comparators, custom orders, stability.', tags: ['stl'], status: 'locked', links: {} },
      { id: 'greedy', index: 4, title: 'Greedy', blurb: 'Prove the exchange argument or go home.', tags: ['theory'], status: 'locked', links: {} },
      { id: 'basic-dp', index: 5, title: 'Basic DP', blurb: 'State, transition, base case, memory.', tags: ['dp'], status: 'locked', links: {} },
    ],
  },
]

export const levelById = (id: string) => levels.find((l) => l.id === id)
export const topicById = (levelId: string, topicId: string) =>
  levelById(levelId)?.topics.find((t) => t.id === topicId)

export const totalTopics = levels.reduce((n, l) => n + l.topics.length, 0)
export const openTopics = levels.reduce(
  (n, l) => n + l.topics.filter((t) => t.status === 'open').length,
  0,
)

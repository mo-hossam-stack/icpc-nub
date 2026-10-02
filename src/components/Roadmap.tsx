import { levels } from '../data/roadmap'
import type { Level, Topic } from '../data/roadmap'
import './roadmap.css'

/**
 * The roadmap is one spine: a rail down the middle with a rung per topic,
 * alternating left and right. A level that is not released says so under its
 * name and is drawn blurred, so it reads as promised rather than open.
 */
export default function Roadmap({ onOpen }: { onOpen: (level: Level, topic: Topic) => void }) {
  return (
    <div className="spine">
      {levels.map((level) => (
        <section key={level.id} className="spine__level">
          <p className="spine__band">
            <b>{level.name}</b>
            {!level.released && <s>Coming soon</s>}
          </p>

          <ol className={`spine__rows${level.released ? '' : ' is-locked'}`}>
            {level.topics.map((topic, i) => {
              const card = (
                <>
                  <span className="spine__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="spine__body">
                    <b>{topic.title}</b>
                    <i>{topic.tags.join(' · ')}</i>
                  </span>
                </>
              )

              /* locked topics are dashed and inert: the level blur already says "soon" */
              if (topic.status === 'locked')
                return (
                  <li key={topic.id} className={`spine__row spine__row--${i % 2 ? 'right' : 'left'}`}>
                    <div className="spine__card is-locked">{card}</div>
                  </li>
                )

              return (
                <li key={topic.id} className={`spine__row spine__row--${i % 2 ? 'right' : 'left'}`}>
                  <button className="spine__card" onClick={() => onOpen(level, topic)}>
                    {card}
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
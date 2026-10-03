export default function LazyFallback() {
  return (
    <div className="deck deck--loading" style={{ padding: '40px 0', textAlign: 'center' }}>
      <p className="mono-tag" style={{ marginBottom: '12px' }}>
        Loading deck…
      </p>
      <div className="deck__spinner" aria-hidden="true">
        <div className="deck__spinner__dot" />
        <div className="deck__spinner__dot" />
        <div className="deck__spinner__dot" />
      </div>
    </div>
  )
}

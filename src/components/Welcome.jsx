export default function Welcome({ onNext }) {
  return (
    <div className="welcome">
      <div className="welcome-brand">
        <div className="brand-mark">ð¡ï¸</div>
        <div className="brand-name">
          SC Financial Life Group
          <span>Licensed Insurance Brokerage</span>
        </div>
      </div>

      <h1 className="welcome-headline">
        Protect what<br />
        <span className="g">matters most.</span>
      </h1>

      <p className="welcome-sub">
        Answer a few questions and we'll find the right life insurance coverage for you.
        Takes about 10 minutes â fully secure and digital.
      </p>

      <div className="welcome-stats">
        <div className="stat">
          <span className="stat-num">$50Kâ$3M</span>
          <span className="stat-label">Coverage options</span>
        </div>
        <div className="stat">
          <span className="stat-num">~10 min</span>
          <span className="stat-label">To complete</span>
        </div>
        <div className="stat">
          <span className="stat-num">256-bit</span>
          <span className="stat-label">SSL encrypted</span>
        </div>
      </div>

      <button className="btn-primary xl" onClick={() => onNext()}>
        Start My Application â
      </button>

      <p className="welcome-trust">
        ð Your information is protected by bank-level encryption and never sold.
      </p>
    </div>
  )
}

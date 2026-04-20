import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

function riskLevel(drinks) {
  if (drinks === 0)   return { label: 'Non-drinker', color: '#10b981', icon: 'ð¿' }
  if (drinks <= 7)    return { label: 'Low risk',    color: '#10b981', icon: 'â' }
  if (drinks <= 14)   return { label: 'Moderate',    color: '#f59e0b', icon: 'â ï¸' }
  return                     { label: 'High risk',   color: '#ef4444', icon: 'ð¨' }
}

export default function AlcoholStep({ formData, onNext, onBack }) {
  const [drinks, setDrinks] = useState(formData.drinksPerWeek ?? 0)
  const risk = riskLevel(drinks)

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">How much do you drink?</h2>
      <p className="step-hint">Alcohol consumption is a standard health question. A "drink" = 12 oz beer, 5 oz wine, or 1.5 oz spirits.</p>

      <div className="slider-wrap">
        <div className="slider-value">
          {drinks === 0 ? 'None' : drinks === 1 ? '1 drink' : `${drinks} drinks`}
          {drinks > 0 && <span className="slider-sub"> per week</span>}
        </div>
        <input
          type="range"
          className="range-input"
          min={0} max={30} step={1}
          value={drinks}
          onChange={e => setDrinks(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>None</span>
          <span>30+ drinks/wk</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
        background: `${risk.color}12`, border: `1px solid ${risk.color}35`, borderRadius: 10,
        marginBottom: 28, fontSize: '0.9rem' }}>
        <span style={{ fontSize: '1.3rem' }}>{risk.icon}</span>
        <span style={{ color: risk.color, fontWeight: 600 }}>{risk.label}</span>
        {drinks > 14 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>â may affect premium rates</span>}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <span className="enter-hint">press <kbd>Enter</kbd></span>
          <button className="btn-primary" onClick={() => onNext({ drinksPerWeek: drinks })}>Continue â</button>
        </div>
      </div>
    </div>
  )
}

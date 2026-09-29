import { useMemo, useState } from 'react'
import { Bell, Check, ChevronDown, Download, Menu, Plus, Search, X } from 'lucide-react'
import { nav, transactions, lowStock, periods, ledger } from './data'

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="#14285a" />
      <circle cx="18" cy="18" r="9" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M9.5 20.5h5.2M21.3 20.5h5.2M18 22.5v6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="18" cy="18" r="3" fill="#d62839" />
    </svg>
  )
}

function Chart({ period }) {
  const { labels, revenue, expenses } = periods[period]
  const max = Math.ceil(Math.max(...revenue, ...expenses) / 200) * 200
  return (
    <div className="chart" role="img" aria-label={`Revenue and expenses, ${period}`}>
      {[1, 0.5, 0].map((f) => <span key={f} className="gridline" style={{ bottom: `calc(${f * 100}% * .86 + 22px)` }}><em>₹{Math.round(max * f)}k</em></span>)}
      {labels.map((l, i) => (
        <div className="group" key={l}>
          <div className="bars">
            <i className="bar rev" style={{ height: `${(revenue[i] / max) * 100}%` }} title={`Revenue ₹${revenue[i]}k`} />
            <i className="bar exp" style={{ height: `${(expenses[i] / max) * 100}%` }} title={`Expenses ₹${expenses[i]}k`} />
          </div>
          <span>{l}</span>
        </div>
      ))}
    </div>
  )
}

function Gauge({ stock, reorder }) {
  const cells = 10
  const filled = Math.round((stock / reorder) * cells * 0.8)
  return <div className="gauge" aria-label={`${stock} in stock, reorder at ${reorder}`}>{Array.from({ length: cells }, (_, i) => <i key={i} className={i < filled ? (stock / reorder < 0.7 ? 'on low' : 'on') : ''} />)}</div>
}

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('This month')
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState('')

  const rows = useMemo(() => transactions.filter((t) => `${t.id} ${t.party}`.toLowerCase().includes(query.toLowerCase())), [query])
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 2600) }
  const go = (label) => { setActive(label); setOpen(false) }
  const total = periods[period].revenue.reduce((a, b) => a + b, 0)

  return (
    <div className="shell">
      <aside className={`side ${open ? 'open' : ''}`}>
        <div className="logo"><Logo /><b>AutoFlow</b><button className="only-mobile" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
        <nav>
          {nav.map((n, i) => n.group
            ? <p className="group-name" key={i}>{n.group}</p>
            : <button key={n.label} className={active === n.label ? 'on' : ''} onClick={() => go(n.label)}><n.icon size={17} />{n.label}{n.badge && <span className="badge">{n.badge}</span>}</button>)}
        </nav>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <div className="main">
        <header className="top">
          <button className="only-mobile ghost" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <label className="search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find an invoice or a party" /></label>
          <button className="ghost bell" aria-label="Notifications"><Bell size={18} /><i /></button>
          <button className="me"><span>SK</span>Shivprasad Khapale<ChevronDown size={14} /></button>
        </header>

        <main className="page">
          <div className="title-row">
            <div><h1>{active}</h1><p>{today}</p></div>
            <div className="actions">
              <button className="btn" onClick={() => say('Report downloaded')}><Download size={16} />Export</button>
              <button className="btn solid" onClick={() => setShowAdd(true)}><Plus size={16} />New entry</button>
            </div>
          </div>

          {active !== 'Dashboard' ? (
            <section className="empty">
              <h2>No {active.toLowerCase()} yet</h2>
              <p>Add your first record and it will show up here.</p>
              <button className="btn solid" onClick={() => setShowAdd(true)}><Plus size={16} />New entry</button>
            </section>
          ) : (
            <>
              <div className="top-grid">
                <section className="panel revenue">
                  <div className="rev-head">
                    <div>
                      <span className="label">Revenue, {period.toLowerCase()}</span>
                      <div className="big">₹{(total * 1000).toLocaleString('en-IN')}</div>
                      <span className="up">Up 12.8% on the previous period</span>
                    </div>
                    <div className="tabs" role="tablist">
                      {Object.keys(periods).map((p) => <button key={p} role="tab" aria-selected={p === period} className={p === period ? 'on' : ''} onClick={() => setPeriod(p)}>{p}</button>)}
                    </div>
                  </div>
                  <Chart period={period} />
                  <div className="legend"><span><i className="rev" />Revenue</span><span><i className="exp" />Expenses</span></div>
                </section>

                <section className="panel ledger">
                  {ledger.map((l) => <div key={l.label}><span className="label">{l.label}</span><b>{l.value}</b><small>{l.note}</small></div>)}
                </section>
              </div>

              <div className="low-grid">
                <section className="panel">
                  <h2>Recent transactions</h2>
                  <div className="scroll">
                    <table>
                      <thead><tr><th>Reference</th><th>Party</th><th className="r">Amount</th><th>Status</th><th>When</th></tr></thead>
                      <tbody>
                        {rows.map((t) => <tr key={t.id} className={`s-${t.status.toLowerCase()}`}><td className="ref">{t.id}</td><td>{t.party}</td><td className="r">{t.amount}</td><td><span className="status">{t.status}</span></td><td className="muted">{t.date}</td></tr>)}
                        {!rows.length && <tr><td colSpan="5" className="muted">Nothing matches “{query}”. Try a different invoice number or name.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="panel">
                  <h2>Running low</h2>
                  {lowStock.map((s) => (
                    <div className="stock" key={s.sku}>
                      <div><b>{s.name}</b><small>{s.sku}</small></div>
                      <Gauge stock={s.stock} reorder={s.reorder} />
                      <span className="count">{s.stock}<small>/{s.reorder}</small></span>
                    </div>
                  ))}
                  <button className="btn wide" onClick={() => go('Inventory')}>Open inventory</button>
                </section>
              </div>
            </>
          )}
        </main>
      </div>

      {showAdd && (
        <div className="backdrop" onMouseDown={() => setShowAdd(false)}>
          <form className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); setShowAdd(false); say('Entry saved') }}>
            <h2>New {active === 'Dashboard' ? 'entry' : active.toLowerCase()}</h2>
            <label>Reference<input required placeholder="INV-2024-090" /></label>
            <label>Customer or supplier<input required /></label>
            <div className="two"><label>Amount (₹)<input inputMode="decimal" required /></label><label>Date<input type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label></div>
            <div className="foot"><button type="button" className="btn" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn solid"><Check size={16} />Save entry</button></div>
          </form>
        </div>
      )}
      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
    </div>
  )
}

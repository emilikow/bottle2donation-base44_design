import React, { useMemo, useState } from 'react'
import Nav from './components/Nav.jsx'

const cities = [{ id:'even-yehuda', name:'Even Yehuda', refund:0.30 }]
const destinations = [{ id:'wbais', name:'WBAIS', description:'School philanthropy', city:'even-yehuda' }]
const windows = [
  { id:'w1', city:'even-yehuda', start:'2025-08-12T09:00:00+03:00', end:'2025-08-12T11:00:00+03:00' },
  { id:'w2', city:'even-yehuda', start:'2025-08-15T18:00:00+03:00', end:'2025-08-15T20:00:00+03:00' },
]

function fmtRange(startISO, endISO){
  const s = new Date(startISO), e = new Date(endISO)
  return s.toLocaleString([], { dateStyle:'medium', timeStyle:'short' }) + ' – ' + e.toLocaleTimeString([], { timeStyle:'short' })
}

export default function App(){
  const [active, setActive] = useState('home')
  const [city, setCity] = useState(cities[0].id)
  const [profile, setProfile] = useState({ displayName:'RecyclingFan42', address:'123 Herzl St, Even Yehuda', destination:destinations[0].id })
  const [confirmed, setConfirmed] = useState({})

  const upcoming = useMemo(()=> windows.filter(w=> w.city===city), [city])

  return (
    <div>
      <Nav active={active} setActive={setActive} />
      <main className="container-narrow" style={{paddingTop:20}}>
        {active==='home' && <Home city={city} setCity={setCity} profile={profile} setActive={setActive} />}
        {active==='windows' && <Windows upcoming={upcoming} confirmed={confirmed} onConfirm={(w)=>setConfirmed(p=>({...p,[w.id]:true}))} onCancel={(w)=>setConfirmed(p=>({...p,[w.id]:false}))} />}
        {active==='destinations' && <Destinations list={destinations.filter(d=>d.city===city)} profile={profile} setProfile={setProfile} />}
        {active==='accepted' && <Accepted />}
        {active==='reference' && <Reference />}
        {active==='impact' && <Impact />}
        {active==='leaderboard' && <Leaderboard />}
        {active==='admin' && <Admin upcoming={upcoming} />}
      </main>
    </div>
  )
}

function Home({city, setCity, profile, setActive}){
  return (
    <div className="layout-grid">
      <section className="hero col-span-12">
        <h1 className="text-3xl font-bold text-blue-700">Turn bottles into donations</h1>
        <p className="muted mt-2">Even Yehuda pilot • 2‑hour pickup windows • ₪0.30 per bottle • Even split across destinations</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <button className="btn btn-primary" onClick={()=>setActive('windows')}>See Collection Times</button>
          <button className="btn btn-ghost" onClick={()=>setActive('destinations')}>Choose My Destination</button>
        </div>
      </section>

      <section className="card col-span-12 md:col-span-8">
        <h2 className="text-xl font-semibold">City & Settings</h2>
        <label className="label mt-2">Your City</label>
        <select value={city} onChange={e=>setCity(e.target.value)} className="input">
          {cities.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="kpi mt-3">
          <div className="stat"><div className="num">₪0.30</div><div className="muted">Per bottle (city)</div></div>
          <div className="stat"><div className="num">2 hrs</div><div className="muted">Pickup window</div></div>
          <div className="stat"><div className="num">Even Split</div><div className="muted">Across destinations</div></div>
        </div>
      </section>

      <section className="card col-span-12 md:col-span-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="muted">Display Name</div>
        <div>{profile.displayName} <span className="badge">anonymous ok</span></div>
        <div className="muted mt-2">Address</div>
        <div>{profile.address}</div>
        <div className="muted mt-2">Preferred Destination</div>
        <div>WBAIS</div>
      </section>
    </div>
  )
}

function Windows({upcoming, confirmed, onConfirm, onCancel}){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">Collection Windows</h2>
      <div className="list mt-2">
        {upcoming.map(w => (
          <div className="row" key={w.id}>
            <div className="flex items-center gap-3">
              <div className="pill">{new Date(w.start).toLocaleDateString()}</div>
              <div>{fmtRange(w.start, w.end)}</div>
            </div>
            <div>
              {confirmed[w.id] ? (
                <button className="btn" onClick={()=>onCancel(w)}>Cancel</button>
              ) : (
                <button className="btn btn-primary" onClick={()=>onConfirm(w)}>Confirm Pickup</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Destinations({list, profile, setProfile}){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">Destinations</h2>
      <div className="layout-grid mt-2">
        {list.map(d => (
          <div className="card col-span-12 md:col-span-6" key={d.id}>
            <h3 className="font-semibold">{d.name}</h3>
            <p className="muted">{d.description}</p>
            <button className="btn mt-2" onClick={()=>setProfile({...profile, destination:d.id})}>
              {profile.destination===d.id? 'Selected' : 'Select as my destination'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function Accepted(){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">What Bottles We Collect</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>Plastic beverage bottles (deposit-marked, 100 ml – 5 L)</li>
        <li>Glass beverage bottles (deposit-marked, 100 ml – 5 L)</li>
        <li className="muted">Not accepted (v1): metal cans, milk/dairy containers, cartons/pouches/bags</li>
      </ul>
    </section>
  )
}

function Reference(){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">Bottle Reference</h2>
      <p className="muted">Guidance based on Israel’s Deposit Law (100 ml – 5 L, plastic or glass; milk excluded). Each eligible bottle is ₪0.30.</p>
    </section>
  )
}

function Impact(){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">My Impact</h2>
      <div className="kpi mt-2">
        <div className="stat"><div className="num">0</div><div className="muted">Runs participated</div></div>
        <div className="stat"><div className="num">0</div><div className="muted">Current streak</div></div>
        <div className="stat"><div className="num">1</div><div className="muted">Destinations supported</div></div>
      </div>
    </section>
  )
}

function Leaderboard(){
  const rows = [
    { name:'GreenGuru', runs:7, streak:3, me:false },
    { name:'RecyclingFan42', runs:6, streak:2, me:true },
    { name:'GlassMaster', runs:6, streak:1, me:false },
  ]
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">City Leaderboard</h2>
      <table className="table mt-2">
        <thead><tr><th>#</th><th>Display Name</th><th>Runs</th><th>Streak</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={r.me? 'bg-blue-50' : ''}>
              <td>{i+1}</td>
              <td>{r.name}{r.me && ' (you)'}</td>
              <td>{r.runs}</td>
              <td>{r.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function Admin({upcoming}){
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">Admin (Demo)</h2>
      <p className="muted">In production, this section would be protected by auth.</p>
      <h3 className="font-semibold mt-2">Upcoming Windows ({upcoming.length})</h3>
      <ul className="list-disc pl-5">
        {upcoming.map(u => <li key={u.id}>{new Date(u.start).toLocaleDateString()} — {new Date(u.start).toLocaleTimeString([], {timeStyle:'short'})} to {new Date(u.end).toLocaleTimeString([], {timeStyle:'short'})}</li>)}
      </ul>
    </section>
  )
}

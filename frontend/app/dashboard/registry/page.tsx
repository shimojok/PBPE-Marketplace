'use client'

import { useState, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type RegistryEntry = {
  id: string
  kind: string
  subject_id: string
  actor: string
  amount: number
  unit: string
  timestamp: number
  chain_hash?: string
}

export default function RegistryPage() {
  const [entries, setEntries] = useState<RegistryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<RegistryEntry | null>(null)
  const [filter, setFilter] = useState('')
  const [chainStatus, setChainStatus] = useState<any>(null)

  const fetchRegistry = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/registry/summary`)
      const data = await res.json()
      if (data.entries) {
        setEntries(data.entries)
      }
      setLoading(false)
    } catch (err) {
      console.error('Registry fetch error:', err)
      setLoading(false)
    }
  }

  const fetchChainStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/registry/chain/status`)
      const data = await res.json()
      setChainStatus(data)
    } catch (err) {
      console.error('Chain status error:', err)
    }
  }

  useEffect(() => {
    fetchRegistry()
    fetchChainStatus()
  }, [])

  const filteredEntries = entries.filter(entry =>
    entry.id.toLowerCase().includes(filter.toLowerCase()) ||
    entry.actor.toLowerCase().includes(filter.toLowerCase()) ||
    entry.subject_id.toLowerCase().includes(filter.toLowerCase())
  )

  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
  }

  const formatTimestamp = (ts: number) => {
    return new Date(ts * 1000).toLocaleString()
  }

  return (
    <div style={{ padding: "0" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#f1f5f9" }}>
        PBPE Registry Explorer
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Immutable ledger of all PBPE transactions — blockchain verified
      </p>

      {chainStatus && (
        <div style={{ ...cardStyle, marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>Block Height</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f1f5f9" }}>{chainStatus.block_count || 0}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>Chain Status</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: chainStatus.chain_valid ? "#22c55e" : "#ef4444" }}>
                {chainStatus.chain_valid ? '✅ Valid' : '❌ Invalid'}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>Latest Hash</div>
              <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace", wordBreak: "break-all" }}>
                {chainStatus.latest_hash ? chainStatus.latest_hash.substring(0, 16) + '...' : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by ID, Actor, or Subject..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "#f1f5f9",
              fontSize: "14px",
              minWidth: "200px",
            }}
          />
          <button
            onClick={fetchRegistry}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", color: "#f1f5f9" }}>
          Registry Entries {entries.length > 0 && `(${entries.length})`}
        </h3>

        {loading ? (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>Loading registry entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>
            {entries.length === 0 ? 'No registry entries found. Issuing PBPE will create entries.' : 'No entries match your search.'}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Registry ID</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Kind</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Subject</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Actor</th>
                  <th style={{ textAlign: "right", padding: "10px 8px", color: "#94a3b8" }}>Amount</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Chain</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    style={{
                      borderBottom: "1px solid #1e293b",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1e293b"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <td style={{ padding: "10px 8px", color: "#f1f5f9", fontFamily: "monospace", fontSize: "12px" }}>
                      {entry.id}
                    </td>
                    <td style={{ padding: "10px 8px", color: "#94a3b8" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        backgroundColor: entry.kind === 'credit_issuance' ? '#1a3a2a' :
                                       entry.kind === 'credit_retirement' ? '#3a1a1a' :
                                       entry.kind === 'credit_trade' ? '#1a2a3a' :
                                       '#2a2a2a',
                        color: entry.kind === 'credit_issuance' ? '#22c55e' :
                               entry.kind === 'credit_retirement' ? '#ef4444' :
                               entry.kind === 'credit_trade' ? '#3b82f6' :
                               '#94a3b8',
                      }}>
                        {entry.kind}
                      </span>
                    </td>
                    <td style={{ padding: "10px 8px", color: "#94a3b8", fontFamily: "monospace", fontSize: "12px" }}>
                      {entry.subject_id}
                    </td>
                    <td style={{ padding: "10px 8px", color: "#94a3b8" }}>{entry.actor}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#f1f5f9" }}>
                      {entry.amount.toLocaleString()} {entry.unit}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      {entry.chain_hash ? (
                        <span style={{ color: "#22c55e" }}>✅</span>
                      ) : (
                        <span style={{ color: "#64748b" }}>⏳</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedEntry && (
        <div
          onClick={() => setSelectedEntry(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedEntry(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#94a3b8",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f1f5f9", marginBottom: "16px" }}>
              {selectedEntry.id}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", color: "#94a3b8", fontSize: "14px" }}>
              <div><strong style={{ color: "#f1f5f9" }}>Kind:</strong> {selectedEntry.kind}</div>
              <div><strong style={{ color: "#f1f5f9" }}>Subject:</strong> {selectedEntry.subject_id}</div>
              <div><strong style={{ color: "#f1f5f9" }}>Actor:</strong> {selectedEntry.actor}</div>
              <div><strong style={{ color: "#f1f5f9" }}>Amount:</strong> {selectedEntry.amount.toLocaleString()} {selectedEntry.unit}</div>
              <div style={{ gridColumn: "span 2" }}>
                <strong style={{ color: "#f1f5f9" }}>Timestamp:</strong> {formatTimestamp(selectedEntry.timestamp)}
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <strong style={{ color: "#f1f5f9" }}>Chain Hash:</strong>
                <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#94a3b8", wordBreak: "break-all" }}>
                  {selectedEntry.chain_hash || 'Not yet recorded'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

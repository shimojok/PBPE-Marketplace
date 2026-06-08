import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', res.data.access_token)
      window.location.href = '/dashboard/kpis'
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">PBPE Marketplace Login</h1>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        {error && <div className="login-error">{error}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

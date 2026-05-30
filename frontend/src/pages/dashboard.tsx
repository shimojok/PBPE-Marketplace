import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>PBPE Dashboard</h1>
    </ProtectedRoute>
  );
}

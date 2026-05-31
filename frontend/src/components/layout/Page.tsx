export default function Page({ title, children }) {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  );
}

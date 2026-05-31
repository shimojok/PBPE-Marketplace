import { useT } from "../../../i18n/useT";

export default function Enterprise() {
  const t = useT();

  return (
    <main>
      <h2>{t("dashboard.enterprise")}</h2>
      <p>Enterprise dashboard content here...</p>
    </main>
  );
}

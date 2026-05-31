import { useT } from "../../../i18n/useT";

export default function Impact() {
  const t = useT();

  return (
    <main>
      <h2>{t("dashboard.impact")}</h2>
      <p>Impact dashboard content here...</p>
    </main>
  );
}

import { useT } from "../../../i18n/useT";

export default function Finance() {
  const t = useT();

  return (
    <main>
      <h2>{t("dashboard.finance")}</h2>
      <p>Finance dashboard content here...</p>
    </main>
  );
}

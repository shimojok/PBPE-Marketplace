import { useT } from "../../../i18n/useT";

export default function Market() {
  const t = useT();

  return (
    <main>
      <h2>{t("dashboard.market")}</h2>
      <p>Market dashboard content here...</p>
    </main>
  );
}

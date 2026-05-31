import { useT } from "../../../i18n/useT";

export default function PBPE() {
  const t = useT();

  return (
    <main>
      <h2>{t("dashboard.pbpe")}</h2>
      <p>PBPE issuance dashboard content here...</p>
    </main>
  );
}

import { useContext } from "react";
import { LanguageContext } from "../../i18n/LanguageContext";

export default function Header() {
  const { lang, setLang } = useContext(LanguageContext);

  return (
    <header className="app-header">
      <div className="logo">PBPE Marketplace</div>
      <button
        onClick={() => setLang(lang === "en" ? "ja" : "en")}
        className="lang-toggle"
      >
        {lang === "en" ? "日本語" : "English"}
      </button>
    </header>
  );
}

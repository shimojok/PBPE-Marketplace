import { useContext } from "react";
import en from "./en.json";
import ja from "./ja.json";
import { LanguageContext } from "./LanguageContext";

export const useT = () => {
  const { lang } = useContext(LanguageContext);
  const dict: any = lang === "ja" ? ja : en;

  return (key: string) => {
    const parts = key.split(".");
    return parts.reduce((o, k) => (o && o[k] !== undefined ? o[k] : key), dict);
  };
};

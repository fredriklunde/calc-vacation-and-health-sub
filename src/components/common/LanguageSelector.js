import React from "react";

import { useTranslation } from "react-i18next";

// loading component for suspense fallback
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <i
        className="se flag"
        style={{ cursor: "pointer" }}
        onClick={() => changeLanguage("sv")}
      ></i>
      <i
        className="gb flag"
        style={{ cursor: "pointer" }}
        onClick={() => changeLanguage("en")}
      ></i>
    </div>
  );
}

export default LanguageSelector;

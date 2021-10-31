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
      <button type="submit" onClick={() => changeLanguage("sv")}>
        sv
      </button>
      <button type="submit" onClick={() => changeLanguage("en")}>
        en
      </button>
    </div>
  );
}

export default LanguageSelector;

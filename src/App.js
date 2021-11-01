import React, { Suspense } from "react";

import Page from "./pages/Page";
import Loader from "./components/common/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;

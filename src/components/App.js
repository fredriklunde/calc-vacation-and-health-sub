import React, { Suspense } from "react";

import Page from "./Page";
import Loader from "./Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;

import React, { Suspense } from "react";

import Page from "./Page";
import Loader from "./common/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;

import React, { lazy, memo, Suspense } from "react";

export default function Loadable(lazyComponent, fallback = null) {
  const Component = memo(lazy(lazyComponent));
  return (props) => (
    <Suspense fallback={fallback === null ? null : fallback}>
      <Component {...props} />
    </Suspense>
  );
}

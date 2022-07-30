import { useCallback, useState } from "react";

const setStepData = (data, current, stepData) => {
  const newData = [...data];
  newData[current] = stepData;
  return newData;
};

const useSteps = (initial) => {
  const [data, setData] = useState(() => ({
    current: 0,
    data: [],
    ...initial,
  }));
  const next = useCallback(
    (stepData) =>
      setData((d) => ({
        ...d,
        current: d.current + 1,
        data: setStepData(d.data, d.current, stepData),
      })),
    []
  );
  const back = useCallback(
    () =>
      setData((d) => ({
        ...d,
        current: d.current - 1,
      })),
    []
  );

  const set = useCallback(
    (step, data) =>
      setData((d) => ({
        ...d,
        data: setStepData(d.data, step, data),
      })),
    []
  );

  const reset = useCallback(
    () => setData({ current: 0, data: [], ...initial }),
    [initial]
  );
  return [data, { next, back, set, reset }];
};
export default useSteps;

import { Button } from "antd";
import DefaultError from "@/components/DefaultError";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  const resetError = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <DefaultError
      title="Please refresh page"
      content={error.message}
      actions={
        <Button type="primary" ghost size={40} onClick={resetError}>
          Refresh page
        </Button>
      }
    />
  );
}

export default function GeneralErrorBoundry({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

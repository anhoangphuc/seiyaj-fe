const ErrorMessage = ({ error }: { error: string; className?: string }) => {
  return (
    <div
      style={{ color: "#cc0033", fontSize: "12px", height: 12, width: "100%" }}
    >
      {error}
    </div>
  );
};

export default ErrorMessage;

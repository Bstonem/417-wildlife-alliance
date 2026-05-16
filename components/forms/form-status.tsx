"use client";

type FormStatusProps = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function FormStatus({ status, message }: FormStatusProps) {
  if (status === "idle" || !message) {
    return null;
  }

  return (
    <div
      className={
        status === "success"
          ? "rounded-md border border-primary/30 bg-primary/10 p-4 text-sm leading-6 text-primary"
          : "rounded-md border border-clay/30 bg-clay/10 p-4 text-sm leading-6 text-clay-strong"
      }
      role="status"
    >
      {message}
    </div>
  );
}

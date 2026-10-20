import React from "react";

/**
 * A presentational message bubble for the Chaa-Ass-Mera assistant.
 *
 * Props:
 * - message: string (preferred message text)
 * - content: string (fallback message text)
 * - role: "assistant" | "user" | "system"
 * - timestamp: optional string or Date
 * - isStreaming: whether the assistant is still generating a response
 * - className: optional class name for host-app styling
 */
export default function AssistantMessage({
  message,
  content,
  role = "assistant",
  timestamp,
  isStreaming = false,
  className = "",
}) {
  const text = message ?? content ?? "";
  const isUser = role === "user";
  const label = isUser ? "You" : role === "system" ? "System" : "Chaa-Ass-Mera";

  let timeLabel = "";
  if (timestamp) {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    timeLabel = Number.isNaN(date.getTime())
      ? String(timestamp)
      : new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
  }

  return (
    <article
      className={["assistant-message", isUser ? "assistant-message--user" : "assistant-message--assistant", className]
        .filter(Boolean)
        .join(" ")}
      data-role={role}
      aria-label={`${label} message`}
    >
      <div className="assistant-message__header">
        <span className="assistant-message__speaker">{label}</span>
        {timeLabel && (
          <time className="assistant-message__time" dateTime={timestamp instanceof Date ? timestamp.toISOString() : String(timestamp)}>
            {timeLabel}
          </time>
        )}
      </div>
      <div className="assistant-message__body">
        {text ? (
          <p>{text}</p>
        ) : isStreaming ? (
          <span className="assistant-message__typing" role="status" aria-label="Assistant is responding">
            <span />
            <span />
            <span />
          </span>
        ) : null}
        {isStreaming && text && (
          <span className="assistant-message__cursor" aria-label="Response in progress" />
        )}
      </div>
    </article>
  );
}

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, Sparkles, Copy, RotateCcw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you build something great today?",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    role: "user",
    content: "Can you show me how to use the GlowCard component?",
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: "3",
    role: "assistant",
    content: "Of course! The GlowCard tracks your cursor and shows a radial spotlight effect. Here's a basic example:\n\n```tsx\nimport { GlowCard } from \"@/components/ui/glow-card\"\n\n<GlowCard className=\"p-6\">\n  <h2>Hello world</h2>\n  <p>Move your cursor over this card!</p>\n</GlowCard>\n```\n\nYou can customize the `glowColor`, `glowSize`, and `glowOpacity` props to match your design.",
    timestamp: new Date(Date.now() - 30000),
  },
]

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"
  const [copied, setCopied] = React.useState(false)

  const copy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={["flex gap-3", isUser ? "flex-row-reverse" : "flex-row"].join(" ")}>
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        {isUser ? (
          <AvatarFallback className="text-xs bg-[var(--color-accent)] text-[var(--color-bg)]">U</AvatarFallback>
        ) : (
          <AvatarFallback className="text-xs bg-[var(--color-surface-2)]">
            <Bot size={13} className="text-[var(--color-accent)]" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className={["group flex flex-col gap-1 max-w-[75%]", isUser ? "items-end" : "items-start"].join(" ")}>
        <div
          className={[
            "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "bg-[var(--color-accent)] text-[var(--color-bg)] rounded-tr-sm"
              : "bg-[var(--color-surface-2)] text-[var(--color-text-1)] border border-[var(--color-border)] rounded-tl-sm",
          ].join(" ")}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={copy}
            className="rounded p-1 text-[var(--color-text-4)] hover:text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <Copy size={11} />
          </button>
          <span className="text-[10px] text-[var(--color-text-4)]">
            {copied ? "Copied!" : message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarFallback className="text-xs bg-[var(--color-surface-2)]">
          <Bot size={13} className="text-[var(--color-accent)]" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            style={{ animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite` }}
          />
        ))}
        <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
      </div>
    </div>
  )
}

interface AIChatProps {
  title?: string
  placeholder?: string
  model?: string
}

function AIChat({
  title = "AI Assistant",
  placeholder = "Ask me anything about ParticleUI…",
  model: defaultModel = "claude-sonnet-4-6",
}: AIChatProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [model, setModel] = React.useState(defaultModel)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput("")

    const userMsg: Message = {
      id: String(Date.now()),
      role: "user",
      content: text,
      timestamp: new Date(),
    }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))

    const assistantMsg: Message = {
      id: String(Date.now() + 1),
      role: "assistant",
      content: `I received your message: "${text}"\n\nIn a real implementation this would stream a response from ${model} via the AI SDK. Wire up your API route and replace this mock.`,
      timestamp: new Date(),
    }
    setMessages((m) => [...m, assistantMsg])
    setLoading(false)
  }

  const reset = () => setMessages(initialMessages)

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] flex items-center justify-center">
            <Sparkles size={13} className="text-[var(--color-accent)]" />
          </div>
          <span className="text-sm font-semibold">{title}</span>
          <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-[var(--color-accent-border)] text-[var(--color-accent-text)]">
            Beta
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="h-7 text-xs w-44 border-[var(--color-border)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claude-sonnet-4-6">Claude Sonnet 4.6</SelectItem>
              <SelectItem value="claude-opus-4-7">Claude Opus 4.7</SelectItem>
              <SelectItem value="claude-haiku-4-5">Claude Haiku 4.5</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={reset} title="New conversation">
            <RotateCcw size={13} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-5">
          {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <form
          onSubmit={(e) => { e.preventDefault(); send() }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="sm" disabled={!input.trim() || loading} className="gap-1.5">
            <Send size={13} />
            Send
          </Button>
        </form>
        <p className="text-[10px] text-[var(--color-text-4)] mt-1.5 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}

export { AIChat }

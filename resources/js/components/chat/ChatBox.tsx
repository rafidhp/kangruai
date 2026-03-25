import { Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// import { usePage } from '@inertiajs/react';

type ChatMessage = {
    sender: "user" | "ai";
    text: string;
};

export default function ChatBox() {
    const suggestions = [
        "Parent Talk Guide",
        "IPA vs IPS",
        "Find Internship",
        "Study Plan"
    ];

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // send message func
    const sendMessage = async (text?: string) => {
        const content = text ?? message;

        if (!content.trim() || loading) return;

        const userMessage: ChatMessage = {
            sender: "user",
            text: content,
        };

        // add user message
        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const res = await axios.post("/real-talk/send", {
                message: content,
            });

            const aiMessage: ChatMessage = {
                sender: "ai",
                text: res.data.aiReply,
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "⚠️ Sorry, something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col flex-1 rounded-2xl border bg-background overflow-hidden">
            {/* suggestions */}
            <div className="flex flex-wrap gap-2 border-b p-4">
                {suggestions.map((item) => (
                    <button
                        key={item}
                        onClick={() => sendMessage(item)}
                        className="rounded-full bg-muted px-4 py-1 text-sm font-medium hover:bg-muted/70 transition"
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* chat box */}
            <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
                {messages.length === 0 && (
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:text-zinc-950">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div className="max-w-lg rounded-2xl bg-muted p-4 text-sm leading-relaxed">
                            Hi Andi 👋 I'm your AI career navigator. Ask me anything about your future path!
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        {msg.sender === "ai" && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                <Bot className="h-5 w-5 dark:text-black" />
                            </div>
                        )}
                        <div
                            className={`max-w-lg rounded-2xl p-4 text-sm leading-relaxed ${
                                msg.sender === "user"
                                    ? "bg-primary text-white dark:text-black"
                                    : "bg-muted"
                            }`}
                        >
                            {msg.text}
                        </div>
                        {msg.sender === "user" && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200">
                                <User className="h-5 w-5 dark:text-black" />
                            </div>
                        )}
                    </div>
                ))}

                {/* loading indicator */}
                {loading && (
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                            <Bot className="h-5 w-5 dark:text-black" />
                        </div>
                        <div className="rounded-2xl bg-muted px-4 py-3 text-sm animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            <div className="flex items-center gap-3 border-t p-4">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about your career path..."
                    className="flex-1 rounded-full bg-muted px-4 py-3 text-sm outline-none"
                />
                <button
                    onClick={() => sendMessage()}
                    disabled={loading}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:opacity-90 disabled:opacity-50"
                >
                    <Send className="h-6 w-6 dark:text-black" />
                </button>
            </div>
        </div>
    );
}
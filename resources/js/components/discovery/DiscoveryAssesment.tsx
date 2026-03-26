import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { assesment } from "@/routes/discovery";

interface DiscoveryAssessmentProps {
    open: boolean;
    onClose: () => void;
    onComplete: (dna: Record<string, number>) => void;
}

interface QuizQuestion {
    category: string;
    question: string;
    options: {
        label: string;
        scores: Record<string, number>;
    }[];
}

const questions: QuizQuestion[] = [
    {
        category: "Creativity & Innovation",
        question: "When working on a project, what excites you most?",
        options: [
            { label: "Designing something visually beautiful", scores: { creativity: 20, communication: 5 } },
            { label: "Solving a complex technical challenge", scores: { technical: 20, logic: 10 } },
            { label: "Leading the team to success", scores: { leadership: 20, communication: 5 } },
            { label: "Understanding everyone's perspective", scores: { empathy: 20, communication: 5 } },
        ],
    },
    {
        category: "Creativity & Innovation",
        question: "How do you prefer to express your ideas?",
        options: [
            { label: "Through art, music, or design", scores: { creativity: 20, empathy: 5 } },
            { label: "Through data and analysis", scores: { logic: 15, technical: 10 } },
            { label: "Through writing and storytelling", scores: { communication: 20, creativity: 5 } },
            { label: "Through building prototypes", scores: { technical: 15, creativity: 10 } },
        ],
    },
    {
        category: "Creativity & Innovation",
        question: "Your ideal creative environment is:",
        options: [
            { label: "A startup with constant innovation", scores: { creativity: 15, leadership: 10 } },
            { label: "A research lab exploring unknowns", scores: { logic: 15, technical: 10 } },
            { label: "A community arts center", scores: { empathy: 15, creativity: 10 } },
            { label: "A tech company building products", scores: { technical: 15, communication: 10 } },
        ],
    },
    {
        category: "Helping Others",
        question: "What motivates you to help others?",
        options: [
            { label: "Seeing someone overcome a challenge", scores: { empathy: 20, leadership: 5 } },
            { label: "Teaching and sharing knowledge", scores: { communication: 20, empathy: 5 } },
            { label: "Building tools that improve lives", scores: { technical: 15, empathy: 10 } },
            { label: "Organizing communities for change", scores: { leadership: 20, empathy: 5 } },
        ],
    },
    {
        category: "Helping Others",
        question: "In a group project, you naturally:",
        options: [
            { label: "Take charge and delegate tasks", scores: { leadership: 20, communication: 5 } },
            { label: "Make sure everyone feels included", scores: { empathy: 20, communication: 5 } },
            { label: "Focus on the technical details", scores: { technical: 15, logic: 10 } },
            { label: "Come up with creative solutions", scores: { creativity: 15, logic: 10 } },
        ],
    },
    {
        category: "Financial Security",
        question: "What matters most in your future career?",
        options: [
            { label: "High salary and financial stability", scores: { logic: 15, technical: 10 } },
            { label: "Making a positive impact on society", scores: { empathy: 20, leadership: 5 } },
            { label: "Creative freedom and self-expression", scores: { creativity: 20, communication: 5 } },
            { label: "Recognition and leadership position", scores: { leadership: 15, communication: 10 } },
        ],
    },
    {
        category: "Financial Security",
        question: "When planning for the future, you tend to:",
        options: [
            { label: "Create detailed budgets and timelines", scores: { logic: 20, technical: 5 } },
            { label: "Follow your passion regardless", scores: { creativity: 15, empathy: 10 } },
            { label: "Seek advice from mentors", scores: { communication: 15, empathy: 10 } },
            { label: "Research market trends and data", scores: { logic: 15, technical: 10 } },
        ],
    },
    {
        category: "Work-Life Balance",
        question: "Your ideal work schedule looks like:",
        options: [
            { label: "Flexible hours, remote work", scores: { creativity: 10, communication: 10 } },
            { label: "Structured 9-5 with clear boundaries", scores: { logic: 15, leadership: 5 } },
            { label: "Project-based with intense sprints", scores: { technical: 15, leadership: 10 } },
            { label: "Collaborative team environment daily", scores: { communication: 15, empathy: 10 } },
        ],
    },
    {
        category: "Work-Life Balance",
        question: "How do you recharge after a busy week?",
        options: [
            { label: "Creating art, music, or crafts", scores: { creativity: 15, empathy: 5 } },
            { label: "Reading and learning new things", scores: { logic: 10, technical: 10 } },
            { label: "Spending time with friends/family", scores: { empathy: 15, communication: 10 } },
            { label: "Physical activities and sports", scores: { leadership: 10, technical: 5 } },
        ],
    },
    {
        category: "Overall",
        question: "If you could have one superpower for your career, it would be:",
        options: [
            { label: "Infinite creativity", scores: { creativity: 25 } },
            { label: "Perfect logical reasoning", scores: { logic: 20, technical: 5 } },
            { label: "Deep empathy for everyone", scores: { empathy: 25 } },
            { label: "Inspirational leadership", scores: { leadership: 20, communication: 5 } },
        ],
    },
];

export function DiscoveryAssessment({
    open,
    onClose,
    onComplete,
}: DiscoveryAssessmentProps) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const { user } = useAuth();

    if (!open) return null;

    const q = questions[currentQ];
    const selectedAnswer = answers[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    const selectAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQ] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!user) return;

        setSubmitting(true);

        // base DNA
        const dna: Record<string, number> = {
            logic: 30,
            empathy: 30,
            creativity: 30,
            leadership: 30,
            technical: 30,
            communication: 30,
        };

        answers.forEach((ansIdx, qIdx) => {
            const scores = questions[qIdx].options[ansIdx].scores;

            Object.entries(scores).forEach(([key, val]) => {
                dna[key] = Math.min(100, (dna[key] || 0) + val);
            });
        });

        router.post(assesment(), {
            dna,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Discovery Assessment completed! 🧬");
                onComplete(dna);
                onClose();
            },
            onError: () => {
                toast.error("Failed to save assessment.");
            },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed inset-0 z-[60]
                bg-black/60 dark:bg-black/70
                flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full max-w-xl
                    rounded-3xl
                    bg-white dark:bg-zinc-900
                    text-zinc-900 dark:text-zinc-100
                    shadow-2xl
                    p-8
                    max-h-[90vh] overflow-y-auto
                    border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold">
                            Discovery Assessment
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Question {currentQ + 1} of {questions.length} • {q.category}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* progress */}
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                {/* questions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQ}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                    >
                        <p className="font-medium mb-4">{q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => selectAnswer(i)}
                                    className={`
                                        w-full text-left p-4 rounded-2xl text-sm transition-all
                                        ${
                                        selectedAnswer === i
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                                            : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        }
                                    `}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* navigation */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                        disabled={currentQ === 0}
                        className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 disabled:opacity-30"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    {currentQ === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedAnswer === undefined || submitting}
                            className="
                                flex items-center gap-2
                                px-6 py-2.5 rounded-2xl
                                bg-gradient-to-r from-indigo-500 to-purple-500
                                text-white font-semibold
                                hover:shadow-xl
                                disabled:opacity-50"
                        >
                            <Sparkles className="w-4 h-4" />
                            {submitting ? "Analyzing..." : "Complete Assessment"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQ(currentQ + 1)}
                            disabled={selectedAnswer === undefined}
                            className="
                                flex items-center gap-2
                                px-6 py-2.5 rounded-2xl
                                bg-gradient-to-r from-indigo-500 to-purple-500
                                text-white font-semibold
                                disabled:opacity-50"
                        >
                            Next <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
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
}

interface QuizQuestion {
    category: string;
    question: string;
    options: {
        label: string;
    }[];
}

const questions: QuizQuestion[] = [
    {
        category: "Creativity & Innovation",
        question: "When working on a project, what excites you most?",
        options: [
            { label: "Designing something visually beautiful"},
            { label: "Solving a complex technical challenge"},
            { label: "Leading the team to success"},
            { label: "Understanding everyone's perspective"},
        ],
    },
    {
        category: "Creativity & Innovation",
        question: "How do you prefer to express your ideas?",
        options: [
            { label: "Through art, music, or design"},
            { label: "Through data and analysis"},
            { label: "Through writing and storytelling"},
            { label: "Through building prototypes"},
        ],
    },
    {
        category: "Creativity & Innovation",
        question: "Your ideal creative environment is:",
        options: [
            { label: "A startup with constant innovation"},
            { label: "A research lab exploring unknowns"},
            { label: "A community arts center"},
            { label: "A tech company building products"},
        ],
    },
    {
        category: "Helping Others",
        question: "What motivates you to help others?",
        options: [
            { label: "Seeing someone overcome a challenge"},
            { label: "Teaching and sharing knowledge"},
            { label: "Building tools that improve lives"},
            { label: "Organizing communities for change"},
        ],
    },
    {
        category: "Helping Others",
        question: "In a group project, you naturally:",
        options: [
            { label: "Take charge and delegate tasks"},
            { label: "Make sure everyone feels included"},
            { label: "Focus on the technical details"},
            { label: "Come up with creative solutions"},
        ],
    },
    {
        category: "Financial Security",
        question: "What matters most in your future career?",
        options: [
            { label: "High salary and financial stability"},
            { label: "Making a positive impact on society"},
            { label: "Creative freedom and self-expression"},
            { label: "Recognition and leadership position"},
        ],
    },
    {
        category: "Financial Security",
        question: "When planning for the future, you tend to:",
        options: [
            { label: "Create detailed budgets and timelines"},
            { label: "Follow your passion regardless"},
            { label: "Seek advice from mentors"},
            { label: "Research market trends and data"},
        ],
    },
    {
        category: "Work-Life Balance",
        question: "Your ideal work schedule looks like:",
        options: [
            { label: "Flexible hours, remote work"},
            { label: "Structured 9-5 with clear boundaries"},
            { label: "Project-based with intense sprints"},
            { label: "Collaborative team environment daily"},
        ],
    },
    {
        category: "Work-Life Balance",
        question: "How do you recharge after a busy week?",
        options: [
            { label: "Creating art, music, or crafts"},
            { label: "Reading and learning new things"},
            { label: "Spending time with friends/family"},
            { label: "Physical activities and sports"},
        ],
    },
    {
        category: "Overall",
        question: "If you could have one superpower for your career, it would be:",
        options: [
            { label: "Infinite creativity"},
            { label: "Perfect logical reasoning"},
            { label: "Deep empathy for everyone"},
            { label: "Inspirational leadership"},
        ],
    },
];

export function DiscoveryAssessment({
    open,
    onClose,
    // onComplete,
}: DiscoveryAssessmentProps) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<(number | undefined)[]>(
        Array(questions.length).fill(undefined)
    );
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();

    if (!open) return null;

    const q = questions[currentQ];
    const selectedAnswer = answers[currentQ];
    const answeredCount = answers.filter(a => a !== undefined).length;
    const progress = (answeredCount / questions.length) * 100;

    const selectAnswer = (optionIndex: number) => {
        setAnswers(prev => {
            const updated = [...prev];
            updated[currentQ] = optionIndex;
            return updated;
        });
    };
    const allAnswered = answers.length === questions.length && answers.every(a => a !== undefined);

    const handleSubmit = () => {
        if (!user) return;

        if (!allAnswered) {
            toast.error("Please answer all questions first.");
            return;
        }
        setSubmitting(true);

        router.post(
            assesment(),
            {
                answers,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Discovery Assessment completed! 🧬");
                    onClose();
                },
                onError: () => {
                    toast.error("Failed to save assessment.");
                },
                onFinish: () => setSubmitting(false),
            }
        );
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
                            disabled={!allAnswered || submitting}
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
                            onClick={() => {
                                if (selectedAnswer === undefined) {
                                    toast.warning("Choose an answer first");
                                    return;
                                }
                                setCurrentQ(currentQ + 1)
                            }}
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
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

import { discovery } from "@/routes";

interface discoveryAssessment {
    motivation_words: string;
}

interface AIReflectionCardProps {
    discoveryAssessment: discoveryAssessment | null;
}

export function AIReflectionCard({
    discoveryAssessment,
}: AIReflectionCardProps) {
    const message = discoveryAssessment?.motivation_words;
    const hasMessage = message && message.trim().length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dark:bg-stone-600 bg-[#f1f3f3]
                       rounded-2xl shadow-sm p-6 flex gap-4 items-start"
        >
            {/* icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full
                dark:bg-gray-100 bg-white px-2">
                <Brain className="w-5 h-5 text-gray-900" />
            </div>

            {/* content */}
            <div className="flex flex-col gap-1">
                {hasMessage ? (
                    <div>
                        <h2 className="font-bold">Motivation Words</h2>
                        <p className="dark:text-gray-100 text-gray-900 italic mt-2 leading-relaxed">
                            "{message}"
                        </p>
                    </div>
                ) : (
                    <p className="dark:text-gray-100 text-gray-900 mt-2 leading-relaxed">
                        Your personalized reflection is waiting to be unlocked.
                        Complete your discovery assessment to receive daily AI
                        guidance tailored to your goals and potential.{" "}
                        <Link
                            href={discovery().url}
                            className="font-semibold text-violet-400 hover:underline"
                        >
                            Click here to start your assessment →
                        </Link>
                    </p>
                )}
            </div>
        </motion.div>
    );
}
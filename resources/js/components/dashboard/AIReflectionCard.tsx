import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export function AIReflectionCard() {
    const message =
        "If you could solve one real-world problem with technology, what would it be and why? Think about the skills you'd need to learn.";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dark:bg-stone-600 bg-[#f1f3f3]
                       rounded-2xl shadow-sm p-6 flex gap-4 items-start"
        >
            {/* icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full
                dark:bg-gray-100 bg-white">
                <Brain className="w-5 h-5 text-gray-900" />
            </div>

            {/* content */}
            <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                    <span className="font-semibold dark:text-gray-100 text-gray-900">
                        AI Reflection
                    </span>
                    <span className="text-sm dark:text-gray-200 text-gray-700">
                        Daily prompt from your mentor
                    </span>
                </div>
                <p className="dark:text-gray-100 text-gray-900 italic mt-2 leading-relaxed">
                    "{message}"
                </p>
            </div>
        </motion.div>
    );
}
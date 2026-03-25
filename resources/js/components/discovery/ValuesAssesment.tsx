import { motion } from "framer-motion"

export default function ValuesAssesment() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border"
        >
            <h2 className="text-lg font-semibold mb-4">
                Values Assessment
            </h2>
            <div className="rounded-xl bg-emerald-50 border dark:bg-emerald-700 border-emerald-100 dark:border-emerald-600 px-6 py-6 flex flex-col items-center text-center gap-1">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300 font-medium">
                    <span className="text-lg">✅</span>
                    <span>Assessment Complete!</span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-white">
                    Your Career DNA has been updated
                </p>
                <button className="mt-4 text-base font-medium dark:font-bold text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-500 transition">
                    Start Assessment
                </button>
            </div>
        </motion.div>
    )
}
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Circle,
    Play,
    BookOpen,
    Lightbulb,
    Briefcase,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
    clipboard: CheckCircle2,
    play: Play,
    book: BookOpen,
    lightbulb: Lightbulb,
    circle: Circle,
};

const recommended = [
    { title: "Design Thinking 101", category: "Course", duration: "4 min", icon: Lightbulb, link: "https://www.youtube.com/watch?v=6lmvCqvmjfE" },
    { title: "Learn Web Development", category: "Video", duration: "12 min", icon: Briefcase, link: "https://www.youtube.com/watch?v=ysEN5RaKOlA&t=50s" },
    { title: "Creative Coding", category: "Workshop", duration: "300 min", icon: BookOpen, link: "https://www.youtube.com/watch?v=4JzDttgdILQ" },
];

interface ActionItem {
    id: string;
    title: string;
    completed: boolean;
    icon: string;
    sort_order: number;
}

export function ActionItems() {
    // local mock state
    const [items, setItems] = useState<ActionItem[]>([
        {
            id: "1",
            title: "Complete career interest quiz",
            completed: false,
            icon: "clipboard",
            sort_order: 1,
        },
        {
            id: "2",
            title: "Explore one career pathway",
            completed: false,
            icon: "lightbulb",
            sort_order: 2,
        },
        {
            id: "3",
            title: "Watch industry introduction video",
            completed: false,
            icon: "play",
            sort_order: 3,
        },
    ]);

    const toggleItem = (item: ActionItem) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === item.id ? { ...i, completed: !i.completed } : i
            )
        );
    };

    return (
        <div className="space-y-6">
            {/* action items */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold dark:text-gray-100 text-gray-900">
                        Action Items
                    </h3>
                    <span
                        className="
                        text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1
                        dark:bg-stone-500 dark:text-gray-100
                        bg-gray-200 text-gray-800
                        "
                    >
                        <Sparkles className="w-3 h-3" />
                        AI Suggested
                    </span>
                </div>
                <div className="space-y-2">
                    {items.map((item, i) => {
                        const Icon = iconMap[item.icon] || Circle;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => toggleItem(item)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition
                                    ${
                                        item.completed
                                            ? "dark:bg-green-900/30 bg-green-100"
                                            : "dark:bg-stone-600 bg-[#f1f3f3] hover:opacity-80"
                                    }
                                `}
                            >
                                {item.completed ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    </motion.div>
                                ) : (
                                    <Icon className="w-5 h-5 dark:text-gray-300 text-gray-600 flex-shrink-0" />
                                )}
                                <span
                                    className={`
                                        text-sm flex-1
                                        ${
                                            item.completed
                                                ? "line-through dark:text-gray-400 text-gray-500"
                                                : "dark:text-gray-100 text-gray-900"
                                        }
                                    `}
                                >
                                    {item.title}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* recommended */}
            <div className="mb-2">
                <h3 className="font-semibold dark:text-gray-100 text-gray-900 mb-3">
                    Recommended for You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommended.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="
                                p-4 rounded-2xl cursor-pointer transition
                                dark:bg-stone-600 bg-[#f1f3f3]
                                hover:shadow-md
                            "
                        >
                            <a href={item.link} target="_blank">
                                <div
                                    className="
                                    w-10 h-10 rounded-2xl flex items-center justify-center mb-3
                                    dark:bg-gray-100 bg-white
                                    "
                                >
                                    <item.icon className="w-5 h-5 text-[#8b5cf6]" />
                                </div>

                                <p className="text-sm font-semibold dark:text-gray-100 text-gray-900">
                                    {item.title}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8b5cf6] dark:text-violet-300">
                                        {item.category}
                                    </span>
                                    <span className="text-[10px] dark:text-gray-400 text-gray-600">
                                        • {item.duration}
                                    </span>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useAssessment } from "@/hooks/use-assessment";
import { addExperience } from "@/routes/adaptation";

type FormData = {
    experience_type: string;
    title: string;
    description: string;
    expected_outcome: string;
    status: string;
}

export default function AddExperience() {
    const [form, setForm] = useState<FormData>({
        experience_type: "INTERNSHIP",
        title: "",
        description: "",
        expected_outcome: "",
        status: "IN PROGRESS",
    });
    const [loading, setLoading] = useState(false);
    const { assessmentDone } = useAssessment();

    const handleChange = (
        key: keyof FormData,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        setLoading(true);

        router.post(addExperience().url, form, {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const fields = [
        {
            label: "TYPE",
            key: "experience_type",
            type: "select",
            options: [
                "INTERNSHIP",
                "PROJECT",
                "BUSINESS",
                "COURSE",
                "VOLUNTEER",
                "OTHER",
            ],
        },
        {
            label: "TITLE",
            key: "title",
            type: "input",
            placeholder: "e.g., Won Design Competition",
        },
        {
            label: "DESCRIPTION",
            key: "description",
            type: "input",
            placeholder: "Short description about your experience",
        },
        {
            label: "STATUS",
            key: "status",
            type: "select",
            options: [
                "IN PROGRESS",
                "COMPLETED",
            ],
        },
    ];

    const formatLabel = (text: string) => text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <div className="bg-card rounded-2xl p-6 shadow-sm border flex flex-col gap-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Experience
            </h2>

            {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground font-medium">
                        {field.label}
                    </label>

                    {/* select type */}
                    {field.type === "select" && (
                        <select
                            value={form[field.key as keyof FormData]}
                            onChange={(e) =>
                                handleChange(
                                    field.key as keyof FormData,
                                    e.target.value
                                )
                            }
                            className="rounded-lg bg-muted px-3 py-2"
                        >
                            {field.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                    {formatLabel(opt)}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* input type */}
                    {field.type === "input" && (
                        <input
                            value={form[field.key as keyof FormData]}
                            onChange={(e) =>
                                handleChange(
                                    field.key as keyof FormData,
                                    e.target.value
                                )
                            }
                            placeholder={field.placeholder}
                            className="rounded-lg bg-muted px-3 py-2"
                        />
                    )}

                    {/* textarea type */}
                    {field.type === "textarea" && (
                        <textarea
                            value={form[field.key as keyof FormData]}
                            onChange={(e) =>
                                handleChange(
                                    field.key as keyof FormData,
                                    e.target.value
                                )
                            }
                            placeholder={field.placeholder}
                            className="rounded-lg bg-muted px-3 py-2 min-h-[90px]"
                        />
                    )}
                </div>
            ))}
            {!assessmentDone ? (
                <button
                    disabled
                    className="mt-2 bg-muted-foreground text-gray-800 py-2 rounded-xl font-bold"
                >
                    COMPLETE YOUR ASSESSMENT FIRST
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl font-medium transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Entry"}
                </button>
            )}
        </div>
    )
}
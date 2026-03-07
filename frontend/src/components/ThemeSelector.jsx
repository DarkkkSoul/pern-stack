import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";

const THEMES = [
    "light",
    "dark"
];

function ThemeSelector() {

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "forest";
        }
        return "forest";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
                <PaletteIcon className="size-4" />
                <span className="hidden sm:inline">Theme</span>
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
            >
                {THEMES.map((t) => (
                    <li key={t}>
                        <button
                            onClick={() => setTheme(t)}
                            className={`flex justify-between ${theme === t ? "bg-primary text-primary-content" : ""
                                }`}
                        >
                            <span className="capitalize">{t}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ThemeSelector;
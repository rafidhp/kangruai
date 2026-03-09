import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <AppLogoIcon className="size-8 pt-1 fill-current text-white dark:text-[#423877]" />
                <span className="text-sm font-semibold dark:text-white text-[#423877]">Kangru</span>
            </div>
        </>
    );
}

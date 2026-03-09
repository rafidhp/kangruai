import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div {...props}>
            {/* light mode logo */}
            <img
                src="/assets/icons/kangru_logo_light.png"
                alt="kagru_logo"
                className="block dark:hidden object-contain h-6 w-auto"
            />
            
            {/* dark mode logo */}
            <img
                src="/assets/icons/kangru_logo_dark.png"
                alt="kagru_logo"
                className="hidden dark:block object-contain h-6 w-auto"
            />
        </div>
    );
}

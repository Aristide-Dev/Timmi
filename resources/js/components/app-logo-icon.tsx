import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/img/logo-timmi.jpg" alt="logo" className="w-full h-auto" {...props} />
    );
}

import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square w-full h-16 items-center justify-center rounded-md">
                <AppLogoIcon className="w-full h-full fill-current bg-cover text-white dark:text-black" />
            </div>
            {/* <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Laravel Starter Kit</span>
            </div> */}
        </>
    );
}

import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-18 items-center justify-center rounded-md">
                <AppLogoIcon className="size-18 fill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                {/* <span className="mb-0.5 truncate leading-tight font-semibold">Laravel Starter Kit</span> */}
            </div>
        </>
    );
}

import { ReactNode } from "react";


export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-">
            {children}
        </div>
    );
}
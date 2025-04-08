import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen w-full relative">

                <div className='grid md:grid-cols-2 !px-0'>
                    <img
                        src="/public/auth-banner.jpg"
                        alt="Bicycle in scenic path"
                        className="w-full h-full object-cover fixed md:relative top-0 left-0"
                    />
                    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center py-12 relative px-4 md:px-0">
                        <div className="w-full flex justify-center">
                        <Outlet />
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}
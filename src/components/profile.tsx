import { useMyDataQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Profile() {
    const { data, isLoading, isError } = useMyDataQuery(undefined);
    const [imageLoading, setImageLoading] = useState(true);

    const profile = data?.data?.profile || '/default-user.png';

    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
    };

    return (
        <div className="">
            {isLoading && (
               <Skeleton className="h-8 w-8 rounded-full" />
            )}
            
            {isError && (
                <img 
                src='/default-user.png' 
                alt="Profile"
                className={`w-full h-full object-cover rounded-full transition-opacity duration-300`}
            />
            )}
            
            {!isLoading && !isError && (
                <>
                    {imageLoading && (
                        <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
                    )}
                    
                    <img 
                        src={profile} 
                        alt="Profile"
                        className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={handleImageLoaded}
                        onError={handleImageError}
                    />
                </>
            )}
        </div>
    );
}
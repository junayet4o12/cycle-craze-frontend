import { useMyDataQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Profile() {
    const { data, isLoading, isError } = useMyDataQuery(undefined);
    const [imageLoading, setImageLoading] = useState(true);

    const profile = data?.data?.profile || '/default-user.png';

    // Handle image load complete
    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    // Handle image load error
    const handleImageError = () => {
        setImageLoading(false);
    };

    return (
        <div className="">
            {/* Data loading skeleton */}
            {isLoading && (
               <Skeleton className="h-8 w-8 rounded-full" />
            )}
            
            {/* Error state */}
            {isError && (
                <img 
                src='/default-user.png' 
                alt="Profile"
                className={`w-full h-full object-cover rounded-full transition-opacity duration-300`}
            />
            )}
            
            {/* Image with loading state */}
            {!isLoading && !isError && (
                <>
                    {/* Image loading skeleton - shows while image is loading */}
                    {imageLoading && (
                        <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
                    )}
                    
                    {/* Actual image - opacity transitions from 0 to 1 when loaded */}
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
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Share2, Twitter } from "lucide-react";

export default function PD_Share() {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(currentUrl);

    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareToTwitter = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const openInstagram = () => {
        // Instagram doesn't allow direct sharing via URL
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }; 

    const shareNative = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: document.title,
                    url: currentUrl,
                })
                .catch((error) => console.error("Native share failed:", error));
        } else {
            alert("Native sharing is not supported on this device.");
        }
    };

    return (
        <div className="flex gap-3">
            <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={shareToFacebook}
            >
                <Facebook size={16} />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={shareToTwitter}
            >
                <Twitter size={16} />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={openInstagram}
            >
                <Instagram size={16} />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={shareNative}
            >
                <Share2 size={16} />
            </Button>
        </div>
    );
}

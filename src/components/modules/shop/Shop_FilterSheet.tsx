
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Shop_FilterPanel from "./Shop_FilterPanel";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export default function Shop_FilterSheet() {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const priceRangeParams = searchParams.get('priceRange');
    const currentPriceRange = priceRangeParams?.split('-').map(Number) || [0, 100000];
    const navigate = useNavigate()
    const [priceRange, setPriceRange] = useState<number[]>(currentPriceRange);

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
        if (pathname !== '/shop') {
            navigate('/shop')
        }
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Button onClick={handleOpen} variant="ghost" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <SheetContent side="left" className="w-80 px-4 py-8">
                <h2 className="text-lg font-semibold mb-6">Filters</h2>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                    <Shop_FilterPanel priceRange={priceRange} setPriceRange={setPriceRange} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
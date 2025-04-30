import { TableCell, TableRow } from "@/components/ui/table";
import { WishlistProductType } from "@/types";
import { dateToStringDate } from "@/utils/dateToStringDate";


export default function WishlistRow({ product }: { product: WishlistProductType }) {
    return (
        <TableRow className="relative">
            <TableCell>
                <div className="flex items-center space-x-4 relative">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/api/placeholder/64/64";
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                {dateToStringDate(product.addedTime)}
            </TableCell>
            <TableCell>
                
            </TableCell>
        </TableRow>
    );
}
import PD_Descriptions from "@/components/modules/product-details/PD_Descriptions";
import PD_ImageSlider from "@/components/modules/product-details/PD_ImageSlider";
import PD_RightSideDetails from "@/components/modules/product-details/PD_RightSideDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductQuery } from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";


export default function ProductDetails() {
    const { id } = useParams();

    const { data, isLoading, isFetching } = useProductQuery({ productId: id as string }, {
        skip: !id
    })
    if (isLoading || isFetching) {
        return <section className="py-8">
            <div className="flex flex-col lg:flex-row w-full text-white gap-8 p-6">
                {/* Product Image Area */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <Skeleton className="w-full aspect-[3/2] rounded-md bg-gray-800" />
                    <div className="flex gap-2 justify-center">
                        <Skeleton className="w-16 h-16 rounded-md bg-gray-800" />
                        <Skeleton className="w-16 h-16 rounded-md bg-gray-800" />
                        <Skeleton className="w-16 h-16 rounded-md bg-gray-800" />
                    </div>
                </div>


                {/* Product Info Area */}
                <div className="w-full lg:w-1/2 space-y-6">
                    {/* Product Title */}
                    <Skeleton className="h-10 w-4/5 bg-gray-800" />

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-24 bg-gray-800" />
                        <Skeleton className="h-6 w-16 bg-gray-700" />
                    </div>

                    {/* Quantity selector */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-24 bg-gray-800" />
                        </div>
                        <Skeleton className="h-6 w-32 bg-gray-700" />
                    </div>

                    {/* Buy buttons */}
                    <div className="flex gap-4">
                        <Skeleton className="h-12 w-1/2 rounded-md bg-gray-800" />
                        <Skeleton className="h-12 w-1/2 rounded-md bg-gray-800" />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-8 w-28 bg-gray-800" />
                        <Skeleton className="h-8 w-28 bg-gray-800" />
                        <Skeleton className="h-8 w-28 bg-gray-800" />
                    </div>

                    {/* Social sharing */}
                    <div className="pt-4">
                        <Skeleton className="h-6 w-20 mb-3 bg-gray-800" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="pt-6">
                        <div className="flex gap-4 border-b border-gray-800 pb-2">
                            <Skeleton className="h-8 w-28 bg-gray-800" />
                            <Skeleton className="h-8 w-28 bg-gray-700" />
                        </div>
                        <div className="pt-4">
                            <Skeleton className="h-4 w-full bg-gray-800 mb-2" />
                            <Skeleton className="h-4 w-5/6 bg-gray-800 mb-2" />
                            <Skeleton className="h-4 w-4/6 bg-gray-800" />
                        </div>
                    </div>
                </div>
            </div >
        </section>
    }
    const productData = data?.data;
    return (
        <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <PD_ImageSlider id={productData?._id as string} images={productData?.images || []} />
                {productData && <PD_RightSideDetails product={productData} />}
                {productData && <div className="md:col-span-2"><PD_Descriptions product={productData} /></div>}

            </div>

        </section>
    );
}
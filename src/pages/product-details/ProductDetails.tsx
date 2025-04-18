import PD_ImageSlider from "@/components/modules/product-details/PD_ImageSlider";
import PD_RightSideDetails from "@/components/modules/product-details/PD_RightSideDetails";
import { useProductQuery } from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";


export default function ProductDetails() {
    const { id } = useParams();
    console.log(typeof id === 'string');

    const { data, isLoading, isFetching } = useProductQuery(id as string, {
        skip: !id
    })
    if (isLoading || isFetching) {
        return ''
    }
    const productData = data?.data;

    return (
        <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <PD_ImageSlider images={productData?.images || []} />
                {productData && <PD_RightSideDetails product={productData} />}

            </div>

        </section>
    );
}
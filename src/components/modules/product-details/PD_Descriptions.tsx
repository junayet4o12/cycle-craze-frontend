
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IProduct } from "@/types";
export default function PD_Descriptions({ product }: { product: IProduct }) {
    return (
        <div>
            <Separator className="mb-6" />

            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-sm">
                    <div className="prose prose-sm max-w-none">
                        <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    </div>
                </TabsContent>
                <TabsContent value="specifications">
                    <div className="space-y-3">
                        {/* Basic specs */}
                        <div className="grid grid-cols-2 text-sm">
                            <span className="font-medium">Brand:</span>
                            <span>{product.brand}</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                            <span className="font-medium">Category:</span>
                            <span>{product.category}</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                            <span className="font-medium">Material:</span>
                            <span>{product.frameMaterial}</span>
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                            <span className="font-medium">Wheel Size:</span>
                            <span>{product.wheelSize}"</span>
                        </div>

                        {/* Dynamic specifications */}
                        {
                            product.specifications.length > 0 && <>
                                <Separator className="my-3" />
                                <h3 className="font-medium mb-2">Additional Specifications</h3>
                                {product.specifications.map((spec, index) => (
                                    <div key={index} className="grid grid-cols-2 text-sm">
                                        <span className="font-medium">{spec.key}:</span>
                                        <span>{spec.value}</span>
                                    </div>
                                ))}
                            </>
                        }

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
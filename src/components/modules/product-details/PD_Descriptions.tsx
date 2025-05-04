
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useIsAdmin from "@/hooks/useIsAdmin";
import { IProduct } from "@/types";
import { PencilLineIcon } from "lucide-react";
import { useState } from "react";
import MP_EditSpecification from "../dashboard/manage-products/MP_EditSpecification";
export default function PD_Descriptions({ product }: { product: IProduct }) {
    const [specificationOpen, setSpecificationOpen] = useState(false)
    const [isAdmin, isLoading] = useIsAdmin()
    return (
        <div>
            <Separator className="mb-6" />

            <Tabs defaultValue="description" className="w-full">
                <div className="flex justify-between  items-center">
                    <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    </TabsList>
                    {!isLoading && isAdmin && <Button onClick={() => setSpecificationOpen(true)} variant={"outline"} size={"icon"} >
                        <PencilLineIcon className='cursor-pointer size-5' />
                    </Button>}
                </div>
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
            {!isLoading && isAdmin && <MP_EditSpecification isDialogOpen={specificationOpen} setIsDialogOpen={setSpecificationOpen} product={product} />}
        </div>
    );
}
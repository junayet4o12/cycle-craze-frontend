import { TMeta } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

export default function DefaultPagination({ meta, showItemPerPage = true }: { meta: TMeta, showItemPerPage?: boolean }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentLimit = searchParams.get("limit") || String(meta.limit);

    const handleLimitChange = (value: string) => {
        searchParams.set("limit", value);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    return (
        <div className="flex flex-col justify-end gap-4 mt-6">
            {/* Pagination Controls */}
            <Pagination className="max-w-max mx-0 ml-auto">
                <PaginationContent>
                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (meta.page > 1) {
                                    searchParams.set("page", String(meta.page - 1));
                                    setSearchParams(searchParams);
                                }
                            }}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {[...Array(meta.totalPage)].map((_, index) => {
                        const currentPage = index + 1;
                        return (
                            <PaginationItem key={currentPage}>
                                <PaginationLink
                                    isActive={currentPage === meta.page}
                                    onClick={() => {
                                        searchParams.set("page", String(currentPage));
                                        setSearchParams(searchParams);
                                    }}
                                >
                                    {currentPage}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (meta.page < meta.totalPage) {
                                    searchParams.set("page", String(meta.page + 1));
                                    setSearchParams(searchParams);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            {/* Limit Selector */}
            {
                showItemPerPage && <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-muted-foreground">Items per page:</span>
                    <Select defaultValue={currentLimit} onValueChange={handleLimitChange}>
                        <SelectTrigger className="w-[80px] h-9">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {[2, 5, 10, 20, 30, 50, 100].map((option) => (
                                <SelectItem key={option} value={String(option)}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }



        </div>
    );
}

import { order_status } from "@/constant/order.const";
import { Check, Clock, Truck } from "lucide-react";

const StatusProgress = ({ status }: { status: typeof order_status[number] }) => {
    const activeProcessing = status === 'DELIVERED' || status === 'SHIPPED';

    return (
        <div className="flex gap-1 justify-center items-center xs:px-5 pb-5">
            {/* Pending */}
            <div className="size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative bg-primary text-white">
                <p className="text-2xl xs:text-3xl sm:text-4xl">
                    <Clock />
                </p>
                <p className="absolute bottom-[-25px] text-sm font-medium text-muted-foreground">Pending</p>
            </div>

            {/* Shipped */}
            <div className="flex items-center gap-1">
                <div
                    className={`w-10 h-[5px] xs:w-20 xs:h-1.5 sm:w-28 sm:h-2 border border-primary rounded-full ${
                        activeProcessing ? "bg-primary" : ""
                    }`}
                ></div>
                <div
                    className={`size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative ${
                        activeProcessing ? "bg-primary text-white" : " text-muted-foreground"
                    }`}
                >
                    <p className="text-2xl xs:text-3xl sm:text-4xl">
                        <Truck />
                    </p>
                    <p className="absolute bottom-[-25px] text-sm font-medium text-muted-foreground">Shipped</p>
                </div>
            </div>

            {/* Delivered */}
            <div className="flex items-center gap-1">
                <div
                    className={`w-10 h-[5px] xs:w-20 xs:h-1.5 sm:w-28 sm:h-2 border border-primary rounded-full ${
                        status === "DELIVERED" ? "bg-primary" : ""
                    }`}
                ></div>
                <div
                    className={`size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative ${
                        status === "DELIVERED" ? "bg-primary text-white" : " text-muted-foreground"
                    }`}
                >
                    <p className="text-2xl xs:text-3xl sm:text-4xl">
                        <Check />
                    </p>
                    <p className="absolute bottom-[-25px] text-sm font-medium text-muted-foreground">Delivered</p>
                </div>
            </div>
        </div>
    );
};

export default StatusProgress;

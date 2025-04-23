import { TableCell, TableRow } from "@/components/ui/table";
import { IOrder } from "@/types";
import MO_StatusBadge from "./MO_StatusBadge";
import { dateToStringDate } from "@/utils/dateToStringDate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ReceiptText, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { order_status } from "@/constant/order.const";
import { useDeleteOrderMutation, useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";


export default function MO_SingleOrder({ order, index }: { order: IOrder, index: number }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation()
    const [deleteOrders, { isLoading: isDeleteLoading }] = useDeleteOrderMutation();
    const handleStatusChange = async (value: typeof order_status[number]) => {
        const toastId = toast.loading(`Status is setting to  "${value}"`)
        try {
            await updateStatus({ orderId: order._id, status: value }).unwrap()
            toast.success(`Status successfully set to  "${value}"`, { id: toastId })
        } catch (error) {
            toast.success(errorMessageGenerator(error), { id: toastId })
        }

    }
    const deleteOrder = async () => {
        const toastId = toast.loading(`Order is deleting...`)
        try {
            await deleteOrders(order._id).unwrap()
            toast.success(`Order Deleted Successfully`, { id: toastId })
        } catch (error) {
            toast.success(errorMessageGenerator(error), { id: toastId })
        }
    }
    const loading = isLoading || isDeleteLoading
    return (
        <>
            <TableRow>
                <TableCell>0{index}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>{order.email || '------'}</TableCell>
                <TableCell><MO_StatusBadge status={order.status} /></TableCell>
                <TableCell>৳{order.totalPrice}</TableCell>
                <TableCell>{dateToStringDate(order.createdAt)}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem> */}
                            <DropdownMenuItem disabled={loading} className="cursor-pointer"
                            >
                                <ReceiptText className="mr-2 h-4 w-4" />
                                Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setTimeout(() => {
                                        setIsDeleteDialogOpen(true);
                                    }, 50); // ⏱ slight delay lets the dropdown fully close
                                }}
                                disabled={loading} className="cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <RadioGroup disabled={loading} className="flex gap-4 px-2 pb-3" value={order.status} onValueChange={handleStatusChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem className="" value="PENDING" id="r1" />
                                    <Label htmlFor="r1">Pending</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="SHIPPED" id="r2" />
                                    <Label htmlFor="r2">Shipped</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="DELIVERED" id="r3" />
                                    <Label htmlFor="r3">Delivered</Label>
                                </div>
                            </RadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the Order.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteOrder} disabled={loading}>
                            {isDeleteLoading ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { TUserDataBackend } from "@/types";
import { HomeIcon, PhoneIcon, UserRoundPen } from "lucide-react";
import UserRoleBadge from "./UserRoleBadge";
import { Switch } from "@/components/ui/switch";
import { useToggleUserRoleMutation, useToggleUserStateMutation } from "@/redux/features/user/userApi";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MU_SU_EditForm from "./MU_SU_EditForm";
import { dateToStringDate } from "@/utils/dateToStringDate";
import useIsAdmin from "@/hooks/useIsAdmin";

export default function MU_SingleUser({ user, index }: { user: TUserDataBackend; index: number }) {
    const [toggleState, { isLoading: isToggleStateLoading }] = useToggleUserStateMutation()
    const [toggleRole, { isLoading: isToggleRoleLoading }] = useToggleUserRoleMutation()
    const [, isAdminLoading, isSuperAdmin] = useIsAdmin()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleUserBlockStatusChange = async () => {
        const toastId = toast.loading('Changing Block Status...')
        try {
            await toggleState(user._id).unwrap();
            toast.success('Block Status Changed Successfully!!', { id: toastId })
        } catch (error) {
            toast.error(errorMessageGenerator(error), { id: toastId })
        }
    }

    const handleUserRoleChange = async () => {
        const toastId = toast.loading('Changing User Role...')
        try {
            await toggleRole(user._id).unwrap();
            toast.success('User Role Changed Successfully!!', { id: toastId })
        } catch (error) {
            toast.error(errorMessageGenerator(error), { id: toastId })
        }
    }

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <Avatar className="w-10 h-10 bg-card">
                    <AvatarImage className="object-cover" src={user.profile || "/default-user.png"} alt={user.name} />
                    <AvatarFallback>{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-foreground/70">
                        <PhoneIcon className="h-3 w-3" />
                        <p className="text-sm">{user.contactNumber}</p>
                    </div>

                    <div className="flex items-center space-x-1 text-foreground/70">
                        <HomeIcon className="h-3 w-3" />
                        <p className="text-sm truncate max-w-[150px]" title={user.address || 'Not given'}>
                            {user.address || 'Not given'}
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell>{dateToStringDate(user.createdAt || '')}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <UserRoleBadge role={user.role} />
                    {!isAdminLoading && isSuperAdmin && <Switch
                        disabled={isToggleRoleLoading}
                        checked={user.role === 'admin'}
                        onCheckedChange={handleUserRoleChange}
                    />}
                </div>
            </TableCell>
            <TableCell>
                <Switch
                    disabled={isToggleStateLoading}
                    checked={user.isBlock}
                    onCheckedChange={handleUserBlockStatusChange}
                />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <UserRoundPen />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[700px] ">
                            <DialogHeader>
                                <DialogTitle>Edit User Data</DialogTitle>
                                <DialogDescription>
                                    <MU_SU_EditForm userData={user} setIsOpen={setIsDialogOpen} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </TableCell>
        </TableRow>
    );
}
import { selectCurrentUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useMyDataQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";


export default function useIsAdmin() {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(selectCurrentUser)
    const { data, isLoading: isAdminLoading } = useMyDataQuery(undefined, {
        skip: !token
    });
    const isAdmin = user && data?.data?.role === 'admin'
    return [isAdmin, isAdminLoading] as const
}
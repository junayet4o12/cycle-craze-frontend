import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { toast } from "sonner";
import { config } from "@/config/config";
const backend_api = config.backend_api


const baseQuery = fetchBaseQuery({
    baseUrl: backend_api,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `${token}`)
        }

        return headers
    }
})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 404) {
        const err = result?.error as any
        toast.error(errorMessageGenerator(err))
    }
    if (result.error?.status === 401) {
        console.log('sending refresh token');
        const res = await fetch(`${backend_api}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include'
        })
        const data = await res.json()
        const user = (api.getState() as RootState).auth.user
        if (data?.data?.accessToken) {
            api.dispatch(setUser({
                user,
                token: data.data.accessToken
            }))

        } else {
            api.dispatch(logout())
        }
        result = await baseQuery(args, api, extraOptions);

    }
    return result
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['User', 'Products', 'Orders', 'Subscribes'],
    endpoints: () => ({})
})
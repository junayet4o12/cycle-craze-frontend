import { TResponseRedux, TUserData } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        myData: builder.query({
            query: () => ({
                url: '/users/me',
                method: 'GET'
            }),
            providesTags: ['User'],
        }),
        updateMyData: builder.mutation({
            query: (userInfo) => ({
                url: '/users/me',
                method: 'PATCH',
                body: userInfo
            }),
            transformResponse: (response: TResponseRedux<TUserData[]>) => {
                return response
            },
            invalidatesTags: ['User'],
        }),
    })
})

export const { useMyDataQuery, useUpdateMyDataMutation } = userApi;
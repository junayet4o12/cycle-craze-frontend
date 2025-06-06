import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ["User"],
        }),
        signup: builder.mutation({
            query: (userInfo) => ({
                url: '/users',
                method: 'POST',
                body: userInfo
            })
        }),
        forgotPassword: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: userInfo
            })
        }),
        resetPassword: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: userInfo,
            })
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
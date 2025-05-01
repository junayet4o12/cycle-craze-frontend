import { TQueryParams, TResponseRedux, TUserData } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /users
    users: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name as string, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["User"],
      transformResponse: (response: TResponseRedux<TUserData[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // GET /users/me
    myData: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: TResponseRedux<TUserData>) => ({
        data: response.data,
      }),
    }),

    // PATCH /users/me
    updateMyData: builder.mutation({
      query: (userInfo) => ({
        url: "/users/me",
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    // GET /users/:id
    user: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
      transformResponse: (response: TResponseRedux<TUserData>) => ({
        data: response.data,
      }),
    }),

    // PATCH /users/:id
    updateUser: builder.mutation({
      query: ({ userId, updatedData }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        "User",
        { type: "User", id: userId },
      ],
    }),

    // PATCH /users/:id/toggle-state
    toggleUserState: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}/toggle-state`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // POST /users
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUsersQuery,
  useMyDataQuery,
  useUserQuery,
  useUpdateUserMutation,
  useUpdateMyDataMutation,
  useToggleUserStateMutation,
  useCreateUserMutation,
} = userApi;

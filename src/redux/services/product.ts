import { api } from './api';

export interface RecentActivity {
    UserDataId: string
}

export interface AudioInternalMedicineResponse {
    UserDataId:string,
}

export interface RecommendedActivity extends RecentActivity {
    userId: string
}

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.mutation<any, {}>({
            query(body) {
                return {
                  url: '/products',
                  method: 'GET',
                  body,
                }
            },
            invalidatesTags: ['Product'],
        })
    }),
  })
export const { useGetProductMutation } = productApi

/*
GET TYPE
Also don't forget to add use and Query to your exported hook's name.
For example:
name of your endpoint: getPhotoList
name of the hook to be exported: useGetPhotoListQuery 

POST TYPE
For example:
name of your endpoint: signInUser
name of the hook to be exported: useSignInUserMutation 
*/
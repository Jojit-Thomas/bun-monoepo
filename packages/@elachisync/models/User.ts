import { Types } from 'mongoose'
import type { Media } from './Media'

// export interface User {
//     email: string
//     firstName: string
//     lastName: string
//     // image?: Image
//     fcmToken: string[]
//     // onboardingStage: ONBOARDING_STAGE
//     isSuperAdmin: boolean
// }

// export enum ONBOARDING_STAGE {
//     WELCOME = 'welcome',
//     CREATE_A_SHOPIFY_STORE = 'create_shopify_store',
//     CONNECT_SHOPIFY_STORE = 'connect_shopify_store',
//     ONBOARDED = 'onboarded',
// }

// export interface UserBackend extends User {
//     _id: Types.ObjectId
//     password: string
//     isEmailVerified: boolean
//     emailOtp: number | null
//     emailOtpExpiry: number | null
//     createdAt: Date
//     updatedAt: Date
// }

export interface User {
    email: string
    name: {
        first: string
        last: string
    },
    mobile: string
    profileImage: Media
    fcmToken: string[]
    isSuperAdmin: boolean
}

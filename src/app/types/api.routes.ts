export const ApiRoutes = {
    identity:{
        login: "identity/login",
        signout: "identity/sign-out",
        staffRegister: "identity/staff-registration/register",
        genders: "identity/staff-registration/gender",
        contracts: "identity/staff-registration/contract-type",
        updatePass: "identity/reset-password",
        schoolLogo: "identity/school-logo",
        dashboardLogo: "identity/dashboard-logo",
    },

    account: {
        profile: "security-services/profile",
        changePass: "security-services/update-password",
    },

    // result checker
    resultChecker: {
        sessions: "portal/result-checker/available-sessions",
        classes: "portal/result-checker/available-classes",
        terms: "portal/result-checker/terms",
        result: "portal/result-checker/student-result",
        printResult: "portal/result-checker/print-result",
        availResults: "portal/result-checker/available-std-results",
    },

    student: {
        profile: "portal/student/profile",
        updateProfile: "portal/student/update-profile",
        updateProfilePicture: "portal/student/update-profile-image",
        genders: "portal/student/gender",
        alive: "portal/student/alive",
        dashboard: "portal/student/dashboard",
        classes: "portal/student/classes",
    },

    finance:{
        banking:{
            accountInfo: "portal/student/account-info",
            transactions: "portal/student/transactions",
            accountInvoice: "portal/student/account-invoices"
        }
    },
}
export const routesConfig = {
    SHOP: {
        url: '/',
    },
    SINGLE_PRODUCT: {
        url: '/product/:productID',
        dinamicURL: (productID) => {
            return `/product/${productID}`;
        },
    },
    CONTACT: {
        url: '/contact',
    },
    ORDER: {
        url: '/order',
    },
    AUTHORIZATION: {
        url: '/authorization',
    },
    DASHBOARD: {
        url: '/dashboard',
    },
    DASHBOARD_ADD_PRODUCT: {
        url: 'add-product',
    },
    DASHBOARD_USERS: {
        url: 'users',
    },
    DASHBOARD_COMMENTS: {
        url: 'comments',
    }
};
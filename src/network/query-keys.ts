const queryKeys = {
    users: {
        getMe: ['me', 'getMe'] as const,
        getUsers: ['users', 'getUsers'] as const,
    },
}

export default queryKeys;
import { User } from '../users/user.entity';

export const common = {
    secret: 'mysecretkey',

    database: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'users',
        entities: [
            User
        ],
        synchronize: true,
    },
};


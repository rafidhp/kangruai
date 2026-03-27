export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    username: string;
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

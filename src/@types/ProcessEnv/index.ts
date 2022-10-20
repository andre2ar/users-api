export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string
            SERVER_PORT: string
            JWT_SECRET: string
        }
    }
}

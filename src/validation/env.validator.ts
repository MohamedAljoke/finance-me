import z from 'zod';

enum EEnvironment {
  development = 'development',
  production = 'production',
}
const EnvSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_ACCESS_TOKEN_HASH_KEY: z.string(),
  NODE_ENV: z.nativeEnum(EEnvironment),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;

export const validatedEnv = EnvSchema.parse(process.env);

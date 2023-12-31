import z from 'zod';

enum EEnvironment {
  development = 'development',
  production = 'production',
}
const EnvSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.nativeEnum(EEnvironment),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;

export const validatedEnv = EnvSchema.parse(process.env);

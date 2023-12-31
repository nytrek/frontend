import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
});

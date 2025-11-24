import { z } from "zod";


export const authSchema = z.object({
  username: z.email("Girdiğiniz format emaile uygun değildir"),
  password: z.string().min(6,"Sifre en az 6 karakter olmali")
})

export type AuthInput = z.infer<typeof authSchema>

export type UserDTO = {
  id: number;
  username: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

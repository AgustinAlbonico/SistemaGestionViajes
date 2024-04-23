import { PrismaClient } from "@prisma/client";
import { UserModel } from "../models/user.model";

const prisma = new PrismaClient();

export const getUser = (username: string): Promise<UserModel | null> => {
  return prisma.camionero.findFirst({
    where: {
      username,
    },
  });
};

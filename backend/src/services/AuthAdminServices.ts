import { PrismaClient } from "@prisma/client";
import { AdminModel } from "../models/admin.model";

const prisma = new PrismaClient();

export const getUser = (username: string): Promise<AdminModel | null> => {
  return prisma.admin.findFirst({
    where: {
      admin_username: username,
    },
  });
};

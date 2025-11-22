import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/passwords";
const db = new PrismaClient()
// import { productImage, products, users } from "./schema";
import * as dotenv from "dotenv";
// import slugify from "slugify";
dotenv.config({
  path: ".env",
});

const registerAdminUser = async () => {
  const email = process.env.SUPERUSER_EMAIL;
  const password = process.env.SUPERUSER_PASSWORD;
  console.log(email, password);
  if (!email || !password) {
    throw new Error(" SUPERUSER CREDENTIALS ARE REQUIRED");
  }
  const hashed = await hashPassword(password);
  try {
    const exists = await db.user.findFirst({
      where: { email },
    });
    if (!exists) {
      await db.user.create({
        data: {
          email,
          password: hashed,
        },
      });
    } else {
      console.log(`${email} already registered`);
    }
    console.log(`${name} ${email} has been registered `);
  } catch (err) {
    console.error(err);
  }
};

const seed = async () => {
  console.log("starting seeding the database");
  await registerAdminUser();
  // await seedProducts();
};

seed().catch((e) => {
  console.error(e);
  process.exit();
});

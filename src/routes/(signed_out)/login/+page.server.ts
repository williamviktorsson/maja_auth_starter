import { fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib";

export const actions = {
  login: async ({ request, cookies, locals }) => {
    let data = await request.formData();
    let username = data.get("username")?.toString();
    let password = data.get("password")?.toString();
    if (username && password) {
      let existingUser = await prisma.user.findUnique({
        where: { name: username },
      });

      if (existingUser) {
        // user exists, check if passwords match
        if (existingUser.password == password) {
          const token = await prisma.token.create({
            data: { userId: existingUser.id },
          });
          cookies.set("token_id", token.id, { secure: false });
          throw redirect(307, "/"); // login
        } else {
          return fail(400, { error: "invalid credentials" });
        }
      } else {
        return fail(400, { error: "user does not exist" });
      }
    } else {
      return fail(400, { error: "incomplete data submitted" });
    }
  },
  logout: async ({ request, cookies }) => {
    let token = cookies.get("token_id");
    if (!token) {
      throw redirect(307, "/login"); // login
    }
    cookies.delete("token_id");
    await prisma.token.delete({ where: { id: token } });
  },
};

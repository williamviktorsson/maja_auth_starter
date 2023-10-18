import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib";

export const load = (async ({ }) => {
  let result = await prisma.group.findMany({
    include: { messages: { select: { id: true } } },
  });

  return { groups: result };
}) satisfies PageServerLoad;

export const actions: Actions = {
  create: async ({ request }) => {
    let data = await request.formData();
    let groupName = data.get("groupName")?.toString();
    if (!groupName) {
      return fail(400, { groupName: "Please supply a name" });
    }

    let result = await prisma.group.create({ data: { name: groupName } });
  },
};

import type { PageServerLoad } from "./$types";

// /routes/groups/[group]/+page.server.ts

import { error, fail, type Actions, redirect } from "@sveltejs/kit";
import { prisma } from "$lib";

export const load = (async ({ params, cookies }) => {
  let group_id = params.group_id;

  let result = await prisma.group.findFirst({
    where: { id: group_id },
    include: { messages: { include: { user: { select: { name: true } } } } },
  });

  if (!result) {
    throw error(418, "group not found");
  }

  let messages = result.messages;

  return { group: result.name, messages };
}) satisfies PageServerLoad;

export const actions: Actions = {
  message: async ({ request, params, cookies }) => {
    let group_id = params.group_id;

    let result = await prisma.group.findFirst({
      where: { id: group_id },
      include: { messages: true },
    });

    if (!result || !group_id) {
      throw error(418, "group not found");
    }

    let data = await request.formData();
    let message = data.get("message")?.toString();

    if (!message) {
      return fail(400, { message: "not found" });
    }

    let username = cookies.get("username");
    if (!username) {
      throw redirect(303, "/");
    }

    const sendingUser = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!sendingUser) {
      throw redirect(303, "/");
    }

    await prisma.message.create({
      data: {
        groupId: group_id,
        userId: sendingUser.id,
        content: message,
      },
    });
  },
};

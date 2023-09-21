import type { PageServerLoad } from "./$types";

// /routes/sessions/[session]/+page.server.ts

import { _sessions } from "../+page.server";
import { error, fail, type Actions, redirect } from "@sveltejs/kit";

export const load = (async ({ params,cookies }) => {
  let session = params.session;

  let username = cookies.get("username");
  if (!username) {
    throw redirect(303, "/login");
  }

  if (!_sessions.has(session)) {
    throw error(418, "session not found");
  }

  let messages = _sessions.get(session)!;

  return { session, messages };
}) satisfies PageServerLoad;

export const actions: Actions = {
  message: async ({ request, params }) => {
    let session = params.session;

    if (!session || !_sessions.has(session)) {
      throw error(418, "session not found");
    }

    let data = await request.formData();
    let message = data.get("message")?.toString();
    if (!message) {
      return fail(400, { message: "not found" });
    }
    let messages = _sessions.get(session)!;
    messages.push(message);
  },
};

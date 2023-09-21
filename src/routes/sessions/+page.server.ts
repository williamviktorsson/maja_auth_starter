import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// /routes/sessions/+page.server.ts

export let _sessions: Map<string, string[]> = new Map();

export const load = (async ({ cookies }) => {
  let username = cookies.get("username");
  if (!username) {
    throw redirect(303, "/login");
  }
  return { sessions: _sessions };
}) satisfies PageServerLoad;

export const actions: Actions = {
  create: async ({ request }) => {
    let data = await request.formData();
    let sessionName = data.get("sessionName")?.toString();
    if (!sessionName) {
      return fail(400, { sessionName: "Please supply a name" });
    }
    _sessions.set(sessionName, []);
  },
};

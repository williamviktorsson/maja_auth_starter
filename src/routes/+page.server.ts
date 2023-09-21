import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// om vi försöker besöka home (/) oinloggad, navigera till login
export const load = (async ({ cookies }) => {
  let username = cookies.get("username");
  if (!username) {
    throw redirect(303, "/login");
  }
  return { username };
}) satisfies PageServerLoad;

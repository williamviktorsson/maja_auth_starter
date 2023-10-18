export const handle = async ({ event, resolve }) => {
  let requestIp = event.getClientAddress();
  event.locals.ip = requestIp;
  return resolve(event);
};

export default handle;

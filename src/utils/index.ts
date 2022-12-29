export const getFirestoreStoragePath = (url: string) =>
  url.split("/").pop()?.split("#")[0].split("?")[0].replaceAll("%2F", "/");

// Frontend-only admin gate. Replace with real auth + backend later.
// Admins identify themselves by entering an allow-listed email + a shared passphrase.
// This is NOT secure — anyone reading the JS bundle can see these values. It only
// gates the upload UI on the client; for real protection, wire up backend auth.

export const ADMIN_EMAILS = [
  "admin@freelancehq.in",
  "friend@freelancehq.in",
];

// Shared passphrase the two admins know. Change this to whatever you and your friend agree on.
export const ADMIN_PASSPHRASE = "freelancehq-admin-2026";

const SESSION_KEY = "fhq_admin_session";

export const isAdmin = (): boolean => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

export const loginAdmin = (email: string, passphrase: string): boolean => {
  const ok =
    ADMIN_EMAILS.includes(email.trim().toLowerCase()) &&
    passphrase === ADMIN_PASSPHRASE;
  if (ok) sessionStorage.setItem(SESSION_KEY, "1");
  return ok;
};

export const logoutAdmin = () => sessionStorage.removeItem(SESSION_KEY);

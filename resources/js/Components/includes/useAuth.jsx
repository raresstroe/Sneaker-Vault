export function useAuth(auth) {
    const loggedIn = auth.user !== null;
    const name = loggedIn ? auth.user.name : "";
    const profile = loggedIn ? auth.user.profile_picture : "";
    const admin = loggedIn ? auth.user.admin : false;

    return { loggedIn, name, profile, admin };
}

export const setCookie = (
    cookieName,
    cookieValue,
    maxAgeSeconds = 3600,
    path = "/"
) => {
    document.cookie = `${cookieName}=${cookieValue}; Max-Age=${maxAgeSeconds}; Path=${path}`;
};

export const unsetCookie = (cookieName, path = "/") => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}`;
};

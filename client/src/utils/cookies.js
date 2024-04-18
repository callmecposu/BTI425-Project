/****************************************************************************** 
 * BTI425 – Project
 * 
 * I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Group member Name: Vladyslav Huziienko, Maksym Volkovynskyi 
 * Student IDs: 180749210, 126867225
 * Date: 18 April 2024
*****************************************************************************/
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

export const getUserFromJWT = async () => {
    const jwtCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('jwt='));

    if (jwtCookie) {
        const jwtValue = jwtCookie.split('=')[1];
        let json = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get_user_from_jwt`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtValue,
            }
        })
        let data = await json.json()
        return data
    } else {
        console.log('JWT cookie not found');
    }
}
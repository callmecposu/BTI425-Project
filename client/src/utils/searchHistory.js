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
export const getSearchHistory = () => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
        return JSON.parse(searchHistory);
    }
    return [];
}

export const addToSearchHistory = (course) => {
    let searchHistory = getSearchHistory();
    const index = searchHistory.findIndex(item => item.course._id === course.course._id);
    if (index == -1) {
        searchHistory.push(course)
    } else {
        searchHistory = searchHistory.filter(item => item.course._id !== course.course._id);
        searchHistory.push(course);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
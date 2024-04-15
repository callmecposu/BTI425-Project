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
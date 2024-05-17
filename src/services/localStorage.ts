export const getDataFromDb = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storeDataInDb = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

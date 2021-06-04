interface PaginatedResponse<T> {
    page: number,
    count: number,
    countPerPage: number,
    pageCount: number,
    sortBy: string,
    sortDirection: 'ascending' | 'descending',
    data: T[]
}

export { PaginatedResponse };
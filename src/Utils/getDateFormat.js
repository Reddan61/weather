export function getDateFormat(date) {
    return 'Y-m-d'
        .replace('Y', date.getFullYear())
        .replace('m', date.getMonth()+1)
        .replace('d', date.getDate())
}
export function isSingleDay(dt_text_1, dt_text_2) {
    const date1 = new Date(dt_text_1)
    const date2 = new Date(dt_text_2)

    if(
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() && 
        date1.getFullYear() === date2.getFullYear()
    ) {
        return true
    }

    return false
}
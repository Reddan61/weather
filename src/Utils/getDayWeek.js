export function getDayWeek(dt = null) {
    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ]
    
    const date = dt ? new Date(dt) : new Date()
    
    return days[date.getDay()]
}
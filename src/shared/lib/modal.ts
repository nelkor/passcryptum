export const modalShow = () => {
    document.querySelector('.page').classList.add('hidden')
    document.querySelector('.modal').show()
}

export const modalClose = () => {
    document.querySelector('.page').classList.remove('hidden')
    document.querySelector('.modal').close()
}

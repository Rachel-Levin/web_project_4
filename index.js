const editButton = document.querySelector('.profile__edit')
const modal = document.querySelector('.modal')
const close = document.querySelector('.modal__close-button')
const form = document.querySelector('.form')
const inputName = document.querySelector('.form__input_type-name')
const inputProfession = document.querySelector('.form__input_type-profession')
const userName = document.querySelector('.profile__card-name')
const userProfession = document.querySelector('.profile__card-profession')
const container = document.querySelector('.page__container')

editButton.addEventListener('click', function(){
    modal.classList.add('modal__open')
    container.classList.add('page__container-edit')
})

function closeModal() {
    modal.classList.remove('modal__open')
    container.classList.remove('page__container-edit')

}

close.addEventListener('click', closeModal)

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const nameValue = inputName.value
    const professionValue = inputProfession.value

    userName.textContent = nameValue
    userProfession.textContent = professionValue

    closeModal()

})
console.log(modal)
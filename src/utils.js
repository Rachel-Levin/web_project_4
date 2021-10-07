// const itemTemplate = document.querySelector("#gallery").content;
// export const openedImage = document.querySelector(".modal-full-screen");
// const openedImageCloseButton = openedImage.querySelector(
//     ".modal__card-close-button");


// export function openModal(modal) {
//     modal.classList.add("modal__open");
//     document.addEventListener("click", handleOverlayClick);
//     document.addEventListener("keyup", handleEsc);
    
// };

// function closeFormOverlay(e) {
//     handleOverlayClick(e)
// }

// function closeFormEsc(e) {
//     handleEsc(e);
// };

// const handleOverlayClick = (e) => {
//     const activeModal = document.querySelector(".modal__open");
//     if (e.target === activeModal) {
//         closeModal(activeModal);
//     };
// };

// export function closeModal(modal) {
//     modal.classList.remove("modal__open");
//     document.removeEventListener("click", handleOverlayClick);
//     document.removeEventListener("keyup", handleEsc);
// };

// const handleEsc = (e) => {
//     const activeModal = document.querySelector(".modal__open");
//     if (e.key === 'Escape') {
//         closeModal(activeModal);
//     }
// };

// openedImageCloseButton.addEventListener("click", () => {
//     closeModal(openedImage);
// });
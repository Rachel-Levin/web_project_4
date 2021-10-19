import { Popup  } from "./Popup";

class PopupWithSubmit extends Popup {
    setAction(action) {
        this._submitHandler = action
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler();
        });
    }
}

export default PopupWithSubmit;
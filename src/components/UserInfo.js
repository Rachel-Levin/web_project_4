
export class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
        };
    }

    setUserInfo({name, profession}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = profession;
    }

    getUserAvatar() {
        return {
            link: this._profileAvatar.src,

        };    
    }

    setUserAvatar({link}) {
        this._profileAvatar.src = link;
    }
}
export { Like };

class Like {
    constructor() {
        this.onState = {
            //textNodeValue refers to .dislike-button-on>.material-icons value
            textNodeValue: 'thumb_up_alt',
            parentNode: {
                className: 'like-button-on'
            },
            getNodeSelectorById: (commentId) => {
                return `.comment-window>#${commentId}>.card .${this.onState.parentNode.className}>.material-icons`;
            },
            getNodeSelectorByClassName: () => {
                return `.comment-window>.component-comment-card>.card .${this.onState.parentNode.className}>.material-icons`;

            }
        }

        this.offState = {
            //textNodeValue refers to .dislike-button-off>.material-icons value
            textNodeValue: 'thumb_up_off_alt',
            parentNode: {
                className: 'like-button-off'
            },
            getNodeSelectorById: (commentId) => {
                return `.comment-window>#${commentId}>.card .${this.offState.parentNode.className}>.material-icons`;
            },
            getNodeSelectorByClassName: () => {
                return `.comment-window>.component-comment-card>.card .${this.offState.parentNode.className}>.material-icons`;
            }
        }
    }

    getInfoTemplate() {
        let info = {
            'action-toolbar': {
                like: true,
            }
        }
        return info;
    }

    getListener() {
        let info = this.getInfoTemplate();
        let onClickEventAction = (event) => {
            console.log('you got liked');
            event.info = info;
        }
        return onClickEventAction;
    }

    likeReverse(element) {
        let parent = element.parentNode;
        if (parent.className === this.onState.parentNode.className) {
            console.log('like is on');
            this.likeOff(element);
        } else {
            console.log('like is off');
            this.likeOn(element);
        }
    }

    likeOn(element) {
        //node material icon
        let parent = element.parentNode;
        parent.className = this.onState.parentNode.className;
        element.innerText = this.onState.textNodeValue;
    }

    likeOff(element) {
        //node material icon
        let parent = element.parentNode;
        parent.className = this.offState.parentNode.className;
        element.innerText = this.offState.textNodeValue;
    }


    addListener(button) {
        button.addEventListener('click', this.getListener(), false);
    }

    removeListener(button, listener) {
        button.removeListener('click', listener, false);
    }

    getLikeElementWithCommentId(commentId) {
        let likeOn = document.querySelector(this.onState.getNodeSelectorById(commentId));
        let likeOff = document.querySelector(this.offState.getNodeSelectorById(commentId));
        if (likeOn) {
            return { state: true, element: likeOn };
        } else {
            return { state: false, element: likeOff };
        }
    }
}
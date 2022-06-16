export { Dislike };

class Dislike {
    constructor() {
        this.onState = {
            //textNodeValue refers to .dislike-button-on>.material-icons value
            textNodeValue: 'thumb_down_alt',
            parentNode: {
                className: 'dislike-button-on'
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
            textNodeValue: 'thumb_down_off_alt',
            parentNode: {
                className: 'dislike-button-off'
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
                dislike: true,
            }
        }
        return info;
    }

    getListener() {
        let info = this.getInfoTemplate();
        let onClickEventAction = (event) => {
            console.log('you got disliked');
            event.info = info;
        }
        return onClickEventAction;
    }

    dislikeReverse(element) {
        let parent = element.parentNode;
        if (parent.className === this.onState.parentNode.className) {
            console.log('dislike is on');
            this.dislikeOff(element);
        } else {
            console.log('dislike is off');
            this.dislikeOn(element);
        }
    }

    dislikeOn(element) {
        //node material icon
        let parent = element.parentNode;
        parent.className = this.onState.parentNode.className;
        element.innerText = this.onState.textNodeValue;
    }

    dislikeOff(element) {
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

    getDislikeElementWithCommentId(commentId) {
        let dislikeOn = document.querySelector(this.onState.getNodeSelectorById(commentId));
        let dislikeOff = document.querySelector(this.offState.getNodeSelectorById(commentId));
        if (dislikeOn) {
            return { state: true, element: dislikeOn };
        } else {
            return { state: false, element: dislikeOff };
        }
    }
}
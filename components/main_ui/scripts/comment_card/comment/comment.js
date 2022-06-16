export { Comment };

class Comment {
    constructor() {
        this.commentElement = {
            className: 'comment-button',
            getNodeSelectorByClassName: () => {
                return `.comment-window>.component-comment-card>.card .${this.commentElement.className}`;
            }
        }
    }

    getInfoTemplate() {
        let info = {
            'action-toolbar': {
                comment: true,
            }
        }
        return info;
    }

    getListener() {
        let info = this.getInfoTemplate();
        let onClickEventAction = (event) => {
            console.log('i want to comment');
            event.info = info;
        }
        return onClickEventAction;
    }

    addListener(element) {
        element.addEventListener('click', this.getListener(), false);
    }

    removeListener(element, listener) {
        element.removeListener('click', listener, false);
    }
}
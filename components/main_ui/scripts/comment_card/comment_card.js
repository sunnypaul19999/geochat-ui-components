import { Like } from './like/like.js';
import { Dislike } from './dislike/dislike.js';
import { Comment } from './comment/comment.js';

class ComponentCommentCard {

    constructor() {
        this.like = new Like();
        this.dislike = new Dislike();
        this.comment = new Comment();
    }

    init() {
        this.addListenersToLikeButton();
        this.addListenersToDislikeButton();
        this.addListenersToCommentButton();
        this.addListenersToCommentCard();
    }

    addListenersToCommentButton() {
        let comButtons = document.querySelectorAll(this.comment.commentElement.getNodeSelectorByClassName());
        for (const button of comButtons) {
            this.comment.addListener(button);
        }
    }

    addListenersToLikeButton() {
        console.log(`like on state: ${this.like.onState.getNodeSelectorByClassName()}`);
        console.log(`like off state: ${this.like.offState.getNodeSelectorByClassName()}`);
        let onButtons = document.querySelectorAll(this.like.onState.getNodeSelectorByClassName());
        //console.log(onButtons);
        for (const button of onButtons) {
            this.like.addListener(button);
        }
        let offButtons = document.querySelectorAll(this.like.offState.getNodeSelectorByClassName());
        //console.log(offButtons);
        for (const button of offButtons) {
            this.like.addListener(button);
        }
    }

    addListenersToDislikeButton() {
        console.log(`dislike on state: ${this.dislike.onState.getNodeSelectorByClassName()}`);
        console.log(`dislike off state: ${this.dislike.offState.getNodeSelectorByClassName()}`);
        let onButtons = document.querySelectorAll(this.dislike.onState.getNodeSelectorByClassName());
        //console.log(onButtons);
        for (const button of onButtons) {
            this.dislike.addListener(button);
        }
        let offButtons = document.querySelectorAll(this.dislike.offState.getNodeSelectorByClassName());
        //console.log(offButtons);
        for (const button of offButtons) {
            this.dislike.addListener(button);
        }
    }

    addListenersToCommentCard() {
        let cards = document.getElementsByClassName('component-comment-card');
        for (const card of cards) {
            card.addEventListener('click', this.identify.bind(this), false);
        }
    }

    identify(event) {
        if (event.info) {
            let info = event.info;
            if (info['action-toolbar']) {
                let actionToolbar = info['action-toolbar'];
                let target = event.target;
                let parentCommentCardId = event.currentTarget.id;
                if (actionToolbar.like) {
                    console.log(actionToolbar);
                    let dislikeElement = this.dislike.getDislikeElementWithCommentId(parentCommentCardId);
                    if (dislikeElement.state) {
                        this.dislike.dislikeReverse(dislikeElement.element);
                    }
                    this.like.likeReverse(target);
                } else {
                    if (actionToolbar.dislike) {
                        console.log(actionToolbar);
                        let likeElement = this.like.getLikeElementWithCommentId(parentCommentCardId);
                        if (likeElement.state) {
                            this.like.likeReverse(likeElement.element);
                        }
                        this.dislike.dislikeReverse(target);
                    } else {
                        if (actionToolbar.comment) {
                            //rubbish code start here
                            let commentInput = document.querySelector('.component-comment-input .comment-input input[name="commentInput"]');
                            let userName = document.querySelector(`.comment-window>#${parentCommentCardId} .user-name>.card-title`);
                            console.log(`@${userName.innerText}`);
                            if (commentInput.hasAttribute('value')) {
                                commentInput.removeAttribute('value');
                            }
                            commentInput.setAttribute('value', `@${userName.innerText}`);
                            commentInput.focus();
                        }
                    }
                }
            }
        } else {
            console.log('info undefined');
        }
    }
}

let c = new ComponentCommentCard();
c.init();

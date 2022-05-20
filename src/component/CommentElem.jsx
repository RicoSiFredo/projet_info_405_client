import React from "react";
import { Rating } from "react-simple-star-rating";
import ImgProfile from "./ImgProfile";
function CommentElem({comment}){
    return <div className="top-separator">
        <div className="d-flex">
            <div className="profil-tiny bg-light bg-light">
                <ImgProfile elem={comment.auteur}></ImgProfile>
            </div>
            <div className="d-flex ms-3 justify-content-center align-items-center">
                <h4>{comment.auteur.getDisplayName()}</h4>
            </div>
        </div>
        <p className="mt-2 mb-2">{comment.text}</p>
        <Rating
            readonly={true}
            allowHover={false}
            ratingValue={comment.note}
        />
        <h5 className="d-flex align-items-center mt-1">
            Projet : 
            <div className="d-flex ms-2 mt-1">
                <div className="profil-tinylow bg-light">
                    <ImgProfile elem={comment.projet}></ImgProfile>
                </div>
                <div className="d-flex ms-2 mt-1">
                    {comment.projet.name}
                </div>
            </div>
        </h5>
    </div>
}
export default CommentElem;
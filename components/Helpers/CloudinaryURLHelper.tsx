import {REACT_APP_CLOUDINARY_NAME} from '@env';

export const createProfilePictureURL = function(username) {
    // console.log(REACT_APP_CLOUDINARY_NAME)
    return "https://res.cloudinary.com/"+REACT_APP_CLOUDINARY_NAME+"/image/upload/profilePictures/"+username.replace("#", "_") + ".png";
}

export const createLeaguePictureURL = function(id) {
    return "https://res.cloudinary.com/"+REACT_APP_CLOUDINARY_NAME+"/image/upload/leaguePicture/"+id + ".png";
}
import {REACT_APP_CLOUDINARY_NAME} from '@env';

export const createProfilePictureURL = function(username) {
    return ("https://res.cloudinary.com/"+REACT_APP_CLOUDINARY_NAME+"/image/upload/profilePictures/"+username.replace("#", "_") + ".png?" + new Date().toISOString());
}

export const createLeaguePictureURL = function(id) {
    return "https://res.cloudinary.com/"+REACT_APP_CLOUDINARY_NAME+"/image/upload/leaguePicture/"+id + ".png?" + new Date().toISOString();
}
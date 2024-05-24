import { TMovie } from "./movieTypes";
import { TUser } from "./userTypes"

export type TMovieRent = {
    user: TUser;
    userId: number;
    movie: TMovie;
    movieId: number;
}
// export type TMovieRentUser = {

// }
// "moviesRent": [
//     {
//       "userId": 1,
//       "movieId": 139,
//       "movie": {
//         "id": 139,
//         "title": "The Shawshank Redemption",
//         "release_date": "1994-09-23",
//         "description": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
//         "image_path": "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
//         "page": 1
//       }
//     },
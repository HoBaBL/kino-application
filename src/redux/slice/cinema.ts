import {createSlice} from '@reduxjs/toolkit'

type PosterType = {
    cinema: {
        id: number;
        name: string;
        year: number;
        rating: {
            kp: number;
            imdb: number;
            filmCritics: number;
            russianFilmCritics: number;
            await: null;
        };
        poster: {
            url: string;
            previewUrl: string;
        };
        genres: [
            {
            name:string
            }
        ]
    }
}

const initialState:PosterType  = {
    cinema: {
        id:0,
        name:'',
        year:0,
        rating: {
            kp: 0,
            imdb: 0,
            filmCritics:0,
            russianFilmCritics:0,
            await: null,
        },
        poster: {
            url: '',
            previewUrl: '',
        },
        genres: [
            {
            name:''
            }
        ]
    }
}

const SearchRedux = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        setCinema(state, action) {
            state.cinema = action.payload
        }
    }
})

export const { setCinema } = SearchRedux.actions;

export default SearchRedux.reducer
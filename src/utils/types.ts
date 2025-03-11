
export interface PageProps {
    items: Item[];
    cdnImageDomain: string;
    totalItems : number;
    totalItemsPerPage : number;
    error?: string;
}

export interface FilmCardProps {
    film: Films;
    cdnImageDomain: string;
}

export interface PaginationProps {
    totalItems : number;
    totalItemsPerPage : number;
}

export interface SeoOnPage {
    titleHead: string;
    descriptionHead: string;
    og_type: string;
    og_image: string[];
}


export const country: { [key: string]: string } = {
    "country" : "quoc-gia",
    "quoc-gia" : "quoc-gia",
    "vietnam" : "vietnam",
    "viet-nam" : "vietnam",
    "": "phim-moi",
    "home": "phim-moi",
    "phim-bo": "phim-bo",
    "series": "phim-bo",
    "phim-le": "phim-le",
    "movies": "phim-le",
    "hoat-hinh": "hoat-hinh",
    "animation": "hoat-hinh",
};



// Film List

export interface Item {
    _id: string;
    name: string;
    origin_name: string;
    thumb_url: string;
    slug: string;
}

export interface FilmListProps {
    items: Item[];
    cdnImageDomain: string;
    error?: string;
}

export interface Films {
    name: string;
    slug: string;
    thumb_url: string;
    quality?: string;
    episode_current?: string;
}


export interface Film {
    origin_name: string;
    name: string;
    content: string;
    thumb_url: string;
    poster_url: string;
    trailer_url: string;
    update_time : string;
    quality: string;
    episode_current: string;
    episode_total: string;
    actor: string[];
    director: string;
    episodes: {name : string , link_m3u8 : string}[];
    category: {id : string ,name : string, slug : string }[];
    breadcrumbs: { name: string; slug: string, position : number }[];
    country : string[];
    slug: string;
}


// Video Player

export interface VideoPlayerProps {
    link_m3u8: string;
    poster_url: string;
}


export interface UserType {
    id: number,
    username: string,
    mail: string,
    fullname: string,
    dateOfBirth: string
}

// category type
export interface CategoryType {
    id: string;
    name: string;
    slug: string;
}
import {movieApiInstance} from "@/utils/axios.config";
import {listCategory, listNation, listTypes} from "@/utils/types/listMovieType";
import axios from "axios";

export interface Movie {
    id: string
    title: string
    origin_name?: string
    slug: string
    year: number
    poster_url: string
    thumb_url: string
    quality?: string
    lang?: string
    category?: { name: string; slug: string }[]
    country?: { name: string; slug: string }[]
}

export interface MovieDetailType extends Movie {
    item: {
        name : string
        slug: string,
        origin_name: string
        content: string
        type: string
        status: string
        is_copyright: boolean
        sub_docquyen: boolean
        chieurap: boolean
        trailer_url: string
        thumb_url: string
        poster_url: string
        year : string
        time: string
        episode_current: string
        episode_total: string
        actor: string[]
        director: string[]
        category: { id: string, name: string; slug: string }[]
        country: { id: string, name: string; slug: string }[]
        episodes: {
            server_name: string
            server_data: {
                name: string
                slug: string
                filename: string
                link_embed: string
                link_m3u8: string
            }[]
        }[]
    }
}


interface ServerSideListResponse {
    data : {
        movies: Movie[]
        pagination: {
            totalItems: number
            totalItemPerPage: number
            currentPage: number
        },
    }
    message: string,
    status: number
}

interface ApiResponse<T> {
    status: boolean
    msg: string
    data: T
}

interface ListResponse {
    items: Movie[]
    params: {
        pagination: {
            totalItems: number
            totalItemsPerPage: number
            currentPage: number
            totalPages: number
        }
    }
}



async function fetchMovies(
    slug: string,
    page: number,
    list: Record<string, { endpoint: string }>
): Promise<{ movies: Movie[]; pagination: ServerSideListResponse["data"]["pagination"] }> {
    try {
        const listType = list[slug];
        if (!listType) {
            throw new Error(`List type ${slug} not found`);
        }

        const { data } = await axios.get<ServerSideListResponse>(`${process.env.SERVERSIDE_API}/${listType.endpoint}?page=${page}`);

        if (data.status != 200) {
            throw new Error(data.message);
        }

        return {
            movies: data.data.movies,
            pagination: data.data.pagination,
        };
    } catch (error) {
        console.error("Error fetching movies:", error);
        return {
            movies: [],
            pagination: { totalItems: 0, totalItemPerPage: 0, currentPage: 1 },
        };
    }
}

export async function fetchMovieByList(slug: string, page = 1) {
    return fetchMovies(slug, page, listTypes);
}

export async function fetchMovieByNation(slug: string, page = 1) {
    return fetchMovies(slug, page, listNation);
}

export async function fetchMovieByCategory(slug: string, page = 1) {
    return fetchMovies(slug, page, listCategory);
}

export async function fetchMovieBySlug(slug: string): Promise<MovieDetailType | null> {
    try {
        const response = await movieApiInstance.get<ApiResponse<MovieDetailType>>(`/v1/api/phim/${slug}`)

        if (!response.data.status) {
            throw new Error(response.data.msg)
        }

        return response.data.data
    } catch (error) {
        console.error("Error fetching movie details:", error)
        return null
    }
}

export async function fetchCategories() {
    try {
        const response =
            await movieApiInstance.get<ApiResponse<{ items: { name: string; slug: string }[] }>>("/v1/api/the-loai")

        if (!response.data.status) {
            throw new Error(response.data.msg)
        }

        return response.data.data.items
    } catch (error) {
        console.error("Error fetching categories:", error)
        return []
    }
}

export async function fetchCountries() {
    try {
        const response =
            await movieApiInstance.get<ApiResponse<{ items: { name: string; slug: string }[] }>>("/v1/api/quoc-gia")

        if (!response.data.status) {
            throw new Error(response.data.msg)
        }

        return response.data.data.items
    } catch (error) {
        console.error("Error fetching countries:", error)
        return []
    }
}

export async function searchMovies(keyword: string, page = 1) {
    try {
        const response = await movieApiInstance.get<ApiResponse<ListResponse>>(
            `/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
        )

        if (!response.data.status) {
            throw new Error(response.data.msg)
        }

        return {
            movies: response.data.data.items,
            pagination: response.data.data.params.pagination,
        }
    } catch (error) {
        console.error("Error searching movies:", error)
        return {movies: [], pagination: {currentPage: 1, totalPages: 1}}
    }
}

export async function fetchHomeData(): Promise<Record<string, unknown> | null> {
    try {
        const response = await movieApiInstance.get<ApiResponse<Record<string, unknown>>>("/v1/api/home")

        if (!response.data.status) {
            throw new Error(response.data.msg)
        }

        return response.data.data
    } catch (error) {
        console.error("Error fetching home data:", error)
        return null
    }
}


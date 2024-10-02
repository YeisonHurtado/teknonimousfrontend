export interface EventInterface {
    _id?: string
    name: string,
    lineup: DataDJ[],
    date: string | Date,
    location: string,
    poster: string,
    createdAt?: string | Date,
    updatedAt?: string | Date
}

export interface DataDJ {
    name_dj: string,
    stage_name: string
}
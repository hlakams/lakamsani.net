interface ImageLoaderParams {
    src: string;
    width: number;
    quality?: number;
}

const imageLoader = ({ src, width, quality = 75 }: ImageLoaderParams): string =>
`${src}?w=${width}&q=${quality}`

export default imageLoader;
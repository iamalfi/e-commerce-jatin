function generateSlugId(length: number): string {
    const characters: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortId: string = "";

    for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(
            Math.random() * characters.length
        );
        shortId += characters.charAt(randomIndex);
    }

    return shortId;
}
export default generateSlugId;



export async function dataFetch(){
    try {
        const link = process.env.SPREADSHEETS_URL
        if (!link){
             throw new Error("ENVIRONMENT variables not valid")
        }
         const response = await fetch(link, { cache: 'no-store' });
        
        if (!response){
            throw new Error("Response is invalid")
        }

        const data = await response.json();

        return data;

    } catch (error : unknown) {
        console.error("Failed to fetch", error)
        throw error;
    }
}
import supabase, { supabaseUrl } from "./supabaseClient"

const getCabins = async () => {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')


    if (error) {
        console.log(error)
        throw new Error("cabins could not be loaded")
    }

    return data


}

const deleteCabins = async (id) => {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        throw new Error("cabins could not be deleted")
    }

    return true
}
const createEditCabins = async (cabin, id) => {
    const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "")
    const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from("cabins")


    if (!id) query = query
        .insert([{ ...cabin, image: imagePath }])

    if (id) query = query
        .update({ ...cabin, image: imagePath })
        .eq('id', id)

    const { data, error } = await query.select().single()



    if (error) {
        throw new Error("Could not create a cabin")
    }


    //upload image
    if (hasImagePath) return data

    const { data: storageData, error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, cabin.image)


    //delete cabin if there was an error uploading the image
    if (storageError) {
        await deleteCabins(data.id)
    }




    return data
}


export {
    getCabins,
    deleteCabins,
    createEditCabins
}
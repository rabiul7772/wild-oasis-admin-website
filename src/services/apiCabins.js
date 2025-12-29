import supabase, { supabaseUrl } from './supabase';

export async function createEditCabin(newCabin, id) {
  // 1) create cabin

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  // https://fxlczmmtiqdovvpcslex.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('Cabin could not be created');
  }

  // 2) upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3) Delete cabin if there was an error uploading image

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    throw new Error(
      'Cabin image could not be uploaded and cabin was not created'
    );
  }

  return data;
}

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded.');
  }

  return data;
};

export const deleteCabin = async id => {
  //  Check if cabin is booked
  const { count, error: bookingError } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('cabinId', id);

  if (bookingError) {
    throw new Error('Failed to verify bookings');
  }

  if (count && count > 0) {
    throw new Error("The cabin is booked and can't be deleted.");
  }

  const { error: cabinError } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (cabinError) {
    console.error(cabinError);
    throw new Error('Cabin could not be deleted.');
  }
};

export const duplicateCabin = async cabin => {
  const name = `copy of ${cabin.name}`;

  const { id, ...otherCabinValues } = cabin;

  const duplicateCabinValues = {
    ...otherCabinValues,
    name
  };

  const { data, error } = await supabase
    .from('cabins')
    .insert([duplicateCabinValues])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be duplicated.');
  }

  return data;
};

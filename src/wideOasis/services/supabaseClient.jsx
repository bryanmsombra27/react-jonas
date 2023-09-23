import { createClient } from '@supabase/supabase-js'

//IMPORTAR VARIABLES DE ENTORNO EN CREATE-REACT-APP
// const supabaseUrl = process.env.VITE_REACT_APP_SUPABASE_URL
// const supabaseKey = process.env.VITE_REACT_APP_SUPABASE_KEY


//IMPORTAR VARIABLES DE ENTORNO EN VITE PARA INYECTARLAS EN LA APP
export const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
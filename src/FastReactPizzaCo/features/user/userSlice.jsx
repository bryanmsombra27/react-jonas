import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}




const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: ""
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
  //conectar los async thunks con el reducer actual
  extraReducers: (builder) =>
    //cuando entra en un estado de cargar
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.status == "loading"
    })
      //cuando ya se completo la tarea
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status == "idle"
        state.error = ""
      })
      //cuando ocurre un error
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error",
          // state.error = action.error.message
          state.error = "there was an error getting your address, please make sure to fill this field"
      })
});
//action creator function async thunk
export const fetchAddress = createAsyncThunk("user/fetchAddress", async (state, action) => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
  // lo que retorne este async thunk se convertira en el payload cuando este en la etapa de fullFilled en el reducer

})


export const { updateName } = userSlice.actions;

export default userSlice.reducer

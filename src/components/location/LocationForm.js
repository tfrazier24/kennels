import React, {useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { useHistory } from "react-router-dom"
import "./Location.css"


export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)
    const { locations, getLocations } = useContext(LocationContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [location, setLocation] = useState({
      name: "",
      address: 0
    });

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
      getLocations()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...location }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newLocation[event.target.id] = event.target.value
      // update state
      setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

        location.locationId = +location.locationId

      const locationId = parseInt(location.locationId)

      if (locationId === 0) {
        window.alert("Please select a location")
      } else {
        //invoke addAnimal passing animal as an argument.
        //once complete, change the url and display the animal list
        addLocation(location)
        .then(() => history.push("/locations"))
      }
    }

    return (
      <form className="locationForm">
        <h2 className="locationForm__title">New Location</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Location name:</label>
            <input
              type="text"
              id="name"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Location name"
              value={location.name}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Location Address"
              value={location.address}
            ></input>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSaveLocation}>
          Save Location
        </button>
      </form>
    );
  }
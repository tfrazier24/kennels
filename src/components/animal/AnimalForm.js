import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
  const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { customers, getCustomers } = useContext(CustomerContext);

  /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */
  //for edit, hold on to state of animal in this view
  const [animal, setAnimal] = useState({
    name: "",
    breed: "",
    locationId: 0,
    customerId: 0,
  });

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { animalId } = useParams();
  const history = useHistory();

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
    const newAnimal = { ...animal };
    /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
    newAnimal[event.target.id] = event.target.value;
    // update state
    setAnimal(newAnimal);
  };

  const handleClickSaveAnimal = () => {
    if (parseInt(animal.locationId) === 0) {
      window.alert("Please select a location");
    } else {
      //disable the button - no extra clicks
      setIsLoading(true); 
      if (animalId) {
        //PUT - update
        updateAnimal({
          id: animal.id,
          name: animal.name,
          breed: animal.breed,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId),
        }).then(() => history.push(`/animals/detail/${animal.id}`));
      } else {
        //POST - add
        addAnimal({
          name: animal.name,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId),
        }).then(() => history.push("/animals"));
      }
    }
  };

  // Get customers and locations. If animalId is in the URL, getAnimalById
  useEffect(() => {
    getCustomers()
      .then(getLocations)
      .then(() => {
        if (animalId) {
          getAnimalById(animalId).then((animal) => {
            setAnimal(animal);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  //since state controlls this component, we no longer need
  //useRef(null) or ref

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">New Animal</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal name:</label>
          <input
            type="text"
            id="name"
            onChange={handleControlledInputChange}
            required
            autoFocus
            className="form-control"
            placeholder="Animal name"
            value={animal.name}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select
            defaultValue={animal.locationId}
            name="locationId"
            onChange={handleControlledInputChange}
            id="locationId"
            className="form-control"
          >
            <option value="0">Select a location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="customerId">Customer: </label>
          <select
            defaultValue={animal.customerId}
            name="customer"
            onChange={handleControlledInputChange}
            id="customerId"
            className="form-control"
          >
            <option value="0">Select a customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Animal Breed:</label>
          <input
            type="text"
            id="breed"
            onChange={handleControlledInputChange}
            required
            autoFocus
            className="form-control"
            placeholder="Animal breed"
            value={animal.breed}
          />
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleClickSaveAnimal();
        }}
      >
        {animalId ? <>Save Animal</> : <>Add Animal</>}
      </button>
    </form>
  );
}
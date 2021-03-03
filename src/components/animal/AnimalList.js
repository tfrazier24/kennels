import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import {AnimalCard} from "./AnimalCard"
import "./Animal.css"


export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)
  const {locations, getLocations } = useContext(LocationContext)
  const {customers, getCustomers} = useContext(CustomerContext)
  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: Initial render before data")
      getAnimals()

  }, [])

const history = useHistory()

return (
    <>
      <h2>Animals</h2>
		      <button onClick={() => {history.push("/animals/create")}}>
            Make Reservation
      </button>
      <div className="animals">
            {
               animals.map(animal => {
                   return <AnimalCard key={animal.id} animal={animal} />
                 })
            }
      </div>

    </>
  )
}



{/* <div className="animals">
{animals.map(animal => {
  // setting a variable to find the owner of a specific animal
  const owner = customers.find(c => c.id === animal.customerId)
  //setting a variable to find the specific location that an animal is being kept at
  const clinic = locations.find(l => l.id === animal.locationId)

return( <AnimalCard key={animal.id}
        // defining each prop to access in the animal card
          location={clinic}
          customer={owner}
          animal={animal} />
)}
)}
</div> */}
import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import "./Location.css"
import { useHistory } from "react-router-dom"

export const LocationList = () => {
    //This state changes when 'getLocations()' is invoked below
    const { locations, getLocations } = useContext(LocationContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("LocationList: useEffect - getLocations")
        getLocations()
    }, [])

    const history = useHistory()

    return (
      <>
      <h2>Locations</h2>
      <button onClick={() => {history.push("/locations/create")}}>
          Add Location
      </button>
        <div className="locations">
        {console.log("LocationList: Render", locations)}
        {
          locations.map(location => {
            return <LocationCard key={location.id} location={location} />
          })
        }
      </div>
      </> 
    )
}
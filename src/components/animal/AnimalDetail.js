import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"

export const AnimalDetail = () => {
 // useContext is grabbing the function of getAnimalById and allowing us to use it   
  const { getAnimalById, releaseAnimal } = useContext(AnimalContext)

	const [animal, setAnimal] = useState({})
// useParams is allowing us to use the parameter of animalId
	const {animalId} = useParams();
	const history = useHistory();

//in useEffect we are grabbing the object with getAnimalById and passing in the ID that is pulled in and then we are using setAnimal to set the new state.. allowing the page to render again with the object pulled in
//useEffect is what we will use to print to the DOM 
  useEffect(() => {
    console.log("useEffect", animalId)
    getAnimalById(animalId)
    .then((response) => {
      setAnimal(response)
    })
    }, [])

  const handleRelease = () => {
    releaseAnimal(animal.id).then(() => {
      history.push("/animals");
    });
  };

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      {/* What's up with the question mark???? See below.*/}
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div>
      <button
        onClick={() => {
          history.push(`/animals/edit/${animal.id}`);
        }}
      >
        Edit
      </button>
      <button onClick={handleRelease}>Release Animal</button>
    </section>
  );
}
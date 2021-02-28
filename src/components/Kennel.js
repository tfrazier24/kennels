import React from "react"
import "./Kennel.css"
import {AnimalCard} from './animal/AnimalCard'
import './animal/Animal.css'
import { EmployeeCard } from "./employee/Employee"
import { LocationCard } from "./location/Location"
import { CustomerCard } from "./customer/CustomerCard"
import {NavBar} from "./nav/NavBar"
import {ApplicationViews} from "./ApplicationView"


export const Kennel = () => (

    <>
        <NavBar />
        <ApplicationViews />
    </>
    
)
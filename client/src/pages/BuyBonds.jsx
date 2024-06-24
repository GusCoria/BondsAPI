// src/components/Login.js
import React from "react";
import BuybondsList from "../components/BuybondsList";
import { NavigationApp } from "../components/NavigationApp";

//formato de preuba

export function BuyBonds() {
  return (
    <div>
      <NavigationApp  />
      <div>
        <BuybondsList />
      </div>
    </div>
  );
}

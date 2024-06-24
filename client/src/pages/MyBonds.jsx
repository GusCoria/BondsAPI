import React from "react";
import MybondsList from "../components/MybondsList";
import { NavigationApp } from "../components/NavigationApp";

//formato de prueba

export function MyBonds() {
  return (
    <div>
      <NavigationApp />
      <div>
        <MybondsList />
      </div>
    </div>
  );
}

import React from "react";
import MybondsList from "../components/MybondsList";
import { NavigationApp } from "../components/NavigationApp";

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

import React, { useEffect, useContext } from "react";
import { DataContext } from "contexts";

export const Menu = () => {
  const { projects } = useContext(DataContext);

  useEffect(() => {
    console.log("---->", projects);
  }, [projects]);

  return <>Menu</>;
};

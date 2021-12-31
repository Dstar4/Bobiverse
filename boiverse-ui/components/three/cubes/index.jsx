import React, { useRef } from "react";
import { map } from "lodash";
import { useFrame } from "react-three-fiber";

import Cube from "./Cubes";

export default ({minerals, bobs, drones}) => {

  const bobColor = 'red'
  const bobSize = [0.1, 0.1, 0.1]
  const droneColor = 'teal'
  const droneSize = [0.1, 0.1, 0.1]
  const mineralColor = 'gray'
  const mineralSize = [0.1, 0.1, 0.1]

  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.001;
  });

  const nodesCubes = map(minerals, (el, i) => {
    return <Cube key={i} item={el}  color={mineralColor} size={mineralSize}/>;
  });

  const bobCubes = map(bobs, (el, i) => {
    return <Cube key={i} item={el} color={bobColor} size={bobSize}/>;
  });

  const droneCubes = map(drones, (el, i) => {
    return <Cube key={i} item={el} color={droneColor} size={droneSize}/>;
  });

  return <group ref={group}>{nodesCubes}{bobCubes}{droneCubes}</group>;
};

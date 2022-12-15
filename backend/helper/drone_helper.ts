import { DroneData, PilotInfo } from "../types/drone";
import { redisClient } from "../db/db";
import parser from "xml-js";

//Get the drone data and parse the XML to an Object
const fetchDroneData = async (): Promise<DroneData[]> => {
    const response = await fetch("https://assignments.reaktor.com/birdnest/drones");
    const drones = await response.text();
    const data = JSON.parse(parser.xml2json(drones, { compact: true, spaces: 4 }));
    return data.report.capture.drone;

};

// Calculates the distance of the drone inside the zone
const calculateDistance = (drone: DroneData): number => {
    // The distances are constants
    // Origin at 250000, 250000
    // X and Y positions between 0 - 500000
    const x = 250000, y = 250000;
    const xDrone: number = +drone.positionX._text;
    const yDrone: number = +drone.positionY._text;
    const xDistance = Math.pow(x - xDrone, 2);
    const yDistance = Math.pow(y - yDrone, 2);

    const distance = Math.sqrt(xDistance + yDistance);

    // Return the data in meters
    return distance / 1000;
};

const fetchPilotInfo = async (drone: DroneData) => {
    const pilotInfo = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`);
    if (pilotInfo.status === 404) {
        return;
    }
};

const updateDroneData = async () => {
    const droneData = await fetchDroneData();
    const violatingDrones: DroneData[] = [];
    droneData.forEach(d => {
        const distance = calculateDistance(d);
        if (distance <= 100) {
            console.log("VIOLATING!");
            console.log(distance);
            violatingDrones.push(d);
        }
    });
    violatingDrones.forEach(async d => {
        console.log("Serial number?");
        console.log(d.serialNumber._text);
        const pilotInfo = await fetch('https://assignments.reaktor.com/birdnest/pilots/' + d.serialNumber._text);
        if (pilotInfo.status === 404) {
            // Probably not worth polling the drone again... or is it?
            return;
        }
        console.log(await pilotInfo.text());
    });
    console.log("Redis client?");
    console.log(redisClient);
    console.log("\n");

};

export default updateDroneData;
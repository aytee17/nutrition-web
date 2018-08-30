import { createMeter } from "./Meter";

export const EnergyMeter = createMeter({
    title: "Energy",
    units: "kJ",
    color: "#45b0e6"
});

export const ProteinMeter = createMeter({
    title: "Protein",
    units: "g",
    color: "#D32F2F"
});

export const DietaryFibreMeter = createMeter({
    title: "Dietary Fibre",
    units: "g",
    color: "#9CCC65"
});

import { useContext } from "react";
import { FiltersContext } from ".";

export const useFilters = () => useContext(FiltersContext);

import { useState } from "react";
import { FiltersContext } from ".";

export const FiltersContextProvider = ({ children }) => {
    const [filters, setFilters] = useState({});

    const clearFilters = () => {
        setFilters({});
    };

    const deleteFilter = (name) => {
        const tempState = { ...filters };
        delete tempState[name];
        setFilters(tempState);
    };

    const toggleFilter = (event) => {
        const name = event.target.name.split("/")[0];
        const param = event.target.value;

        const tempFilters = { ...filters };
        if (tempFilters[name]) {
            const tempSet = new Set(tempFilters[name]);
            if (tempSet.has(param)) {
                tempSet.delete(param);
                tempFilters[name] = tempSet;
                if (tempSet.size === 0) {
                    delete tempFilters[name];
                }
            } else {
                tempSet.add(param);
                tempFilters[name] = tempSet;
            }
        } else {
            tempFilters[name] = new Set([param]);
        }

        setFilters(tempFilters);
    };

    return (
        <FiltersContext.Provider
            value={{ clearFilters, toggleFilter, filters, deleteFilter }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

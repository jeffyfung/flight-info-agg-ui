import { useState } from "react";
import styles from "./dashboard-header.module.scss";
import { BiSolidLeftArrow } from "react-icons/bi";
import { clsx } from "clsx";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { AirlineDisplay, LocationDisplay } from "@/interfaces/user.inferface";

export interface DashboardHeaderProps {
  loadedLocations: LocationDisplay[];
  loadedAirlines: AirlineDisplay[];
  tags: {
    locations: LocationDisplay[];
    airlines: AirlineDisplay[];
  };
  submitQuery: (selLocations: LocationDisplay[], selAirlines: AirlineDisplay[]) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ loadedAirlines, loadedLocations, tags, submitQuery }) => {
  const { locations, airlines } = tags;

  const [showQueryBar, setShowQueryBar] = useState<boolean>(false);
  const [selLocations, setSelLocations] = useState<LocationDisplay[]>(loadedLocations);
  const [selAirlines, setSelAirlines] = useState<AirlineDisplay[]>(loadedAirlines);

  const handleExpand = () => {
    setShowQueryBar((state) => !state);
  };

  const handleQuerySubmit = (_e: React.MouseEvent<HTMLButtonElement>) => {
    submitQuery(selLocations, selAirlines);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.currentSelection}>
        Current Selection 目前選擇:
        {loadedLocations.length + loadedAirlines.length === 0 && " Nil"}
        <div className={styles.expandButtonContainer} onClick={handleExpand}>
          <span>
            <BiSolidLeftArrow className={clsx(styles.expandButton, { [styles.expanded]: showQueryBar })} />
          </span>
          <span>Update</span>
        </div>
      </div>
      {loadedLocations.length + loadedAirlines.length > 0 && (
        <div className={styles.selectionContainer}>
          {loadedLocations.map((loc) => (
            <span key={loc.value} className={`${styles.selection} ${styles.locationTag}`}>
              {loc.label}
            </span>
          ))}
          {loadedAirlines.map((airline) => (
            <span key={airline.value} className={`${styles.selection} ${styles.airlineTag}`}>
              {airline.label}
            </span>
          ))}
        </div>
      )}
      {showQueryBar && (
        <div className={`${styles.queryContainer} ${styles.fadeIn}`}>
          <Autocomplete
            className={styles.autocomplete}
            multiple //
            id="select-locations"
            options={locations}
            renderInput={(params) => <TextField {...params} label="Destinations" variant="outlined" />}
            renderTags={(values) => (
              <div className={styles.tagsContainer}>
                {values.map((value) => (
                  <Chip key={value.label} className={`${styles.normalTag} ${styles.locationTag}`} label={value.label} />
                ))}
              </div>
            )}
            value={selLocations}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_e, locations) => setSelLocations(locations)}
          />
          <Autocomplete
            multiple //
            className={styles.autocomplete}
            id="select-airlines"
            options={airlines}
            renderInput={(params) => <TextField {...params} label="Airlines" variant="outlined" />}
            renderTags={(values) => (
              <div className={styles.tagsContainer}>
                {values.map((value) => (
                  <Chip key={value.label} className={`${styles.normalTag} ${styles.airlineTag}`} label={value.label} />
                ))}
              </div>
            )}
            value={selAirlines}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_e, airlines) => setSelAirlines(airlines)}
          />
          <button className={styles.submitButton} onClick={handleQuerySubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

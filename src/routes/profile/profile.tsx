import { useLoaderData, useSearchParams } from "react-router-dom";
import styles from "./profile.module.scss";
import { FormBlock } from "@/components/form-block/form-block";
import { FaFilter, FaBell } from "react-icons/fa";
import { Autocomplete, Chip, CircularProgress, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { ax } from "@/utils/axios";
import { AirlineDisplay, LocationDisplay, NotificationSetting, UserProfile } from "@/interfaces/user.inferface";
import { useViewTransition } from "@/utils/hooks/view-transition";

interface LoaderData {
  userProfile: Omit<UserProfile, "selected_locations" | "selected_airlines" | "telegram_uid"> & {
    selectedLocations: LocationDisplay[];
    selectedAirlines: AirlineDisplay[];
    telegramChatID: number;
    telegramUID: string;
  };
  tags: {
    locations: LocationDisplay[];
    airlines: AirlineDisplay[];
  };
}

export const Profile: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const navigateWithTransition = useViewTransition();
  const newUser = searchParams.get("new") === "1";

  const title = newUser ? "New here? Let's get you all set up!" : "Account Setting";

  const { userProfile, tags } = useLoaderData() as LoaderData;
  const { locations, airlines } = tags;
  const [notification, setNotification] = useState<boolean>(userProfile.notification === NotificationSetting.DAILY);
  const [selectedLocations, setSelectedLocations] = useState<LocationDisplay[]>(userProfile.selectedLocations || []);
  const [selectedAirlines, setSelectedAirlines] = useState<AirlineDisplay[]>(userProfile.selectedAirlines || []);

  const [loading, setLoading] = useState<boolean>(false);

  const handleTelegramSetup = async () => {
    const telegramStartURL = `https://t.me/flight_deals_852_bot?start=${userProfile.telegramUID}`;
    window.open(telegramStartURL, "_blank");
    await handleSubmit();
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const payload = {
        notification: notification ? NotificationSetting.DAILY : NotificationSetting.OFF,
        selected_locations: selectedLocations.map((loc) => loc.value),
        selected_airlines: selectedAirlines.map((airline) => airline.value),
      };
      await ax.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/user/profile`, payload);
      setLoading(false);
      navigateWithTransition("/");
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.formContainer}>
        <FormBlock
          title="Filters" //
          titleIcon={<FaFilter />}
          subtitle="These will be the default filters of your dashboard"
          schema={[
            {
              fieldName: "Locations",
              element: (
                <Autocomplete
                  multiple //
                  id="select-locations"
                  options={locations}
                  renderInput={(params) => <TextField {...params} variant="standard" />}
                  renderTags={(values) => (
                    <div className={styles.tagsContainer}>
                      {values.map((value) => (
                        <Chip key={value.label} className={`${styles.tag} ${styles.locationTag}`} label={value.label} />
                      ))}
                    </div>
                  )}
                  value={selectedLocations}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={(_e, locations) => setSelectedLocations(locations)}
                />
              ),
            },
            {
              fieldName: "Airlines",
              element: (
                <Autocomplete
                  multiple //
                  id="select-airlines"
                  options={airlines}
                  renderInput={(params) => <TextField {...params} variant="standard" />}
                  renderTags={(values) => (
                    <div className={styles.tagsContainer}>
                      {values.map((value) => (
                        <Chip key={value.label} className={`${styles.tag} ${styles.airlineTag}`} label={value.label} />
                      ))}
                    </div>
                  )}
                  value={selectedAirlines}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={(_e, airlines) => setSelectedAirlines(airlines)}
                />
              ),
            },
          ]}
        />
        {/* TODO: multiple alerts */}
        <FormBlock
          title="Notification" //
          titleIcon={<FaBell />}
          subtitle="We will send you notification when there are posts that match your filters."
          schema={
            userProfile.telegramChatID === 0
              ? [
                  {
                    element: (
                      <div className={styles.telegramSetupButtonContainer}>
                        <button className={styles.telegramSetupButton} onClick={handleTelegramSetup}>
                          Setup Telegram Notifications
                        </button>
                      </div>
                    ),
                  },
                ]
              : [
                  {
                    fieldName: "Telegram (Daily)",
                    element: <Switch checked={notification} onChange={() => setNotification((state) => !state)} />,
                  },
                ]
          }
        />
      </div>
      <div className={styles.submitContainer}>
        {loading ? (
          <CircularProgress />
        ) : (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export const profileLoader = async (): Promise<LoaderData> => {
  const { data: userProfileData } = await ax.get<{ payload: UserProfile }>(`${import.meta.env.VITE_SERVER_ENDPOINT}/user/profile`);
  const { data: tagsData } = await ax.get<{ payload: { locations: LocationDisplay[]; airlines: AirlineDisplay[] } }>(`${import.meta.env.VITE_SERVER_ENDPOINT}/tags`);
  const { locations, airlines } = tagsData.payload;
  const userProfile = userProfileData.payload;

  return {
    userProfile: {
      ...userProfile,
      selectedAirlines: userProfile.selected_airlines,
      selectedLocations: userProfile.selected_locations,
      telegramChatID: userProfile.telegram_chat_id,
      telegramUID: userProfile.telegram_uid,
    },
    tags: { locations, airlines },
  };
};

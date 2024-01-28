import { ax } from "../../utils/axios";
import { useLoaderData } from "react-router-dom";
import styles from "./dashboard.module.scss";
import { PostDisplay } from "@/components/post/post-display";
import { Post } from "@/interfaces/post.interface";
import { getUserInfo } from "@/utils/user";
import { DashboardHeader } from "@/components/dashboard-header/dashboard-header";
import { useState } from "react";
import { AirlineDisplay, LocationDisplay } from "@/interfaces/user.inferface";

interface PostResponse {
  id: string;
  title: string;
  url: string;
  tags: string[];
  summary: string;
  locations: string[];
  airlines: string[];
  pub_date: string;
  created_at: string;
  source: string;
}

interface LoaderData {
  posts: Post[];
  selectedLocations: LocationDisplay[];
  selectedAirlines: AirlineDisplay[];
  tags: {
    locations: LocationDisplay[];
    airlines: AirlineDisplay[];
  };
}

const PAGE_SIZE = 8;

const Dashboard: React.FC<{}> = () => {
  const { posts: loadedPosts, selectedLocations: loadedLocations, selectedAirlines: loadedAirlines, tags } = useLoaderData() as LoaderData;

  const [posts, setPosts] = useState<Post[]>(loadedPosts);
  const [locations, setLocations] = useState<LocationDisplay[]>(loadedLocations);
  const [airlines, setAirlines] = useState<AirlineDisplay[]>(loadedAirlines);
  const [counter, setCounter] = useState(PAGE_SIZE);

  const submitQuery = async (selLocations: LocationDisplay[], selAirlines: AirlineDisplay[]): Promise<void> => {
    const {
      posts,
      selectedLocations: locs,
      selectedAirlines: airlines,
    } = await getPosts({
      locations: selLocations,
      airlines: selAirlines,
    });
    setPosts(posts);
    setLocations(locs);
    setAirlines(airlines);
    setCounter(PAGE_SIZE);
  };

  const loadMore = (): void => {
    setCounter(counter + PAGE_SIZE);
  };

  const existingPosts = posts.slice(0, Math.max(counter - PAGE_SIZE, 0));
  const newPosts = posts.slice(Math.max(counter - PAGE_SIZE, 0), counter);

  return (
    <div className={styles.container}>
      <DashboardHeader loadedLocations={locations} loadedAirlines={airlines} tags={tags} submitQuery={submitQuery} />
      {posts.length === 0 ? (
        <p className={styles.noData}>No data found. Please try again with different filters.</p>
      ) : (
        <>
          <div className={styles.posts}>
            {existingPosts.map((post, idx) => (
              <PostDisplay key={`${idx}-${post.id}`} post={post} />
            ))}
          </div>
          <div key={counter} className={`${styles.posts} ${styles.fadeIn}`}>
            {newPosts.map((post, idx) => (
              <PostDisplay key={`${idx}-${post.id}`} post={post} />
            ))}
          </div>
        </>
      )}
      {posts.length > counter && (
        <button className={styles.loadMore} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

const getPosts = async (selection?: { locations: LocationDisplay[]; airlines: AirlineDisplay[] }): Promise<Omit<LoaderData, "tags">> => {
  const userInfo = getUserInfo();
  if (userInfo) {
    const payload = {
      locations: selection?.locations.map((loc) => loc.value) ?? [],
      airlines: selection?.airlines.map((airline) => airline.value) ?? [],
      load_user_settings: !selection,
    };
    const { data } = await ax.post<{
      payload: {
        posts: PostResponse[]; //
        selected_locations: LocationDisplay[];
        selected_airlines: AirlineDisplay[];
      };
    }>(`${import.meta.env.VITE_SERVER_ENDPOINT}/user/posts`, payload, { withCredentials: true });
    const { posts, selected_locations, selected_airlines } = data.payload;
    return {
      posts: posts.map((post) => ({
        ...post,
        pubDate: post.pub_date,
        createdAt: post.created_at,
      })),
      selectedLocations: selected_locations,
      selectedAirlines: selected_airlines,
    };
  } else {
    const payload = {
      locations: selection?.locations.map((loc) => loc.value) ?? [],
      airlines: selection?.airlines.map((airline) => airline.value) ?? [],
    };
    const { data } = await ax.post<{ payload: { posts: PostResponse[] } }>(`${import.meta.env.VITE_SERVER_ENDPOINT}/posts`, payload);
    return {
      posts: data.payload.posts.map((post) => ({
        ...post,
        pubDate: post.pub_date,
        createdAt: post.created_at,
      })),
      selectedLocations: selection?.locations ?? [],
      selectedAirlines: selection?.airlines ?? [],
    };
  }
};

export const dashboardLoader = async (): Promise<LoaderData> => {
  const loaderData = await getPosts();
  const { data: tagsData } = await ax.get<{ payload: { locations: LocationDisplay[]; airlines: AirlineDisplay[] } }>(`${import.meta.env.VITE_SERVER_ENDPOINT}/tags`);
  return {
    ...loaderData,
    tags: tagsData.payload,
  };
};

export default Dashboard;

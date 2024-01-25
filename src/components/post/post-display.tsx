import { FaExternalLinkAlt } from "react-icons/fa";
import styles from "./post-display.module.scss";
import { Post } from "@/interfaces/post.interface";

interface PostProps {
  post: Post;
}

export const PostDisplay: React.FC<PostProps> = ({ post }) => {
  return (
    <div key={post.id} className={styles.container}>
      <div className={styles.headerContainer}>
        <button className={styles.urlButton} onClick={() => window.open(post.url, post.id)}>
          <FaExternalLinkAlt />
        </button>
        <div className={styles.pubDate}>{post.pubDate.split("T")[0]}</div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.tagsContainer}>
          {post.locations.map((loc) => (
            <span key={loc} className={`${styles.tag} ${styles.locationTag}`}>
              {loc}
            </span>
          ))}
          {post.airlines.map((loc) => (
            <span key={loc} className={`${styles.tag} ${styles.airlineTag}`}>
              {loc}
            </span>
          ))}
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{post.title}</h3>
        </div>
      </div>
    </div>
  );
};

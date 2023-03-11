import { createEffect, createSignal, For, onCleanup } from 'solid-js';
import FeedPost from './FeedPost';
import FeedSorter from './FeedSorter';
import loadMoreObserver from './loadMoreObserver';
import {
  FeedContainer,
  FeedDivider,
  loadMore,
  MobileFeedHeader,
} from './styles';
import DarcyLogo from '~/assets/logo-cropped.png?webp&w=50&height=50&imagetools';

export default function Feed() {
  // eslint-disable-next-line solid/reactivity
  const [, setPosts] = createSignal(Array.from({ length: 2 }));

  let lastAutoFetch = 0;
  let timeout: NodeJS.Timeout | undefined;

  const loadMorePosts = () => {
    if (timeout) return;

    if (lastAutoFetch && Date.now() - lastAutoFetch < 2_000) {
      // If user is scrolling fast, wait 2 seconds before loading more posts.
      // This will make only one request to the server.
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = undefined;

        loadMorePosts();
      }, 2_000);
      return;
    }

    lastAutoFetch = Date.now();

    setPosts((posts) => [...posts, ...Array.from({ length: 5 })]);
  };

  createEffect(() => {
    // if the span element "load more" is visible, try to load more posts
    loadMoreObserver(loadMore, loadMorePosts);

    // If user is at or near the bottom of the page, load more posts
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      )
        loadMorePosts();
    });
  });

  onCleanup(() => {
    if (timeout) clearTimeout(timeout);
  });

  const fakeArray = Array.from({ length: 30 });

  return (
    <>
      <MobileFeedHeader>
        <img src={DarcyLogo} alt="Logo" />
        <span>Darcy</span>
      </MobileFeedHeader>

      <FeedContainer>
        <FeedSorter />

        <For each={fakeArray}>
          {(_) => (
            <>
              <FeedPost
                content="hey!"
                embeds={[]}
                hasLiked={true}
                hasReposted={true}
                postURL="/#"
                stats={{
                  comments: 0,
                  likes: 0,
                  reposts: 0,
                }}
                user={{
                  avatar: 'https://via.placeholder.com/150',
                  handle: 'davipatricio',
                  name: 'Davi Patricio',
                }}
              />
              <FeedDivider />
            </>
          )}
        </For>

        <span
          class={loadMore}
          onClick={loadMorePosts}
          onKeyDown={loadMorePosts}
          role="button"
          tabIndex={0}
        >
          Clique para carregar mais posts
        </span>
      </FeedContainer>
    </>
  );
}

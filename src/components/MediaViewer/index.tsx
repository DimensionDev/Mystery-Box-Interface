import { useShowup } from '@/hooks';
import { FC, HTMLProps, useRef } from 'react';
import { Icon, LoadingCircle } from '../Icon';
import { Image } from '../Image';
import { VideoPlayer } from '../VideoPlayer';
import styles from './index.module.less';

interface Props extends HTMLProps<HTMLDivElement> {
  name?: string;
  image: string;
  animationUrl?: string;
}

export const MediaViewer: FC<Props> = ({ name, image, animationUrl, ...rest }) => {
  const mediaUrl = image || animationUrl || '';
  const ref = useRef<HTMLDivElement>(null);
  const showup = useShowup(ref);
  let hero: JSX.Element = <MockViewer />;
  if (mediaUrl.match(/\.mp4$/)) {
    hero = <VideoPlayer className={styles.videoPlayer} src={mediaUrl} alt={name} height="100%" />;
  } else {
    hero = (
      <Image
        className={styles.image}
        loading="lazy"
        src={image}
        alt={name}
        height="100%"
        alternative={<Icon type="mask" size={48} />}
      />
    );
  }

  return (
    <div {...rest} ref={ref}>
      {showup ? hero : <MockViewer />}
    </div>
  );
};

export const MockViewer: FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <Icon type="mask" size={48} />;
    </div>
  );
};

export const MediaViewerSkeleton: FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <LoadingCircle />
    </div>
  );
};

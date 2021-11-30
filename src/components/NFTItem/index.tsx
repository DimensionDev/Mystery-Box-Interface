import { ERC721Token } from '@/types';
import classnames from 'classnames';
import { FC, HTMLProps } from 'react';
import { Icon } from '../Icon';
import { Image } from '../Image';
import { useLocales } from '../useLocales';
import styles from './index.module.less';

export interface NFTItemProps extends HTMLProps<HTMLDivElement> {
  contractName?: string;
  token: ERC721Token;
  sold?: boolean;
}

const imagePlaceholder = 'https://picsum.photos/400/300';

export const NFTItem: FC<NFTItemProps> = ({ className, contractName, token, sold, ...rest }) => {
  const t = useLocales();
  return (
    <div className={classnames(styles.nft, className)} {...rest}>
      <div className={styles.image}>
        <Image
          loading="lazy"
          src={token.image ?? imagePlaceholder}
          alt={token.name}
          height="100%"
          alternative={<Icon type="mask" size={48}></Icon>}
        />
      </div>
      <div className={styles.info}>
        {contractName && <h3 className={styles.contractName}>{contractName}</h3>}
        {token.name && <h3 className={styles.name}>{token.name}</h3>}
        {sold !== undefined && (
          <h3 className={styles.saleStatus}>{sold ? t('Sold') : t('For Sale')}</h3>
        )}
      </div>
      {sold && <div className={styles.mask} />}
    </div>
  );
};

interface CollectionProps
  extends HTMLProps<HTMLUListElement>,
    Pick<NFTItemProps, 'contractName' | 'sold'> {
  tokens: ERC721Token[];
}

export const Collection: FC<CollectionProps> = ({
  tokens,
  contractName,
  sold,
  className,
  ...rest
}) => {
  return (
    <ul className={classnames(styles.nftList, className)} {...rest}>
      {tokens.map((token) => (
        <li key={token.tokenId} className={styles.nftItem}>
          <NFTItem contractName={contractName} token={token} sold={sold} />
        </li>
      ))}
    </ul>
  );
};

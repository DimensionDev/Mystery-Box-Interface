import { Button, LoadingIcon } from '@/components';
import { useWeb3Context } from '@/contexts';
import { MaskBoxesQuery, useMaskBoxesLazyQuery } from '@/graphql-hooks';
import { MysteryBox } from '@/page-components';
import { FC, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.less';

const PAGE_SIZE = 5;
const EMPTY_LIST: MaskBoxesQuery['maskboxes'] = [];
export const BoxList: FC = () => {
  const [fetchBoxes, { data: boxesData, loading }] = useMaskBoxesLazyQuery({});
  const { providerChainId } = useWeb3Context();

  const history = useHistory();
  const { location } = history;

  const page = useMemo(() => {
    const p = new URLSearchParams(location.search).get('page');
    return p ? parseInt(p, 10) : null;
  }, [location.search]);

  useEffect(() => {
    if (!page) {
      history.replace('/list?page=1');
    }
  }, [history, page]);

  const loadPrevPage = () => {
    if (!page) return;
    const p = page > 1 ? page - 1 : 1;
    history.push(`/list?page=${p}`);
  };
  const loadNextPage = () => {
    if (!page) return;
    history.push(`/list?page=${page + 1}`);
  };
  useEffect(() => {
    if (!page) return;
    fetchBoxes({
      variables: {
        skip: (page - 1) * PAGE_SIZE,
        first: PAGE_SIZE,
      },
    });
  }, [fetchBoxes, page]);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <LoadingIcon size={50} />
      </div>
    );
  }

  const maskboxes = boxesData?.maskboxes ?? EMPTY_LIST;

  if (!providerChainId) return null;

  return (
    <>
      <ul className={styles.list}>
        {maskboxes.map((maskbox) => (
          <li key={maskbox.box_id} className={styles.item}>
            <MysteryBox chainId={providerChainId} boxId={maskbox.box_id} inList />
          </li>
        ))}
      </ul>
      <div className={styles.paginaton}>
        <Button className={styles.button} disabled={page === 1 || loading} onClick={loadPrevPage}>
          Previous
        </Button>
        <Button
          className={styles.button}
          disabled={maskboxes.length < PAGE_SIZE || loading}
          onClick={loadNextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
};

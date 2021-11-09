import { logoImage } from '@/assets';
import {
  Button,
  Icon,
  LanguageSwitcher,
  LoadingButton,
  LoadingIcon,
  useDialog,
} from '@/components';
import { RouteKeys } from '@/configs';
import { useClickAway } from 'react-use';
import { ThemeType, useTheme, useWeb3Context } from '@/contexts';
import { getNetworkIcon, getNetworkName } from '@/lib';
import { formatAddres } from '@/utils';
import classnames from 'classnames';
import { FC, HTMLProps, useEffect, useRef } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { AccountDialog } from '../AccountDialog';
import styles from './index.module.less';

interface Props extends HTMLProps<HTMLDivElement> {}

export const PageHeader: FC<Props> = ({ className, ...rest }) => {
  const {
    account,
    providerChainId,
    openConnectionDialog,
    isNotSupportedChain,
    isMetaMask,
    isConnecting,
  } = useWeb3Context();
  const [accountDialogVisible, openAccountDialog, closeAccountDialog] = useDialog();
  const [popupNavVisible, openPopupNav, closePopupNav] = useDialog();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === ThemeType.Dark;
  const history = useHistory();
  const location = useLocation();

  const popupNavRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLDivElement>(null);
  useClickAway(popupNavRef, (event) => {
    const target = event.target as HTMLDivElement;
    if (target && menuBtnRef.current?.contains(target)) return;
    closePopupNav();
  });
  useEffect(closePopupNav, [location.pathname]);

  return (
    <div className={classnames(styles.pageHeader, className)} {...rest}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} title="NFTBOX">
            <img src={logoImage} width="100%" height="100%" alt="MASKBOX" />
          </Link>
        </div>
        <nav className={styles.nav}>
          <NavLink
            exact
            className={styles.navItem}
            activeClassName={styles.activeNav}
            to={RouteKeys.Home}
          >
            Home
          </NavLink>
          <NavLink
            className={classnames(styles.navItem, {
              [styles.activeNav]: location.pathname === RouteKeys.Details,
            })}
            activeClassName={styles.activeNav}
            to={RouteKeys.BoxList}
          >
            Mystery
          </NavLink>
          <NavLink
            className={styles.navItem}
            activeClassName={styles.activeNav}
            to={RouteKeys.Profile}
          >
            My Items
          </NavLink>
          <NavLink
            className={styles.navItem}
            activeClassName={styles.activeNav}
            to={RouteKeys.Faqs}
          >
            FAQs
          </NavLink>
        </nav>
        <div className={styles.operations}>
          {account ? (
            <>
              {isConnecting ? (
                <Button circle>
                  <LoadingIcon size={18} />
                </Button>
              ) : (
                <Button
                  className={styles.button}
                  onClick={openConnectionDialog}
                  colorScheme={isNotSupportedChain ? 'danger' : 'default'}
                >
                  <Icon
                    className={styles.icon}
                    iconUrl={isNotSupportedChain ? undefined : getNetworkIcon(providerChainId!)}
                    type={isNotSupportedChain ? 'risk' : undefined}
                    size={18}
                  />
                  {isNotSupportedChain ? 'Network error' : getNetworkName(providerChainId!)}
                </Button>
              )}
              <Button className={styles.button} title={account} onClick={openAccountDialog}>
                <Icon className={styles.icon} type={isMetaMask ? 'metamask' : 'wallet'} size={16} />
                {formatAddres(account)}
              </Button>
              <Button
                className={styles.button}
                colorScheme="primary"
                title={account}
                onClick={() => {
                  history.push('/edit');
                }}
              >
                Create
              </Button>
            </>
          ) : (
            <LoadingButton
              className={styles.button}
              onClick={openConnectionDialog}
              disabled={isConnecting}
              loading={isConnecting}
            >
              Connect Wallet
            </LoadingButton>
          )}
          <Button
            className={classnames(styles.button, styles.themeToggleButton)}
            circle
            colorScheme="light"
            onClick={toggleTheme}
          >
            <Icon type={isDark ? 'sun' : 'moon'} size={20} />
          </Button>
          <div
            className={styles.menuButton}
            role="button"
            ref={menuBtnRef}
            onClick={() => (popupNavVisible ? closePopupNav() : openPopupNav())}
          >
            <Icon type="menu" />
          </div>
        </div>
      </div>
      <LanguageSwitcher className={styles.langSwitch} />
      <nav
        className={classnames(styles.popupNav, { [styles.open]: popupNavVisible })}
        ref={popupNavRef}
      >
        <NavLink
          exact
          className={styles.navItem}
          activeClassName={styles.activeNav}
          to={RouteKeys.Home}
        >
          Home
        </NavLink>
        <NavLink
          className={classnames(styles.navItem, {
            [styles.activeNav]: location.pathname === RouteKeys.Details,
          })}
          activeClassName={styles.activeNav}
          to={RouteKeys.BoxList}
        >
          Mystery
        </NavLink>
        <NavLink
          className={styles.navItem}
          activeClassName={styles.activeNav}
          to={RouteKeys.Profile}
        >
          My Items
        </NavLink>
        <NavLink className={styles.navItem} activeClassName={styles.activeNav} to={RouteKeys.Faqs}>
          FAQs
        </NavLink>
        <LanguageSwitcher className={styles.langSwitchItem} />
      </nav>
      <AccountDialog open={accountDialogVisible} onClose={closeAccountDialog} />
    </div>
  );
};

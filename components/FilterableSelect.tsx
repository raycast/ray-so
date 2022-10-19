import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import ChevronUpIcon from "assets/icons/chevron-up-16.svg";

import styles from "styles/FilterableSelect.module.css";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

type PropTypes = {};

const FilterableSelect: {
  Item: FC<PropsWithChildren<ItemPropTypes>>;
} & FC<PropsWithChildren<PropTypes>> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");

  const globalClickHandler = useCallback(
    (event: MouseEvent) => {
      if (
        open &&
        event.target &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("click", globalClickHandler);

    return () => {
      window.removeEventListener("click", globalClickHandler);
    };
  }, [globalClickHandler, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setSearchInput("");
    }
  }, [open]);

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    const { selected, children } = (child as ReactElement)
      .props as ItemPropTypes;
    return (
      selected || (children as string).toLowerCase().indexOf(searchInput) !== -1
    );
  });

  return (
    <div
      className={classNames(styles.container, { [styles.open]: open })}
      ref={containerRef}
    >
      <div
        className={styles.anchor}
        onClick={(event) => {
          event.stopPropagation();

          if (!open) setOpen(true);
        }}
      >
        {open ? (
          <input
            type="text"
            placeholder="Search"
            ref={inputRef}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className={styles.searchInput}
          />
        ) : (
          "Auto Detect"
        )}
        <ChevronUpIcon />
      </div>
      <CSSTransition
        in={open}
        timeout={150}
        nodeRef={listRef}
        classNames={styles}
        unmountOnExit
      >
        <div className={styles.list} ref={listRef}>
          {searchInput.length ? filteredChildren : children}
        </div>
      </CSSTransition>
    </div>
  );
};

type ItemPropTypes = PropsWithChildren<{
  selected: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}>;

const Item: FC<ItemPropTypes> = ({ children, selected, onClick }) => {
  return (
    <a
      className={classNames(styles.listItem, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

FilterableSelect.Item = Item;

export default FilterableSelect;

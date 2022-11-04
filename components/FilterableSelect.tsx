import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import ChevronUpIcon from "assets/icons/chevron-up-16.svg";

import styles from "styles/FilterableSelect.module.css";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

type Item = {
  value: string;
  onSelect: () => void;
  selected: boolean;
};

type PropTypes = {
  items: Item[];
  className?: string;
  labelFormatter?: (label: string) => string;
};

const FilterableSelect: FC<PropsWithChildren<PropTypes>> = ({
  items,
  className,
  labelFormatter = (str) => str,
}) => {
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

  const filteredChildren = items.filter(({ value, selected }) => {
    return selected || value.toLowerCase().indexOf(searchInput) !== -1;
  });

  const selectedItem = items.find(({ selected }) => selected) as Item;

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.open]: open,
      })}
      ref={containerRef}
    >
      <div
        className={styles.anchor}
        onClick={(event) => {
          event.stopPropagation();

          if (!open) setOpen(true);
        }}
      >
        <span>
          {open ? (
            <input
              type="text"
              placeholder="Search"
              ref={inputRef}
              value={searchInput}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(false);
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
              className={styles.searchInput}
            />
          ) : (
            labelFormatter(selectedItem.value)
          )}
        </span>
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
          {(searchInput.length ? filteredChildren : items).map(
            (item, index) => (
              <Item
                key={index}
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                selected={item.selected}
              >
                {item.value}
              </Item>
            )
          )}
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

export default FilterableSelect;

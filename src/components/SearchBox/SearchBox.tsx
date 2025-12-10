import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (topic: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const updateSearchQuery = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  });
  return (
    <input
      onChange={updateSearchQuery}
      className={css.input}
      type="text"
      placeholder="Search posts"
    />
  );
}

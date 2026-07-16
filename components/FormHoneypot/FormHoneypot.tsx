import styles from "./FormHoneypot.module.css";

type FormHoneypotProps = {
  value: string;
  onChange: (value: string) => void;
};

export function FormHoneypot({ value, onChange }: FormHoneypotProps) {
  return (
    <label className={styles.honeypot} aria-hidden="true">
      <span>Не заполняйте это поле</span>
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

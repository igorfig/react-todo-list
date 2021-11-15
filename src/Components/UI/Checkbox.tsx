interface CheckboxProps {
    handleToggleTaskCompletion: () => void;
    className?: string;
}

export function Checkbox({ handleToggleTaskCompletion, className }: CheckboxProps) {
  return (
    <div 
        className="checkbox" 
        onClick={handleToggleTaskCompletion}>
      <div
        className={`checkbox-box ${className}`}
      ></div>
    </div>
  );
}

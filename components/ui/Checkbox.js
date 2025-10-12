const Checkbox = ({ checked, onChange, className = "" }) => (
  <input
    type="checkbox"
    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${className}`}
    checked={checked}
    onChange={onChange}
  />
);

export default Checkbox;
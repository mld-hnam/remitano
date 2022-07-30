export default function Toggled({ children, toggled }) {
  return toggled ? children : null;
}

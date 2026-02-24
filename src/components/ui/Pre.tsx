type Props = {
  object: {}
}
const Pre = ({ object }: Props) => {
  return <pre className="text-xs">{JSON.stringify(object, null, 2)}</pre>
}
export default Pre

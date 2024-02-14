export default function UserPage(props: { params: { username: string } }) {
  const { params } = props;
  return (
    <div>
      <h1>UserPage of {params.username}</h1>
    </div>
  );
}

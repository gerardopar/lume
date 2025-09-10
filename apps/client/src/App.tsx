import { trpc } from "./utils/trpc";

function App() {
  const hello = trpc.hello.useQuery();

  if (hello.isLoading) return <p>Loading...</p>;
  if (hello.error) return <p>Error: {hello.error.message}</p>;

  return (
    <div className="w-full flex items-center justify-center h-[100vh] bg-black">
      <h1 className="text-4xl text-white">{hello.data?.greeting}</h1>
    </div>
  );
}

export default App;

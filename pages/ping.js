import Error from "next/error";
export default function Ping() {
  return <Error statusCode={"200"} title={"is working..."} />;
}

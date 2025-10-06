import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="/logo.svg" height={50} width={50} alt="logo" />
      <h3>YouTube</h3>
    </div>
  );
}

import Logo from "@/public/Logo";
import Image from "next/image";
import MovieList from "@/components/MovieList";

export default function Home() {  

  return (
    <main>
      <div className="relative">
        <Logo />

        <span className="text-2xl text-white absolute top-5 right-5">Sun</span>

        <div className="wrapper">
          <header className="relative">
            <Image src="/heroimg.png" alt="heroimg" width={500} height={500} />

            <h1>
              Find <span className="text-gradient">Movies</span> You'll enjoy
              Without the Hassle
            </h1>
          </header>

          <MovieList />
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { IDog } from "@/interfaces/dog";


async function loadDogs(): Promise<IDog[]> {
  const response = await fetch("http://localhost:5001/dogs");
  const data = await response.json();
  return data;
}

async function DogList() {

  const dogs = await loadDogs();

  return (
    <div className="DogList">
      <div className="row mt-4 mb-4">
        <div className="col">
          <h2 className="text-center">
            HELLO. WE HAVE DOGS. CLICK ON THEM FOR MORE INFO.
          </h2>
        </div>
      </div>
      <div className="row">
        {dogs.map(d => (
          <div className="col-3 text-center" key={d.name}>
            <Image width={200} height={200} src={`/${d.src}.jpg`} alt={d.name} />
            <h3 className="mt-3">
              <Link  href={`/dogs?name=${d.name}`}>{d.name}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogList;
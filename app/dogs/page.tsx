import Link from "next/link";
import { redirect } from 'next/navigation';
import Image from "next/image";
import { IDog } from "@/interfaces/dog";

async function loadDog(name: string): Promise<IDog[]> {

    const res = await fetch(`http://localhost:5001/dogs?name=${name}`);
    return res.json();
}

async function DogDetails(data: { searchParams: { name: string; }; }) {

    const dog = await loadDog(data.searchParams.name);
    if (!dog) redirect('/');

    const foundDog = dog[0];

    return (
        <div className="row DogDetails">
            <div className="col d-flex flex-column align-items-center">
                <Image width={200} height={200} src={`/${foundDog.src}.jpg`} alt={foundDog.name} />
                <h2>{foundDog.name}</h2>
                <h3>{foundDog.age} years old</h3>
                <ul>
                    {foundDog.facts.map((fact, i) => (
                        <li key={i}>{fact}</li>
                    ))}
                </ul>
                <Link href="/">Go Back</Link>
            </div>
        </div>
    );
}

export default DogDetails;

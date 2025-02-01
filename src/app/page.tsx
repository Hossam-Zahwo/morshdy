"use client";
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">معمار المرشدي - المشاريع</h1>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 shadow-lg">
            <Image src={project.image} alt={project.name} width={500} height={300} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{project.name}</h2>
            <p>{project.description}</p>
            <p className="text-gray-600">المعالم القريبة: {project.landmarks.join(', ')}</p>
            <Link href={`/project/${project.src}`}>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md">تفاصيل</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

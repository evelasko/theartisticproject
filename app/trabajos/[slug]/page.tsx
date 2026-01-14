export default function TrabajosPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div>
      <h1>Trabajo {slug}</h1>
    </div>
  );
}
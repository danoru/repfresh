export async function POST(req: Request) {
  const { type, bodyPart } = await req.json();

  return Response.json({
    workout: {
      title: `${type} - ${bodyPart}`,
      videoUrl: "https://youtube.com/example",
    },
  });
}

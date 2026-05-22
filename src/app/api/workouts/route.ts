export async function POST(req: Request) {
  const { type, bodyPart, equipment } = await req.json();

  return Response.json({
    workout: {
      title: `${type} - ${bodyPart}`,
      videoUrl: "https://youtube.com/example",
    },
  });
}

export const dynamic = 'force-dynamic';

export async function POST(request) {
  //passing the request as parameter
  console.log(request.url); //Logging the URL
  try {
    const Exams = [];
    const documentInfo = await getDocs(collection(db, 'Exams'));
    documentInfo.forEach(doc => {
      Exams.push(doc.data());
    });
    console.log('API: ', Exams);
    return NextResponse.json({ Exams, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch price list data' },
      { status: 401 }
    );
  }
}

import { redirect } from 'next/navigation'
export default function SurveyEditPage({ params }: { params: { id: string } }) {
  redirect(`/dashboard/surveys/new?id=${params.id}`)
}
